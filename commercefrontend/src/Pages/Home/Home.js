import React from 'react';
import './Home.css';
import logoImageUrl from '../../Images/Logo/logoProvisoria.png';
import handImage from '../../Images/Home/handphone.webp'; // adjust the path according to your project structure
import PlansImage from '../../Images/Home/planosexemplo.png'; // adjust the path according to your project structure
import BuildStoreImage from '../../Images/Home/pickshop.png'; // adjust the path according to your project structure
import ExploreAndSelectImage from '../../Images/Home/shop.png'; // adjust the path according to your project structure
import RedirectToWppImage from '../../Images/Home/whatsapp-no-ecommerce.jpg'; // adjust the path according to your project structure


function Home() {


    return (
        <div className="app-container">
            <header className="header">

                <div style={{marginLeft: '10px', marginTop: '10px'}}>
                    <img src={logoImageUrl} alt="Logo" className="small-image"/>
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


            <section className="first-card">

                <div className="firstCard-text-section">
                    <h2 style={{color: '#129666'}}>Crie seu catálogo virtual</h2>
                    <p style={{color: '#889F7C'}}>e conecte-se diretamente com seus clientes pelo WhatsApp!</p>
                    <button>Comece Agora</button>
                </div>

                <div className="image-container">
                    <img src={handImage} className="contained-image"/>
                </div>
            </section>

            <div className="second-card">
                <div className="secondCard-text-title">Fácil e rápido</div>
                <div className="secondCard-text-subtitle">Comece agora seguindo os seguintes passos</div>
                <div className="card-row">
                    <div style={{backgroundColor: '#DCD9F8'}} className="secondCard-image-container">
                        <img src={PlansImage} className="secondCard-contained-image"/>
                        <div className="secondCard-text-section">
                            <div className='secondCard-text-section-title' style={{color: '#333333'}}>Escolha o seu
                                plano
                            </div>
                            <div className='secondCard-text-section-description'>Barato e acessível</div>

                        </div>

                    </div>

                    <div style={{backgroundColor: '#FFE6DF'}} className="secondCard-image-container">
                        <img style={{borderRadius: '30px', height: '80%', marginRight: '20px'}} src={BuildStoreImage}
                             className="secondCard-contained-image"/>
                        <div className="secondCard-text-section">
                            <div className='secondCard-text-section-title' style={{color: '#333333'}}>Crie sua loja
                                virtual
                            </div>
                            <div className='secondCard-text-section-description'>Adicione seus produtos
                                ou serviços
                            </div>

                        </div>

                    </div>
                </div>
                <div className="card-row">
                    <div style={{backgroundColor: '#FCE2EB'}} className="secondCard-image-container">
                        <img src={ExploreAndSelectImage} className="secondCard-contained-image"/>
                        <div className="secondCard-text-section">
                            <div className='secondCard-text-section-title' style={{color: '#333333'}}>Explore e
                                Selecione
                            </div>
                            <div className='secondCard-text-section-description'>O cliente será direcionado
                                para o seu whatsapp com
                                a lista de pedidos
                            </div>

                        </div>

                    </div>

                    <div style={{backgroundColor: '#DCF4F4'}} className="secondCard-image-container">
                        <img src={RedirectToWppImage} className="secondCard-contained-imageFourth"/>
                        <div style={{marginLeft: '5px'}} className="secondCard-text-section">
                            <div className='secondCard-text-section-title' style={{color: '#333333'}}>Feche a venda
                                pelo whatsapp
                            </div>
                            <div className='secondCard-text-section-description'>O cliente será direcionado
                                para o seu whatsapp com
                                a lista de pedidos
                            </div>

                        </div>

                    </div>
                </div>
            </div>


            <div className='third-card-container'>
                <div className='third-card-contained-square'>
                    <h2 style={{color: '#129666'}}>Planos</h2>
                </div>
                <div className='cards-container'>
                    <div className="card" style={{background: 'linear-gradient(to bottom, #00A39C, #006A42)'}}>
                        <div className="card-header">Mensal</div>
                        <div className="card-content">
                            <p>ASSINE MENSALMENTE</p>
                            <p>E CRIE SEU CATÁLOGO VIRTUAL</p>
                        </div>
                        <div className="card-price">
                            <span>R$<sup>14,99</sup></span>
                            <span className="price-period">POR MÊS</span>
                        </div>
                        <button className="buy-button">ASSINAR</button>
                    </div>

                    <div className="card" style={{background: 'linear-gradient(to bottom, #8461A3, #006A42)'}}>
                        <div className="card-header">Trimestral</div>
                        <div className="card-content">
                            <p>ASSINE O TRIMESTRAL</p>
                            <p>E CRIE SEU CATÁLOGO VIRTUAL</p>
                        </div>
                        <div className="card-price">
                            <span>R$<sup>39,99</sup></span>
                            <span className="price-period">POR 3 MESES</span>
                        </div>
                        <button className="buy-button">ASSINAR</button>
                    </div>

                    <div className="card" style={{background: 'linear-gradient(to bottom, #FF7694, #006A42)'}}>
                        <div className="card-header">Anual</div>
                        <div className="card-content">
                            <p>ASSINE ANUALMENTE</p>
                            <p>E CRIE SEU CATÁLOGO VIRTUAL</p>
                        </div>
                        <div className="card-price">
                            <span>R$<sup>149,99</sup></span>
                            <span className="price-period">POR 1 ANO</span>
                        </div>
                        <button className="buy-button">ASSINAR</button>
                    </div>
                </div>


            </div>
            <div style={{backgroundColor: '#006A42', marginTop: '-1px'}}>
                <div className='fourth-card-container'>
                    <div style={{color: 'white', fontSize: '250%', fontWeight: 'bolder', marginBottom: '10px'}}>Junte-se
                        a nós
                    </div>
                    <div style={{color: 'white', fontSize: '120%', fontWeight: 'bold', marginBottom: '10px'}}>Exponha
                        seus produtos e
                    </div>
                    <div style={{color: 'white', fontSize: '100%'}}>serviços do seu catálogo virtual</div>
                </div>

            </div>


            <footer>
                <p style={{marginLeft: '10px'}}>MY APP</p>
                <div style={{display: 'flex'}}>
                    <div style={{fontSize: '60%', marginLeft: '10px'}} href="#">termos de serviço</div>
                    <div style={{fontSize: '60%', marginLeft: '10px'}} href="#">política de privacidade</div>
                    <div style={{fontSize: '60%', marginLeft: '10px'}} href="#">Contate-nos</div>
                    <div style={{fontSize: '60%', marginLeft: '10px', marginRight: '10px'}}>MyApp 2023. All rights
                        reserved
                    </div>
                </div>

            </footer>
        </div>
    );
}

export default Home;
