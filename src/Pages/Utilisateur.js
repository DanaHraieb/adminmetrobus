import React, { useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import Sidebar from './Sidebar';

import './Utilisateur.css'
export default function Utilisateur() {
    const [users, setUsers] = useState([
        { id: 1, name: "Alice", lasName: "fbhf", email: "alice@example.com" },
        { id: 2, name: "Bob", lasName: "fbhf", email: "bob@example.com" },
        { id: 3, name: "Charlie", lasName: "fbhf", email: "charlie@example.com" }
    ]);

    const deleteUser = () => {
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
                            <th>lastName</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.lasName}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button style={{ border: 'none', background: 'none' }}>
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


