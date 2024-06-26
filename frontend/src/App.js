import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './Pocetna/HomePage';
import Login from './Autorizacija/Login';
import Register from './Autorizacija/Register';
import Navbar from './Navigacija/Navbar';
import Dogadjaji from './Dogadjaji/Dogadjaji';
import KreirajDogadjaj from './Dogadjaji/KreirajDogadjaj';
import AdminUsers from './Admin/AdminUsers';
import AdminDashboard from './Admin/AdminDashboard';
import AdminEvent from './Admin/AdminEvent';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    const storedToken = sessionStorage.getItem('access_token');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData, token) => {
    setUser(userData);
    sessionStorage.setItem('user', JSON.stringify(userData));
    sessionStorage.setItem('access_token', token);
  };

  const handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('access_token');
  };

  return (
    <Router>
      <div className="App">
        <Navbar user={user} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/events" element={<Dogadjaji />} />
          <Route path="/events/create" element={<KreirajDogadjaj />} />

          
          <Route path="/edit-event/:id" element={<KreirajDogadjaj />} /> 
          {user && user.role === 'admin' && (
            <>
              <Route path="/admin/event" element={<AdminEvent />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
             
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
