import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './Pocetna/HomePage';
import Login from './Autorizacija/Login';
import Register from './Autorizacija/Register';
import Navbar from './Navigacija/Navbar';

function App() {
  return (
    <Router>
       
      <div className="App">
      <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
