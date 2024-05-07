import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import Sidebar from './Sidebar';
import './Trajet.css';
import axios from 'axios';
import { AiFillDelete } from 'react-icons/ai';
import Swal from 'sweetalert2';
import UpdateeTrajet from './UpdateModal';
export default function Trajet() {
    const [depart, setDepart] = useState(null);
    const [arrivee, setArrivee] = useState(null);
    const [tempsDepart, setTempsDepart] = useState('');
    const [tempsArrivee, setTempsArrivee] = useState('');
    const [error, setError] = useState('');
    const [Type, setTransportMode] = useState('');
    const [prix, setPrix] = useState('');
    const [nom_station, setNomstation] = useState([]);
    const [trajets, setTrajets] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchStations = async () => {
            try {
                const response = await axios.get('http://localhost:5000/station/getAllStations');
                setNomstation(response.data.map(station => ({ value: station.nom_station, label: station.nom_station })));
            } catch (error) {
                console.error('Error fetching stations:', error);
            }
        };

        const fetchTrajets = async () => {
            try {
                const response = await axios.get('http://localhost:5000/trajet/getAllTrajet');
                setTrajets(response.data);
            } catch (error) {
                console.error('Error fetching trajets:', error);
            }
        };

        fetchStations();
        fetchTrajets();
    }, []);

    const deleteTrajet = (id) => {
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
                axios.delete(`http://localhost:5000/trajet/deletetrajet/${id}`, { headers: { Authorization: `Bearer ${token}` } })
                    .then(() => {
                        Swal.fire(
                            'Supprimé!',
                            'Le trajet a été supprimé.',
                            'success',
                            { confirmButtonColor: '#FFA500' });


                        setTrajets(trajets.filter(trajet => trajet._id !== id));
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

    const handleSave = async () => {
        if (!depart || !arrivee || !tempsDepart || !tempsArrivee || !Type || !prix) {
            setError('Tous les champs doivent être remplis.');
            return;
        }
        if (depart.value === arrivee.value) {
            setError('Le départ et l\'arrivée ne peuvent pas être identiques.');
            return;
        }

        if (tempsDepart >= tempsArrivee) {
            setError("Le temps de départ doit être antérieur au temps d'arrivée.");

            return;
        }
        if (Number(prix) <= 0) {
            setError('Prix incorrect.');
            return;
        }

        const trajetDetails = {
            depart: depart.value,
            arrivee: arrivee.value,
            tempsDepart,
            tempsArrivee,
            Type,
            prix: Number(prix)
        };

        try {
            const response = await axios.post('http://localhost:5000/trajet/createtrajet', trajetDetails, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }); console.log('Trajet saved:', response.data);
            Swal.fire({
                icon: "success",
                title: "Votre trajet a été engistrée",
                showConfirmButton: true,
                confirmButtonColor: 'orange',


            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            });

        } catch (error) {
            console.error('Error saving trajet:', error.response ? error.response.data : error);
            setError(error.response.data.msg);
        }
    };

    const stationOptions = nom_station;

    return (
        <div className="body">
            <div className="Trajet">
                <Sidebar />
                <div className="trajet-container">
                    <h1>Gestion des trajets</h1>
                    <div className="trajet-form">
                        <div className="select-container">
                            <label>Départ:</label>
                            <Select
                                value={depart}
                                onChange={option => setDepart(option)}
                                options={stationOptions}
                                classNamePrefix="select"
                                placeholder="Sélectionner..."
                            />
                        </div>
                        <div className="select-container">
                            <label>Arrivée:</label>
                            <Select
                                value={arrivee}
                                onChange={option => setArrivee(option)}
                                options={stationOptions}
                                classNamePrefix="select"
                                placeholder="Sélectionner..."
                            />
                        </div>
                        <div>
                            <label>
                                Temps de départ:
                                <input type="time" value={tempsDepart} onChange={(e) => setTempsDepart(e.target.value)} />
                            </label>
                        </div>
                        <div>
                            <label>
                                Temps d'arrivée:
                                <input type="time" value={tempsArrivee} onChange={(e) => setTempsArrivee(e.target.value)} />
                            </label>
                            <div>
                                <label>
                                    Prix:
                                    <input type="number" value={prix} onChange={(e) => setPrix(e.target.value)} />
                                </label>
                            </div>
                            <div>
                                <label>
                                    Mode de transport:
                                    <div className="radio-group">
                                        <label className="radio-custom">
                                            <input type="radio" value="bus" checked={Type === 'bus'} onChange={(e) => setTransportMode(e.target.value)} />
                                            Bus
                                        </label>
                                        <label className="radio-custom">
                                            <input type="radio" value="metro" checked={Type === 'metro'} onChange={(e) => setTransportMode(e.target.value)} />
                                            Metro
                                        </label>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <button className="save-button" onClick={handleSave}>Enregistrer</button>
                        {error && <div style={{ color: 'red', fontWeight: 'bold' }}>{error}</div>}
                    </div>


                </div>

            </div>
            <div className="trajetsup-container">
                <h1> Trajets</h1>

                <table>
                    <thead>
                        <tr>
                            <th>Départ</th>
                            <th>Arrivée</th>
                            <th> Temps de départ</th>
                            <th>Temps d'Arrivée</th>
                            <th>Type</th>
                            <th>Prix</th>

                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trajets.map(trajet => (
                            <tr key={trajet._id}>
                                <td>{trajet.depart}</td>
                                <td>{trajet.arrivee}</td>
                                <td>{trajet.tempsDepart}</td>
                                <td>{trajet.tempsArrivee}</td>
                                <td>{trajet.Type}</td>
                                <td>{trajet.prix}</td>


                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                                        <UpdateeTrajet trajet={trajet} />
                                        <button style={{ border: 'none', background: 'none' }} onClick={() => deleteTrajet(trajet._id)}>
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
    );

}
