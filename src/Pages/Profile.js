import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './Profil.css';
import axios from 'axios';
import Swal from 'sweetalert2';
export default function Profile() {
  const [user, setUser] = useState({ email: "", password: "", name: "", lastName: "" });
  const [error, setError] = useState("");
  const token = localStorage.getItem('token');
  useEffect(() => {
    console.log(user)
    const fetchAdminUser = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user/getAllUsers?role=admin', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.data.length > 0) {
          const adminData = response.data[0];
          setUser({ ...user, email: adminData.email, name: adminData.name, lastName: adminData.lastName });
        } else {
          console.error('No admin users found');
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchAdminUser();
  }, []);


  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log(user)

    if (!user.email || !user.name || !user.lastName) {
      setError("Tous les champs doivent être remplis.");
      return;
    }
    try {
      const res = await axios.put(`http://localhost:5000/user/UpdateAdmin`, user, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(res.data);
      Swal.fire({
        icon: "success",
        title: "Votre profil a été modifier",
        showConfirmButton: true,
        confirmButtonColor: 'orange',

      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
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
              <input type="password" onChange={(e) => setUser({ ...user, password: e.target.value })} />
            </label>
          </div>
          <div className="error-message">
            {error && <div style={{ color: 'red', fontWeight: 'bold' }}>{error}</div>}
          </div>
          <button className="update-button" type='submit'>Update</button>
        </form>
      </div>
    </div>
  );
}
