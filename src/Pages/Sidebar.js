import React from 'react';
import './Sidebar.css';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Sidebar() {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5000/admin/logout', {}, {
                withCredentials: true
            });
            localStorage.removeItem("token");
            navigate('/');
        } catch (error) {
            console.log("Erreur de déconnexion:", error);
        }
    };

    return (
        <div className="sidebar">
            <div className="logo">
                <img src="/image/LogoMetroBus.png" alt="Logo MetroBus" />
            </div>
            <ul>
                <li>
                    <Link to="/profile">Profil</Link>
                </li>
                <li>
                    <Link to="/notification">Notification</Link>
                </li>
                <li>
                    <Link to="/utilisateur">Utilisateur</Link>
                </li>
                <li>
                    <Link to="/trajet">Trajet</Link>
                </li>
            </ul>
            <button onClick={handleLogout} className="logout-button">Déconnexion</button>
        </div>
    );
}
