import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './Notification.css';

export default function Notification() {
    const [message, setMessage] = useState('');

    const handleSend = () => {

    }

    return (
        <div className="Notification">
            <Sidebar />
            <div className="notification-container">
                <h1>Envoyer une Notification</h1>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Écrivez votre message ici..."
                    className="notification-textarea"
                ></textarea>
                <button onClick={handleSend} className="send-button">Envoyer</button>
            </div>
        </div>
    );
}
