import React from 'react';
import './Home.css';

function Home() {
    return (
        <div className="app-container">
            <header className="header">
                <div style={{marginLeft: '10px', marginTop: '10px'}}>
                    <div>MY</div>
                    <div>APP</div>
                </div>
                <nav>
                    <div className="headerText" href="#">Planos</div>
                </nav>
                <nav>
                    <div className="headerText" href="#">Como funciona</div>
                </nav>
                <nav>
                    <div className="headerTextInscrevaSe" href="#">Se inscrever</div>
                </nav>
                <nav>
                    <button href="#">Entrar</button>
                </nav>
            </header>

            <div>


            </div>

            <section className="catalog-section">
                <div className="firstCard-text-section">
                    <h2>Crie seu catálogo virtual</h2>
                    <p>e conecte-se diretamente com seus clientes pelo WhatsApp!</p>
                    <button>Comece Agora</button>
                </div>
                <div>

                </div>
            </section>

            <footer>
                <p>MY APP</p>
                <a href="#">termos de serviço</a>
                <a href="#">política de privacidade</a>
                <a href="#">Contate-nos</a>
                <p>MyApp 2023. All rights reserved</p>
            </footer>
        </div>
    );
}

export default Home;
