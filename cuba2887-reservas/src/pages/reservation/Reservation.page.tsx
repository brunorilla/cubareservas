import React, { useEffect, useState } from 'react';
import { List, Card, message, Spin, Tag } from 'antd';
import { getUserReservations } from '@services/reservationService';
interface Reservation {
    _id: string;
    amenity: string;
    startTime: string;
    endTime: string;
}

export const ReservationsPage: React.FC = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchReservations = async () => {
            setLoading(true);
            try {
                const data = await getUserReservations();
                setReservations(data);
            } catch (error) {
                message.error('Error al cargar las reservas');
            } finally {
                setLoading(false);
            }
        };

        fetchReservations();
    }, []);

    // Función para determinar si la reserva es pasada
    const isPastReservation = (endTime: string) => {
        return new Date(endTime) < new Date();
    };

    return (
        <div style={{ padding: 20 }}>
            <h1>Mis Reservas</h1>
            {loading ? (
                <Spin size="large" />
            ) : (
                <List
                    grid={{ gutter: 16, column: 1 }}
                    dataSource={reservations}
                    renderItem={(reservation) => (
                        <List.Item>
                            <Card title={`Amenity: ${reservation.amenity}`}>
                                <p><strong>Inicio:</strong> {new Date(reservation.startTime).toLocaleString()}</p>
                                <p><strong>Fin:</strong> {new Date(reservation.endTime).toLocaleString()}</p>
                                {isPastReservation(reservation.endTime) ? (
                                    <Tag color="red">Reserva Tomada</Tag>
                                ) : (
                                    <Tag color="green">Reserva Activa</Tag>
                                )}
                            </Card>
                        </List.Item>
                    )}
                />
            )}
        </div>
    );
};