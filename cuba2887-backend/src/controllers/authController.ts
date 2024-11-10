// src/controllers/authController.ts
import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Helper to generate JWT
const generateToken = (userId: string): string => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET as string, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

// Register User
export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        const token = generateToken(newUser._id.toString());
        res.status(201).json({ message: 'Usuario registrado exitosamente.', token });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al registrar el usuario.', error: error.message });
    }
};

// Login User
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            res.status(401).json({ message: 'Credenciales incorrectas.' });
            return;
        }

        const token = generateToken(user._id.toString());
        res.status(200).json({ message: 'Inicio de sesión exitoso.', token });
    } catch (error: any) {
        res.status(500).json({ message: 'Error al iniciar sesión.', error: error.message });
    }
};