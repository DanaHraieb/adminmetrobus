import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './Profil.css';

export default function Profile() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Fonction pour gérer la mise à jour du profil
  const handleUpdate = () => {



  };

  return (
    <div className="Profil">
      <Sidebar />

      <div className="profil-container">
        <h1>Gestion du Profil</h1>
        <form onSubmit={handleUpdate} className="profil-form">
          <div>
            <label>
              Name:
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
          </div>
          <div>
            <label>
              LastName:
              <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </label>
          </div>
          <div>
            <label>
              Email:
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
          </div>
          <div>
            <label>
              Password:
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
          </div>
          <button className="update-button" type='submit'>Update</button>
        </form>
      </div>
    </div>
  );
}
