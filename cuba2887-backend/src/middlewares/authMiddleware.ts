import {Request, Response, NextFunction, RequestHandler} from 'express';
import jwt, {JwtPayload} from "jsonwebtoken";

export const protect: RequestHandler = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        res.status(401).json({message: "No autorizado, se requiere un token."});
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        req.user = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({message: "Token inválido o expirado."});
    }
};