import {Request, Response, NextFunction} from 'express';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Ocurrió un error en el servidor',
        error: err.message
    });
};