import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './Profil.css';
import axios from 'axios';

export default function Profile() {
  const [user, setUser] = useState({ email: "", password: "", name: "", lastName: "" });
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admin/getAllUsers');
        if (response.data.length > 0) {
          const userData = response.data[0];
          setUser(userData);
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchAllUsers();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!user.email || !user.password || !user.name || !user.lastName) {
      setError("Tous les champs doivent être remplis.");
      return;
    }
    try {
      const res = await axios.put(`http://localhost:5000/admin/updateUser/${user._id}`, user);
      console.log(res.data);
      alert('Admin is updated successfully!!!');
      window.location.reload();
    } catch (error) {
      console.error('Error updating admin:', error);
    }
  };

  return (
    <div className="Profil">
      <Sidebar />
      <div className="profil-container">
        <h1>Modifer Profil</h1>
        <form onSubmit={handleUpdate} className="profil-form">
          <div>
            <label>Name:
              <input type="text" value={user.name || ''} onChange={(e) => setUser({ ...user, name: e.target.value })} />
            </label>
          </div>
          <div>
            <label>LastName:
              <input type="text" value={user.lastName || ''} onChange={(e) => setUser({ ...user, lastName: e.target.value })} />
            </label>
          </div>
          <div>
            <label>Email:
              <input type="email" value={user.email || ''} onChange={(e) => setUser({ ...user, email: e.target.value })} />
            </label>
          </div>
          <div>
            <label>Password:
              <input type="password" value={user.password || ''} onChange={(e) => setUser({ ...user, password: e.target.value })} />
            </label>
          </div>
          <div className="error-message">
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
          <button className="update-button" type='submit'>Update</button>
        </form>
      </div>
    </div>
  );
}
