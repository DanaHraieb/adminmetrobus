import React from 'react';
import Sidebar from './Sidebar';
import './Dashboard.css';


export default function Dashboard() {
    return (
        <div className="dashboard">
            <Sidebar />
            <div className="content">
                <h1>Tableau de bord</h1>

            </div>
        </div>


    );
};
