import {Request, Response} from 'express';
import Reservation from '../models/Reservation';

export const createReservation = async (req: Request, res: Response) => {
    const {user, amenity, startTime, endTime} = req.body;

    // Convertir startTime y endTime a objetos Date para comparar
    const start = new Date(startTime);
    const end = new Date(endTime);

    // Validación de que endTime no sea anterior a startTime
    if (end <= start) {
        return res.status(400).json({message: "La hora de fin debe ser posterior a la hora de inicio."});
    }

    // Comprobación de solapamiento para el mismo amenity en el mismo período de tiempo
    const overlap = await Reservation.findOne({
        amenity,
        $or: [
            {startTime: {$lt: end}, endTime: {$gt: start}}
        ]
    });

    if (overlap) {
        return res.status(400).json({message: "El amenity ya está reservado en este horario."});
    }

    // Crear la nueva reserva
    const reservation = new Reservation({
        user,
        amenity,
        startTime: start,
        endTime: end
    });

    try {
        await reservation.save();
        res.status(201).json({message: "Reserva creada exitosamente.", reservation});
    } catch (error) {
        res.status(500).json({message: "Error al crear la reserva.", error: error.message});
    }
};

export const getReservations = async (req: Request, res: Response) => {
    const {user, amenity} = req.query;

    let query: any = {};

    if (user) query['user'] = user;
    if (amenity) query['amenity'] = amenity;

    try {
        const reservations = await Reservation.find(query);
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({message: "Error al obtener las reservas.", error: error.message});
    }
};
export const updateReservation = async (req: Request, res: Response) => {
    const {reservationId} = req.params;
    const {startTime, endTime, amenity} = req.body;

    const start = new Date(startTime);
    const end = new Date(endTime);

    if (end <= start) {
        return res.status(400).json({message: "La hora de fin debe ser posterior a la hora de inicio."});
    }

    const overlap = await Reservation.findOne({
        _id: {$ne: reservationId},
        amenity,
        $or: [
            {startTime: {$lt: end}, endTime: {$gt: start}}
        ]
    });

    if (overlap) {
        return res.status(400).json({message: "El amenity ya está reservado en este horario."});
    }

    try {
        const updatedReservation = await Reservation.findByIdAndUpdate(
            reservationId,
            {startTime: start, endTime: end, amenity},
            {new: true}
        );
        res.status(200).json({message: "Reserva actualizada exitosamente.", updatedReservation});
    } catch (error) {
        res.status(500).json({message: "Error al actualizar la reserva.", error: error.message});
    }
};

export const deleteReservation = async (req: Request, res: Response) => {
    const {reservationId} = req.params;

    try {
        await Reservation.findByIdAndDelete(reservationId);
        res.status(200).json({message: "Reserva eliminada exitosamente."});
    } catch (error) {
        res.status(500).json({message: "Error al eliminar la reserva.", error: error.message});
    }
};