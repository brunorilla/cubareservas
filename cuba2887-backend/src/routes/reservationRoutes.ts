// src/routes/reservationRoutes.ts
import {Router} from 'express';
import {
    createReservation,
    getReservations,
    updateReservation,
    deleteReservation
} from '../controllers/reservationController';

const router = Router();

router.post('/', createReservation);
router.get('/', getReservations);
router.put('/:id', updateReservation);
router.delete('/:id', deleteReservation);

export default router;