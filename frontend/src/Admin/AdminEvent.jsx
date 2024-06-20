import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie, Line } from 'react-chartjs-2';
import 'chart.js/auto';  
import './AdminEvent.css';

const AdminEvent = () => {
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            const token = sessionStorage.getItem('access_token');
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/events/stats', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setStats(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const pieData = {
        labels: stats.events_by_category.map(cat => cat.category),
        datasets: [{
            data: stats.events_by_category.map(cat => cat.total),
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40'
            ]
        }]
    };

    const lineData = {
        labels: stats.events_by_month.map(month => month.month),
        datasets: [{
            label: 'Number of Events',
            data: stats.events_by_month.map(month => month.total),
            fill: false,
            backgroundColor: '#4BC0C0',
            borderColor: '#4BC0C0'
        }]
    };

    return (
        <div className="admin-event">
            <h2>Event Statistics</h2>
            <div className="chart-container">
                <div className="chart">
                    <h3>Events by Category</h3>
                    <Pie data={pieData} />
                </div>
                <div className="chart">
                    <h3>Events by Month</h3>
                    <Line data={lineData} />
                </div>
            </div>
        </div>
    );
};

export default AdminEvent;
