import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';   

const AdminDashboard = () => {
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            const token = sessionStorage.getItem('access_token');
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/stats', {
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

    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>
            <div className="stats-cards">
                <div className="card">
                    <h3>Total Users</h3>
                    <p>{stats.total_users}</p>
                </div>
                <div className="card">
                    <h3>Total Admins</h3>
                    <p>{stats.total_admins}</p>
                </div>
                <div className="card">
                    <h3>Total Regular Users</h3>
                    <p>{stats.total_users -stats.total_admins }</p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
