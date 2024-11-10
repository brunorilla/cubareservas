// src/controllers/dashboardController.ts
import {Request, Response} from 'express';
import {DashboardService} from '../services/dashboardService';

export const dashboardController = {
    getDashboardData(req: Request, res: Response): void {
        const service = new DashboardService();
        const data = service.getDashboardData();
        res.json(data);
    }
};