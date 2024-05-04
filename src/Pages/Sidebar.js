import React from 'react';
import './Sidebar.css';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Sidebar() {
    const navigate = useNavigate();
    const handleLogout = async () => {

        localStorage.removeItem("token");
        navigate('/');
    }
    return (
        <div className="sidebar">
            <div className="logo">
                <img src="/image/LogoMetroBus.png" alt="Logo MetroBus" />
            </div>
            <ul>
                <li>
                    <Link to="/dash">Dashbord</Link>
                </li>
                <li>
                    <Link to="/profile">Profil</Link>
                </li>
                <li>
                    <Link to="/notification"> Gestion Notification</Link>
                </li>
                <li>
                    <Link to="/utilisateur"> Gestion Utilisateur</Link>
                </li>
                <li>
                    <Link to="/trajet">Gestion Trajet </Link>
                </li>
                <li>
                    <Link to="/station">Station </Link>
                </li>
            </ul>
            <button onClick={handleLogout} className="logout-button">Déconnexion</button>
        </div>
    );
}
