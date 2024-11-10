// src/models/Reservation.ts
import mongoose, { Schema, Document } from 'mongoose';

// Define la interfaz para el modelo de Reservation
export interface IReservation extends Document {
    user: mongoose.Schema.Types.ObjectId;
    amenity: 'jacuzzi' | 'SUM' | 'lavarropas' | 'secarropas';
    startTime: Date;
    endTime: Date;
}

// Define el esquema de Reservation
const reservationSchema: Schema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amenity: { type: String, enum: ['jacuzzi', 'SUM', 'lavarropas', 'secarropas'], required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true }
});

// Crea el modelo de Mongoose
const Reservation = mongoose.model<IReservation>('Reservation', reservationSchema);
export default Reservation;