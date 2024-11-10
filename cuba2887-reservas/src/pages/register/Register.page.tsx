// src/pages/Register.tsx
import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';

export const Register: React.FC = () => {
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    return (
        <Form
            name="register"
            onFinish={onFinish}
            style={{ maxWidth: '300px', margin: 'auto' }}
        >
            <Form.Item
                name="email"
                rules={[{ required: true, message: 'Por favor ingresa tu correo electrónico!' }]}
            >
                <Input prefix={<MailOutlined className="site-form-item-icon" />} type="email" placeholder="Correo electrónico" />
            </Form.Item>
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
                <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Contraseña" />
            </Form.Item>
            <Form.Item
                name="confirm"
                dependencies={['password']}
                hasFeedback
                rules={[
                    { required: true, message: 'Por favor confirma tu contraseña!' },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Las dos contraseñas no coinciden!'));
                        },
                    }),
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Confirmar contraseña"
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="register-form-button">
                    Registrarse
                </Button>
            </Form.Item>
        </Form>
    );
};

