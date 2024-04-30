import { useState } from 'react';
import React from 'react'
import Sidebar from './Sidebar'
import './Station.css';
import axios from 'axios';
import Swal from 'sweetalert2';
export default function Station() {
    const [nom_station, setStation] = useState('');
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');

    const handleAdd = async () => {
        if (!nom_station) {
            setError('Tous les champs doivent être remplis.');
            return;
        }
        try {
            const stationDetails = { nom_station };
            const response = await axios.post('http://localhost:5000/station/station', stationDetails, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Votre station a été ajoutée",
                showConfirmButton: true,
                confirmButtonColor: 'orange',

            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            });


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
                    {error && <div style={{ color: 'red', fontWeight: 'bold' }}>{error}</div>}

                </div>


            </div>
        </div>
    )
}
