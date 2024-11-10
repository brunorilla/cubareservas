import {Request, Response} from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {body, validationResult} from "express-validator";

const generateToken = (userId: string) => {
    return jwt.sign({id: userId}, process.env.JWT_SECRET as string, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

export const registerUser = [
    // Validaciones de campos
    body('name').notEmpty().withMessage('El nombre es requerido.'),
    body('email').isEmail().withMessage('Debe ser un correo válido.'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.'),

    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;
        try {
            const hashedPassword = await bcrypt.hash(password, 12);
            const newUser = new User({ name, email, password: hashedPassword });
            await newUser.save();
            const token = generateToken(newUser._id.toString());
            res.status(201).json({ message: "Usuario registrado exitosamente.", token });
        } catch (error: any) {
            res.status(500).json({ message: "Error al registrar el usuario.", error: error.message });
        }
    }
];
export const loginUser = [
    body('email').isEmail().withMessage('Debe ser un correo válido.'),
    body('password').notEmpty().withMessage('La contraseña es requerida.'),

    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({ message: "Credenciales incorrectas." });
            }
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (!isPasswordCorrect) {
                return res.status(401).json({ message: "Credenciales incorrectas." });
            }
            const token = generateToken(user._id.toString());
            res.status(200).json({ message: "Inicio de sesión exitoso.", token });
        } catch (error: any) {
            res.status(500).json({ message: "Error al iniciar sesión.", error: error.message });
        }
    }
];