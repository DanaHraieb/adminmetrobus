import React, { useState, useEffect } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import Sidebar from './Sidebar';
import './Utilisateur.css';
import axios from 'axios';

export default function Utilisateur() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/user/getAllUsers');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/user/deleteuser/${id}`);
            setUsers(users.filter(user => user._id !== id));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };


    return (
        <div className="utilisateur">
            <Sidebar />
            <div className="utilisateur-container">
                <h1>Gestion du Utilisateur</h1>
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
            </div>
        </div>
    );
}
