import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import Swal from 'sweetalert2';
import axios from 'axios';

function UpdateNotify(props) {
    const [message, setMessage] = useState(props.notification.message);  // Directly use the string
    const [title, setTitle] = useState(props.notification.title);        // Directly use the string
    const [error, setError] = useState('');

    const [notification, setNotifications] = useState(props.notification.notification);
    const [show, setShow] = useState(false);
    const token = localStorage.getItem('token');
    const handleClose = () => setShow(false);
    const handleShow = () => { setShow(true); console.log(props) }

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get('http://localhost:5000/notification/getAllnotification');
                console.log("Fetched notifications:", response.data);
                setNotifications(response.data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
                setNotifications([]);
            }
        };

        fetchNotifications();
    }, []);

    const handleUpdate = async () => {
        if (!title || !message) {
            setError('Tous les champs doivent être remplis.');
            return;
        }

        const notificationDetails = {
            title: title,
            message: message,
        };

        try {
            const response = await axios.put(`http://localhost:5000/notification/updateNotify/${props.notification._id}`, notificationDetails, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('notification updated:', response.data);
            Swal.fire({
                icon: "success",
                title: "La notification est mis a jour avec succès",
                showConfirmButton: true,
                confirmButtonColor: '#FFA500'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            });
        } catch (error) {
            console.error('Error saving notification:', error.response ? error.response.data : error);
            setError(error.response ? error.response.data.message : 'Erreur lors de l\'enregistrement du notification.');
        }
    };

    return (
        <>
            <button style={{ border: 'none', background: 'none', marginRight: '10px' }} onClick={handleShow}>
                <AiFillEdit size="1.5em" color="blue" />
            </button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <div className="Notification">
                        <div>
                            <h1>Modifier Notification</h1>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Entrez le titre ici..."
                                className="notification-input"
                            />
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Écrivez votre message ici..."
                                className="notification-textarea"
                            ></textarea>
                            <div className="error-message">
                                {error && <div style={{ color: 'red', fontWeight: 'bold' }}>{error}</div>}
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

export default UpdateNotify;
