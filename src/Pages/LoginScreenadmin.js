import React, { useState } from "react";
import "./adminStyles.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
export default function LoginScreenadmin() {
   const [user , setUser] = useState({email : "" , password:""})
const handleLogin = async(e)=>{
    e.preventDefault();
    try {
        const res = await axios.post('http://localhost:5000/admin/login', user);
        console.log(res.data)
        localStorage.setItem("token", res.data.accesstoken);
        window.location.href = "/dash";
    } catch (error) {
        console.log(error)
    }
}

    return (
        <div className="row" style={{ margin: 0, padding: 0 }}>
            <div className="col-6">
                <img src="/image/LogoMetroBus.png" height={"95%"} width={"95%"} alt="Logo" />
            </div>
            <div className="col-6 login-page">
                <div className="form">
                    <h1>Login</h1>
                    <form onSubmit={handleLogin} className="login-form">
                        <input type="text" placeholder="username" onChange={e =>{setUser({...user , email : e.target.value})}} />
                        <input type="password" placeholder="password" onChange={e =>{setUser({...user , password : e.target.value})}} />
                        <button type="submit" >Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};
