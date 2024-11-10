// src/routes.ts
import {Express} from 'express';
import authRoutes from './authRoutes';
import reservationRoutes from './reservationRoutes';
import {protect} from '../middlewares/authMiddleware';

export const registerRoutes = (app: Express): void => {
    app.use('/api/auth', authRoutes);
    app.use('/api/reservations', reservationRoutes);  // Rutas protegidas
};