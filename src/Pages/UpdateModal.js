import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import './Trajet.css';
import { AiFillEdit } from 'react-icons/ai';
import Swal from 'sweetalert2';
import axios from 'axios';
function UpdateeTrajet(props) {
    const [depart, setDepart] = useState({ value: props.trajet.depart, label: props.trajet.depart });
    const [arrivee, setArrivee] = useState({ value: props.trajet.arrivee, label: props.trajet.arrivee });
    const [tempsDepart, setTempsDepart] = useState(props.trajet.tempsDepart);
    const [tempsArrivee, setTempsArrivee] = useState(props.trajet.tempsArrivee);
    const [error, setError] = useState('');
    const [Type, setTransportMode] = useState(props.trajet.Type);
    const [prix, setPrix] = useState(props.trajet.prix);
    const [nom_station, setNomstation] = useState([]);
    const [trajets, setTrajets] = useState(props.trajet.trajet);
    const [show, setShow] = useState(false);
    const token = localStorage.getItem('token');
    const handleClose = () => setShow(false);
    const handleShow = () => { setShow(true); console.log(props) }

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



    const handleUpdate = async () => {
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
            const response = await axios.put(`http://localhost:5000/trajet/updateTrajet/${props.trajet._id}`, trajetDetails, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }); console.log('Trajet updated:', response.data);
            Swal.fire({
                icon: "success",
                title: "Le trajet est mis a jour avec succès",
                showConfirmButton: true,

            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            });


        } catch (error) {
            console.error('Error saving trajet:', error.response ? error.response.data : error);
            setError('Erreur lors de l\'enregistrement du trajet.');
        }
    };

    const stationOptions = nom_station;
    return (
        <>
            <button style={{ border: 'none', background: 'none', marginRight: '10px' }} onClick={handleShow}
            >
                <AiFillEdit size="1.5em" color="blue" />
            </button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <h1>Modifier Trajet</h1>
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

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fermer
                    </Button>
                    <Button variant="primary" onClick={handleUpdate} style={{ backgroundColor: 'orange', borderColor: 'orange' }}>
                        Enregistrer
                    </Button>
                    {error && <div style={{ color: 'red', fontWeight: 'bold' }}>{error}</div>}

                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UpdateeTrajet;