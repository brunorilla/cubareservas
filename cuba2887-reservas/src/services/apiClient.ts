// src/apiClient.ts
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3001/api', // Todas las rutas se tomarán desde "/api" gracias al proxy
    headers: {
        'Content-Type': 'application/json',
    },
});

// Añade un interceptor para incluir el token de autenticación en cada solicitud
/*
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

 */

export default apiClient;