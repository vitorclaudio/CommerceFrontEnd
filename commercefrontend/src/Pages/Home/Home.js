import React from 'react';
import './Home.css';
import logoImageUrl from '../../Images/Logo/logoProvisoria.png';
import handImage from '../../Images/Home/hand-holding-smartphone-with-screen-mockup-png.webp'; // adjust the path according to your project structure
import PlansImage from '../../Images/Home/0bf7feb3b117c6b6924558ddaf9957cf-removebg-preview.png'; // adjust the path according to your project structure
import BuildStoreImage from '../../Images/Home/undraw_web_shopping_re_owap.png'; // adjust the path according to your project structure
import ExploreAndSelectImage from '../../Images/Home/undraw_Window_shopping_re_0kbm-removebg-preview.png'; // adjust the path according to your project structure
import RedirectToWppImage from '../../Images/Home/whatsapp-no-ecommerce.jpg'; // adjust the path according to your project structure

function Home() {


    return (
        <div className="app-container">
            <header className="header">
                <div style={{marginLeft: '10px', marginTop: '10px'}}>
                    <img src={logoImageUrl} alt="Logo" className="small-image" />
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
                    <img src={handImage}  className="contained-image" />
                </div>
            </section>

            <div className="second-card">
                <div className="secondCard-text-title" >Fácil e rápido</div>
                <div className="secondCard-text-subtitle" >Comece agora seguindo os seguintes passos</div>

                <div style={{backgroundColor: '#DCD9F8'}}className="secondCard-image-container">
                    <img src={PlansImage} className="secondCard-contained-image" />
                   <div className="secondCard-text-section">
                       <div className='secondCard-text-section-title' style={{color: '#333333'}}>Escolha o seu plano</div>
                       <div className='secondCard-text-section-description'>Barato e acessível</div>

                   </div>

                </div>

                <div style={{backgroundColor: '#FFE6DF'}}className="secondCard-image-container">
                    <img style={{borderRadius:'30px', height:'80%', marginRight:'20px'}}  src={BuildStoreImage} className="secondCard-contained-image" />
                    <div className="secondCard-text-section">
                        <div className='secondCard-text-section-title' style={{color: '#333333'}}>Crie sua loja virtual</div>
                        <div className='secondCard-text-section-description'>Adicione seus produtos
                            ou serviços </div>

                    </div>

                </div>

                <div style={{backgroundColor: '#FCE2EB'}}className="secondCard-image-container">
                    <img src={ExploreAndSelectImage}  className="secondCard-contained-image" />
                    <div className="secondCard-text-section">
                        <div className='secondCard-text-section-title' style={{color: '#333333'}}>Explore e
                            Selecione</div>
                        <div className='secondCard-text-section-description'>O cliente será direcionado
                            para o seu whatsapp com
                            a lista de pedidos
                            </div>

                    </div>

                </div>

                <div style={{backgroundColor: '#DCF4F4'}}className="secondCard-image-container">
                    <img style={{borderRadius:'10px', height: '100%', width: '250px', marginLeft:'0px'}} src={RedirectToWppImage} className="secondCard-contained-image" />
                    <div className="secondCard-text-section">
                        <div className='secondCard-text-section-title' style={{color: '#333333'}}>Feche a venda
                            pelo whatsapp</div>
                        <div className='secondCard-text-section-description'>O cliente será direcionado
                            para o seu whatsapp com
                            a lista de pedidos</div>

                    </div>

                </div>

            </div>


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
