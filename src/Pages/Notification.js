import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './Notification.css';
import axios from 'axios';
import { AiFillDelete } from 'react-icons/ai';
import Swal from 'sweetalert2';
import UpdateNotify from './UpdateNotify';


export default function Notification() {
    const [message, setMessage] = useState('');
    const [title, setTitle] = useState('');
    const [notifications, setNotifications] = useState([]);
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');

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
    const deleteNotification = async (id) => {
        Swal.fire({
            title: 'tu es sur?',
            text: "Vous ne pourrez pas revenir en arrière !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, Supprimer!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:5000/notification/deletenotification/${id}`, { headers: { Authorization: `Bearer ${token}` } })
                    .then(response => {
                        Swal.fire(
                            'Supprimer!',
                            'Votre notification a été supprimée.',
                            'succès',
                        );
                        setNotifications(notifications.filter(notification => notification._id !== id));
                    })
                    .catch(error => {
                        Swal.fire(
                            'Erreur!',
                            'Échec de la suppression de la notification.',
                            'error'
                        );
                        console.log(error)
                    });
            }
        });
    };


    const handleSend = async () => {
        if (!title || !message) {
            setError('Tous les champs doivent être remplis.');
            return;
        }
        setError('');
        try {
            const notificationDetails = { title, message };
            const response = await axios.post('http://localhost:5000/notification/notification', notificationDetails, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Notification saved:', response.data);
            Swal.fire({
                icon: "success",
                title: "Votre notification a été envoyée",
                showConfirmButton: true,
                confirmButtonColor: 'orange',


            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            });


        } catch (error) {
            console.error('Error saving:', error);
            setError('Une erreur s\'est produite lors de l\'envoi de la notification.');
        }
    };

    return (
        <div className="body">
            <div className="Notification">
                <Sidebar />
                <div className="notification-container">
                    <h1>Envoyer une Notification</h1>
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
                    <button onClick={handleSend} className="send-button">Envoyer</button>
                </div>
            </div>
            <div className="notificationsup-container">
                <h1>Supprimer notifications</h1>

                <table>
                    <thead>
                        <tr>
                            <th>title</th>
                            <th>message</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(notifications) ? notifications.map(notification => (
                            <tr key={notification._id}>
                                <td style={{ fontWeight: 'bold' }}>{notification.title}</td>                                <td>{notification.message}</td>
                                <td>
                                    <UpdateNotify notification={notification} />

                                    <button style={{ border: 'none', background: 'none' }} onClick={() => deleteNotification(notification._id)}>
                                        <AiFillDelete size="1.5em" color="red" />
                                    </button>
                                </td>
                            </tr>
                        )) : <tr><td colSpan="3">No notifications found.</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
