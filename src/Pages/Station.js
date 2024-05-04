import { useState, useEffect } from 'react';
import React from 'react'
import Sidebar from './Sidebar'
import './Station.css';
import axios from 'axios';
import { AiFillDelete } from 'react-icons/ai';
import Swal from 'sweetalert2';
export default function Station() {
    const [nom_station, setStation] = useState('');
    const [error, setError] = useState('');
    const [stations, setStations] = useState([]);

    const token = localStorage.getItem('token');
    useEffect(() => {
        const fetchStations = async () => {
            try {
                const response = await axios.get('http://localhost:5000/station/getAllStations');
                console.log("Fetched stations:", response.data);
                setStations(response.data);
            } catch (error) {
                console.error('Error fetching station:', error);
                setStations([]);
            }
        };

        fetchStations();
    }, []);
    const handleAdd = async () => {
        console.log(token)
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
            if (error.response && ((error.response.status === 400))) {
                setError(error.response.data.msg);
            }
        }
        return;


    };
    const deleteStaion = (id) => {
        Swal.fire({
            title: 'Tu es sûr?',
            text: "Vous ne pourrez pas revenir en arrière!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, Supprimer!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:5000/station/deletestation/${id}`, { headers: { Authorization: `Bearer ${token}` } })
                    .then(() => {
                        Swal.fire(
                            'Supprimé!',
                            'Le trajet a été supprimé.',
                            'success',
                            { confirmButtonColor: '#FFA500' });


                        setStations(stations.filter(station => station._id !== id));
                    })
                    .catch(error => {
                        Swal.fire(
                            'Erreur!',
                            'Échec de la suppression du trajet. ' + error.message,
                            'error'
                        );
                    });
            }
        });
    };
    return (
        <div className="body">

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
            <div className="stationsup-container">
                <h1>Supprimer station</h1>

                <table>
                    <thead>
                        <tr>
                            <th>Nom station</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stations.map(station => (
                            <tr key={station._id}>
                                <td>{station.nom_station}</td>



                                <td>
                                    <div>

                                        <button style={{ border: 'none', background: 'none' }} onClick={() => deleteStaion(station._id)}>
                                            <AiFillDelete size="1.5em" color="red" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    )
}
