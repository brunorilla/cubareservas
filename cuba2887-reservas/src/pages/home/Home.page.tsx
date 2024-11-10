import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
            <h1>Bienvenido al Sistema de Reservas para Cuba 2887</h1>
            <p>Reserva las amenidades de tu edificio fácilmente.</p>
            <Link to="/login"><Button type="primary" style={{ margin: '10px' }}>Iniciar Sesión</Button></Link>
            <Link to="/register"><Button type="primary">Registrarse</Button></Link>
        </div>
    );
};

