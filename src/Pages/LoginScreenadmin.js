import React, { useState } from "react";
import "./adminStyles.css";
import axios from 'axios';

export default function LoginScreenadmin() {
    const [user, setUser] = useState({ email: "", password: "" });
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!user.email || !user.password) {
            setErrorMessage("Veuillez remplir tous les champs.");
            return;
        }
        try {
            const res = await axios.post('http://localhost:5000/user/loginAdmin', user);
            console.log(res.data);
            localStorage.setItem("token", res.data.accesstoken);
            window.location.href = "/dash";
        } catch (error) {
            console.log(error);
            if (error.response && (error.response.status === 400)) {
                setErrorMessage("Email ou mot de passe incorrect.");
            }
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
                        <input
                            type="text"
                            placeholder="username"
                            value={user.email}
                            onChange={e => { setUser({ ...user, email: e.target.value }); setErrorMessage(""); }}
                        />
                        <input
                            type="password"
                            placeholder="password"
                            value={user.password}
                            onChange={e => { setUser({ ...user, password: e.target.value }); setErrorMessage(""); }}
                        />
                        <button type="submit">Login</button>
                    </form>
                    {errorMessage && <div style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</div>}
                </div>
            </div>
        </div>
    );
}
