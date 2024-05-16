import React, { useState, useEffect } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import Sidebar from './Sidebar';
import './Utilisateur.css';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function Utilisateur() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true); // État pour suivre le chargement des données
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/user/getAllUsers?role=user', { headers: { Authorization: `Bearer ${token}` } })
                setUsers(response.data);
                setLoading(false); // Mettre à jour l'état loading une fois que les données sont chargées
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, [token]); // Inclure le token dans les dépendances du useEffect

    const deleteUser = (id) => {
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
                axios.delete(`http://localhost:5000/user/deleteuser/${id}`, { headers: { Authorization: `Bearer ${token}` } })
                    .then(response => {
                        Swal.fire(
                            'Supprimé!',
                            'L\'utilisateur a été supprimé.',
                            'success',
                        );
                        setUsers(users.filter(user => user._id !== id));
                    })
                    .catch(error => {
                        Swal.fire(
                            'Erreur!',
                            'Échec de la suppression de l\'utilisateur. ' + error.message,
                            'error'
                        );
                    });
            }
        });
    };

    return (
        <div className="utilisateur">
            <Sidebar />
            <div className="utilisateur-container">
                <h1>Gestion du Utilisateur</h1>
                {loading ? ( // Afficher un message de chargement si les données sont en cours de chargement
                    <p>Loading...</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>LastName</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <button
                                            style={{ border: 'none', background: 'none' }}
                                            onClick={() => deleteUser(user._id)}
                                        >
                                            <AiFillDelete size="1.5em" color="red" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                )}
            </div>
        </div>
    );
}
