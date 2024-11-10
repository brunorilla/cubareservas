// src/services/reservationService.ts
import apiClient from './apiClient';

export const getUserReservations = async () => {
    const response = await apiClient.get('/reservations');
    return response.data;
};