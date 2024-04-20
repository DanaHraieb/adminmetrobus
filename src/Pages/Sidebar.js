import React from 'react';
import './Sidebar.css';
import { Link } from "react-router-dom";

const handleLogout = () => {
    // Logique de déconnexion ici
    console.log("Utilisateur déconnecté");
};

export default function Sidebar() {
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
                    <Link to="/Notification">Notification</Link>
                </li>
                <li>
                    <Link to="/Utilisateur">Utilisateur</Link>
                </li>
                <li>
                    <Link to="/Trajet">Trajet</Link>
                </li>
            </ul>
            <button onClick={handleLogout} className="logout-button">Déconnexion</button>
        </div>
    );
}
