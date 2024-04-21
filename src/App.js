import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginScreenadmin from './Pages/LoginScreenadmin';
import Profile from './Pages/Profile';
import Dashboard from './Pages/Dashboard';
import Notification from './Pages/Notification';
import Utilisateur from './Pages/Utilisateur';
import Trajet from './Pages/Trajet';

function App() {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginScreenadmin />} />
        <Route path="/dash" element={token ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/profile" element={token ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/Notification" element={token ? <Notification /> : <Navigate to="/login" />} />
        <Route path="/Utilisateur" element={token ? <Utilisateur /> : <Navigate to="/login" />} />
        <Route path="/Trajet" element={token ? <Trajet /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
