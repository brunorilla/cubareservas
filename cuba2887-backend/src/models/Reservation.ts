// src/models/Reservation.ts
import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    amenity: { type: String, enum: ['jacuzzi', 'SUM', 'lavarropas', 'secarropas'], required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true }
});

const Reservation = mongoose.model('Reservation', reservationSchema);
export default Reservation;