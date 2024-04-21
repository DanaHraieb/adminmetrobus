import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './Profil.css';
import axios from 'axios'
export default function Profile() {
  const [user , setUser] = useState({email : "" , password:"" , name:"" , lastName:""});


  // Fonction pour gérer la mise à jour du profil
  const handleUpdate = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.put('http://localhost:5000/admin/updateUser/66256477a33244e266764a7a' , user);
      console.log(res.data)
      alert('admin is updated successfully!!!')
      window.location.reload();
    } catch (error) {
      console.log(error)
    }


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
              <input type="text"  onChange={(e) => setUser({...user , name:e.target.value})} />
            </label>
          </div>
          <div>
            <label>
              LastName:
              <input type="text" onChange={(e) => setUser({...user , lastName:e.target.value})} />
            </label>
          </div>
          <div>
            <label>
              Email:
              <input type="email"  onChange={(e) => setUser({...user , email:e.target.value})} />
            </label>
          </div>
          <div>
            <label>
              Password:
              <input type="password" onChange={(e) => setUser({...user , password:e.target.value})} />
            </label>
          </div>
          <button className="update-button" type='submit'>Update</button>
        </form>
      </div>
    </div>
  );
}
