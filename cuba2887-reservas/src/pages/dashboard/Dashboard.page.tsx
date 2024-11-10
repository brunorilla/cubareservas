// src/pages/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { Card, Statistic, Row, Col, Spin } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

interface DashboardProps {
    // Define any props here if needed
}

interface DashboardData {
    sales: number;
    expenses: number;
    isProfit: boolean;
}

export const Dashboard: React.FC<DashboardProps> = () => {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Simulate fetching data
        setTimeout(() => {
            setData({
                sales: 120000,
                expenses: 85000,
                isProfit: true
            });
            setLoading(false);
        }, 2000);
    }, []);

    return (
        <div style={{ padding: 20 }}>
            <h1>Dashboard</h1>
            {loading ? (
                <Spin size="large" />
            ) : (
                <Row gutter={16}>
                    <Col span={8}>
                        <Card>
                            <Statistic
                                title="Sales"
                                value={data?.sales ?? 0}
                                precision={2}
                                valueStyle={{ color: '#3f8600' }}
                                prefix={<ArrowUpOutlined />}
                                suffix="$"
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Statistic
                                title="Expenses"
                                value={data?.expenses ?? 0}
                                precision={2}
                                valueStyle={{ color: '#cf1322' }}
                                prefix={<ArrowDownOutlined />}
                                suffix="$"
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Statistic
                                title="Net Profit"
                                value={(data?.sales ?? 0) - (data?.expenses ?? 0)}
                                precision={2}
                                valueStyle={{ color: data?.isProfit ? '#3f8600' : '#cf1322' }}
                                prefix={data?.isProfit ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                                suffix="$"
                            />
                        </Card>
                    </Col>
                </Row>
            )}
        </div>
    );
}