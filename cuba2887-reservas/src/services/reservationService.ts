// src/services/reservationService.ts
import axios from 'axios';

export const getUserReservations = async () => {
    const response = await axios.get('/api/reservations', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.data;
};