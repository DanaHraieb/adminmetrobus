import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import Sidebar from './Sidebar';
import './Trajet.css';
import axios from 'axios';
import { AiFillDelete } from 'react-icons/ai';

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


    <Select
    />

    useEffect(() => {
        const fetchStations = async () => {
            try {
                const response = await axios.get('http://localhost:5000/station/getAllStations');
                setNomstation(response.data.map(station => ({ name: station.nom_station })));
            } catch (error) {
                console.error('Error fetching stations:', error);
            }
        };

        fetchStations();
    }, []);


    const deleteTrajet = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/trajet/trajet/${id}`);
            console.log(response.data);
            setTrajets(trajets.filter(trajet => trajet._id !== id));
        } catch (error) {
            console.error('Error deleting trajet:', error);
        }
    };


    const handleSave = async () => {
        if (!depart || !arrivee || !tempsDepart || !tempsArrivee || !Type || !prix) {
            setError('Tous les champs doivent être remplis.');
            return;
        }


        console.log('Départ:', depart.value, 'Arrivée:', arrivee.value); // Debug

        if (tempsDepart >= tempsArrivee) {
            setError("Le temps de départ doit être antérieur au temps d'arrivée.");
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
            const response = await axios.post('http://localhost:5000/trajet/trajet', trajetDetails);
            console.log('Trajet saved:', response.data);
            alert('Le ticket est enregistré avec succès !');
            window.location.reload();
        } catch (error) {
            console.error('Error saving trajet:', error.response ? error.response.data : error);
            setError('Erreur lors de l\'enregistrement du trajet.');
        }
    };


    const stationOptions = nom_station.map(station => ({ value: station.nom_station, label: station.name }));

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
                                // styles={customStyles}
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
                        {error && <div style={{ color: 'red' }}>{error}</div>}
                    </div>


                </div>

            </div>
            <div className="trajetsup-container">
                <h1>Supprimer trajet</h1>

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
                                    <button style={{ border: 'none', background: 'none' }} onClick={() => deleteTrajet(trajet._id)}>
                                        <AiFillDelete size="1.5em" color="red" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

}
