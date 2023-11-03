import React, { useRef, useState } from 'react';
import CryptoJS from 'crypto-js';
import './SignUp.css';
import '../../API/AuthenticationService';
import {InsertUser, SearchUserByLoginAndPassword} from "../../API/AuthenticationService";

function SignUp({ onClose }) {

    const containerRef = useRef(null);
    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [password, setPassword] = useState('');
    const [signupMessage, setsignupMessage] = useState('');
    const [signupMessageErro, setsignupMessageErro] = useState('');

    const [currentUser, setCurrentUser] = useState({
        id: 0,
        email: "",
        name: "",
        password: "null",
        image_url: "",
        authentication: false
    });


    const handleClickOutside = (e) => {
        if (e.target === containerRef.current) {
            onClose();
        }
    };

    const handleSignUp = async () => {
        // Verificar se todos os campos estão preenchidos e não são null
        if (!email || !nome || !password) {
            setsignupMessageErro('Por favor, preencha todos os campos.');
            return; // Encerrar a execução se algum campo estiver vazio
        }

        try {
            const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);

            // Configurar os valores do usuário atual antes de tentar o cadastro
            const userToInsert = {
                ...currentUser, // Mantém as outras propriedades do currentUser inalteradas
                email: email,
                name: nome,
                password: hashedPassword,
            };

            // Tentar inserir o usuário e aguardar a resposta
            const response = await InsertUser(userToInsert);

            // Verificar a resposta da requisição
            if (response) { // Se a resposta não for nula
                setsignupMessage('Cadastro realizado com sucesso.');
                setsignupMessageErro(''); // Limpar a mensagem de erro, se houver
            } else {
                setsignupMessageErro('O cadastro falhou. Por favor verifique suas informações.');
            }
        } catch (error) {
            // Capturar a mensagem de erro específica e definir para o estado 'signupMessageErro'
            setsignupMessageErro(error.message || 'Ocorreu um erro, por favor tente mais tarde.');
        }
    };


    return (
        <div className="signup-container" onClick={handleClickOutside} ref={containerRef}>
            <div className="signup-box">
                <button onClick={onClose} className="signup-exit-button" >X</button>
                <h2>Cadastrar-se</h2>
                <div className="input-container">
                    <input
                        type="Nome"
                        placeholder="Nome *"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <input
                        type="email"
                        placeholder="E-mail *"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <input
                        type="password"
                        placeholder="Senha *"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className="help-text">
                    <p>Já tenho uma conta no MyApp! <a href="/register">Entrar</a></p>

                </div>
                <button onClick={handleSignUp}>Cotinuar</button>

                <div className="message-container">
                    {signupMessage && <p className="signup-message">{signupMessage}</p>}
                </div>
                <div className="message-container">
                    {signupMessageErro && <p className="signup-message-erro">{signupMessageErro}</p>}
                </div>
            </div>
        </div>
    );
}

export default SignUp;
