import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './Trajet.css';


export default function Trajet() {
    const [depart, setDepart] = useState('');
    const [arrivee, setArrivee] = useState('');
    const [tempsDepart, setTempsDepart] = useState('');
    const [tempsArrivee, setTempsArrivee] = useState('');

    const handleSave = () => {

    }
    return (

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
                </div>
            </div>
        </div>

    );
}



