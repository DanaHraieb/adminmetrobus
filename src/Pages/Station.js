import { useState } from 'react';
import React from 'react'
import Sidebar from './Sidebar'
import './Station.css';
import axios from 'axios';
export default function Station() {
    const [nom_station, setStation] = useState('');
    const [error, setError] = useState('');

    const handleAdd = async () => {
        if (!nom_station) {
            setError('Tous les champs doivent être remplis.');
            return;
        }
        try {
            const stationDetails = { nom_station };
            const response = await axios.post('http://localhost:5000/station/station', stationDetails);
            window.location.reload()

            console.log('station saved:', response.data);
        } catch (error) {
            console.error('Error saving station:', error);
        }
        return;


    };

    return (
        <div className="station">
            <Sidebar />
            <div className="station-container">
                <h1>Ajouter station</h1>
                <div className="station-form">
                    <div>
                        <label>
                            Nom station:
                            <input type="text" value={nom_station} onChange={(e) => setStation(e.target.value)} />
                        </label>
                    </div>
                    <button className="add-button" onClick={handleAdd}>Ajouter</button>

                </div>


            </div>
        </div>
    )
}
