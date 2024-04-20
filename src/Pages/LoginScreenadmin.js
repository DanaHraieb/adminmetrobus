import React, { useState } from "react";
import "./adminStyles.css";

export default function LoginScreenadmin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = () => {
    };

    const handlePasswordChange = () => {
    };

    const handleLogin = () => {
    }


    return (
        <div className="row" style={{ margin: 0, padding: 0 }}>
            <div className="col-6">
                <img src="/image/LogoMetroBus.png" height={"95%"} width={"95%"} alt="Logo" />
            </div>
            <div className="col-6 login-page">
                <div className="form">
                    <h1>Login</h1>
                    <form className="login-form">
                        <input type="text" placeholder="username" onChange={handleEmailChange} />
                        <input type="password" placeholder="password" onChange={handlePasswordChange} />
                        <button type="button" onClick={handleLogin}>Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};
