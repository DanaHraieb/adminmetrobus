import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './Trajet.css';
import axios from 'axios';
import { AiFillDelete } from 'react-icons/ai';

export default function Trajet() {
    const [depart, setDepart] = useState('');
    const [arrivee, setArrivee] = useState('');
    const [tempsDepart, setTempsDepart] = useState('');
    const [tempsArrivee, setTempsArrivee] = useState('');
    const [error, setError] = useState('');

    const [trajets, setTrajets] = useState([]);

    useEffect(() => {
        const fetchTrajets = async () => {
            try {
                const response = await axios.get('http://localhost:5000/trajet//getAlltrajet');
                setTrajets(response.data);
            } catch (error) {
                console.error('Error fetching trajets:', error);
            }
        };

        fetchTrajets();
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
        if (tempsDepart >= tempsArrivee) {
            setError("Le temps de départ doit être antérieur au temps d'arrivée.");
            return;
        }

        try {
            const trajetDetails = { depart, arrivee, tempsDepart, tempsArrivee };
            const response = await axios.post('http://localhost:5000/trajet/trajet', trajetDetails);
            console.log('Trajet saved:', response.data);
            window.location.reload()
        } catch (error) {
            console.error('Error saving trajet:', error);
            setError('Erreur lors de l\'enregistrement du trajet.');
        }
    };



    return (
        <div className="">
            <div className="Trajet">
                <Sidebar />
                <div className="trajet-container">
                    <h1>Gestion des trajets</h1>
                    <div className="trajet-form">
                        <div>
                            <label>
                                Départ:
                                <input type="text" value={depart} onChange={(e) => setDepart(e.target.value)} />
                            </label>
                        </div>
                        <div>
                            <label>
                                Arrivée:
                                <input type="text" value={arrivee} onChange={(e) => setArrivee(e.target.value)} />
                            </label>
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
