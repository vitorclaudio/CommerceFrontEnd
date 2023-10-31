import React, { useRef, useState } from 'react';
import CryptoJS from 'crypto-js';
import './Login.css';
import '../../API/AuthenticationService';
import {SearchUserByLoginAndPassword} from "../../API/AuthenticationService";

function Login({ onClose }) {

    const containerRef = useRef(null);  // Create a ref for the container
    const [email, setEmail] = useState(''); // State to hold email value
    const [password, setPassword] = useState(''); // State to hold password value

    const handleClickOutside = (e) => {
        if (e.target === containerRef.current) {
            onClose();
        }
    };

    const handleLogin = async () => {
        const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
        console.log(email, hashedPassword);
        await SearchUserByLoginAndPassword(email, hashedPassword);
    };

    return (
        <div className="login-container" onClick={handleClickOutside} ref={containerRef}>
            <div className="login-box">
                <button onClick={onClose} className="login-exit-button" >X</button>
                <h2>Entrar</h2>
                <div className="input-container">
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className="help-text">
                    <p>Primeira vez usando MyApp? <a href="/register">Cadastre-se</a></p>
                    <p><a href="/forgot">Esqueceu sua senha?</a></p>
                </div>
                <button onClick={handleLogin}>Entrar</button>
            </div>
        </div>
    );
}

export default Login;
