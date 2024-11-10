import React, { ReactNode } from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

interface AppLayoutProps {
    children: ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
                    <Menu.Item key="2"><Link to="/login">Login</Link></Menu.Item>
                    <Menu.Item key="3"><Link to="/register">Register</Link></Menu.Item>
                    <Menu.Item key="4"><Link to="/dashboard">Dashboard</Link></Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px', marginTop: '20px' }}>
                <div className="site-layout-content">{children}</div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    );
};