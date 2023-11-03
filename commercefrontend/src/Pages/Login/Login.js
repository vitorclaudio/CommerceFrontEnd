import React, { useRef, useState } from 'react';
import CryptoJS from 'crypto-js';
import './Login.css';
import '../../API/AuthenticationService';
import {SearchUserByLoginAndPassword} from "../../API/AuthenticationService";

function Login({ onClose }) {

    const containerRef = useRef(null);  // Create a ref for the container
    const [email, setEmail] = useState(''); // State to hold email value
    const [password, setPassword] = useState(''); // State to hold password value
    const [loginMessage, setLoginMessage] = useState(''); // State to hold login message
    const [loginMessageErro, setLoginMessageErro] = useState(''); // State to hold login message

    const handleClickOutside = (e) => {
        if (e.target === containerRef.current) {
            onClose();
        }
    };

    const handleLogin = async () => {
        try {
            const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
            const response = await SearchUserByLoginAndPassword(email, hashedPassword);
            if (response) { // If response is not null
                setLoginMessage('Login foi um sucesso.'); // Set success message
            } else {
                setLoginMessageErro('O Login falhou. Por favor cheque seu usuário e senha'); // Set error message
            }
        } catch (error) {
            setLoginMessageErro('Ocorreu um erro, por favor entre mais tarde.'); // Set error message for exceptions
        }
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

                <div className="message-container">
                    {loginMessage && <p className="login-message">{loginMessage}</p>}
                    {loginMessageErro && <p className="login-message-erro">{loginMessageErro}</p>}

                </div>
            </div>
        </div>
    );
}

export default Login;
