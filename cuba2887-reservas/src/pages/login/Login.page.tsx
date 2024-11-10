// src/pages/Login.tsx
import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export const Login: React.FC = () => {
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            style={{ maxWidth: '300px', margin: 'auto' }}
        >
            <Form.Item
                name="username"
                rules={[{ required: true, message: 'Por favor ingresa tu nombre de usuario!' }]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Usuario" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Por favor ingresa tu contraseña!' }]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Contraseña"
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Iniciar Sesión
                </Button>
            </Form.Item>
        </Form>
    );
};

