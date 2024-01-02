import React,  { useState } from 'react';
import './Manager.css';

// import { useLocation } from 'wouter'; // Descomente se precisar utilizar a localização

const responseData = {
    name: 'Nome da loja',
    description: 'Texto que descreve o catálogo, os produtos.',
    groupItem: [
        { id: '1',
            name: 'Acessórios camionete' },
        { id: '2',
            name: 'Acessórios moto' },
        { id: '2',
            name: 'Acessórios moto' },
        { id: '2',
            name: 'Acessórios moto' },
        { id: '2',
            name: 'Capas de banco' },
        { id: '3',
            name: 'Acessórios carro' }

    ],
    products: [
        {
            id: 2,
            name: 'Cama para pet',
            description: 'Cama aveludada para seu PET',
            price: 'R$ 120,00',
            imageUrl: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcS-NAirmCqGHYmIE-mDNeeIZHnr6VdyQ6mQGKQR-ufy9vtgehoTeTcvbRim1ai-IPRn-m2IF4NugKuM6esC4g1FaTv9vCGDWv405rqCEJo&usqp=CAE'
        },
        {
            id: 1,
            name: 'ITag - Rastreador de animais',
            description: 'Pingente para rastreamento do animal a partir de GPS',
            price: 'R$ 200,00',
            imageUrl: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQxv-x__rfJ1qpIM1F2CP5H1s7J3xHTDLZbZS4UN5HAPACf9NcEgXj_xe--e-ft0HkxvUh3T1I4-Xk6UkyheAHcifjfnKcki3XHXI3ttbyCyTXzG7x61lfp&usqp=CAE'
        },

        {
            id: 3,
            name: 'Peruca para pet',
            description: 'Peruca engraçada para seu PET',
            price: 'R$ 120,00',
            imageUrl: 'https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/51tYXyD5NHL.__AC_SX300_SY300_QL70_FMwebp_.jpg'
        }
    ]
};
// Modal.js
function Modal({ isOpen, onClose, product }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{product.name}</h2>
                <img src={product.imageUrl} alt={product.name} style={{ width: "100%" }}/>
                <p>{product.description}</p>
                <p>Preço: {product.price}</p>
                <button onClick={onClose}>Fechar</button>
            </div>
        </div>
    );
}
function Manager() {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const openModal = (name, description, price, imageUrl) => {
        const product = {
            name,         // Equivalente a name: name,
            description,  // Equivalente a description: description,
            price,        // Equivalente a price: price,
            imageUrl      // Equivalente a imageUrl: imageUrl
        };
        setSelectedProduct(product);
        setModalOpen(true);
    };


    const closeModal = () => {
        setModalOpen(false);
    };
    const [name, setName] = useState(responseData.name);
    const [description, setDescription] = useState(responseData.description);

    // Assumindo que response data é obtida de algum lugar e contém informações dos produtos

    // Componentes internos poderiam ser extraídos para arquivos separados, mas estão incluídos aqui para simplificar


    const CategoryButton = ({text}) => (
        <button className="category-button">{text}</button>
    );
    const AddCategoryButton = ({ text }) => (
        <div className="add-category-button-container">
            <button className="add-category-button">{text}</button>
        </div>
    );


    const AddProductCard = () => (
        <div style = {{textAlign:'center', }}className="add-product-card">
            <div className="add-product-card-text-title">Adicionar</div>
            <div className="add-product-card-text-subtitle">item</div>
        </div>
    );
    const ProductCard = ({name, description, price, imageUrl}) => (
        <div className="product-card">
            <img src={imageUrl} alt={name} className="product-image" onClick={() => openModal(name, description, price, imageUrl)}/>
            <h3>{name}</h3>
            <p>{description}</p>
            <p className="price">{price}</p>
        </div>
    );
    const maxLines = 6;

    const handleDescriptionChange = (e) => {
        const inputValue = e.target.value;
        const lines = inputValue.split('\n');

        // Verifica se o número de quebras de linha é menor que o máximo permitido
        if (lines.length <= maxLines) {
            setDescription(inputValue);
        } else {
            // Se o número máximo de linhas for excedido, mantenha apenas as primeiras seis linhas
            setDescription(lines.slice(0, maxLines).join('\n'));
        }
    };



    // Use o hook useLocation se necessário para a navegação ou lógica relacionada à URL
    // const [location, setLocation] = useLocation();

    return (
        <div className="manager">
            <div style={{backgroundColor: 'lightgrey', height: '30px'}}>
                <div style={{marginLeft: '13px', fontSize: '13px'}}> MY</div>
                <div style={{marginLeft: '10px', fontSize: '13px'}}> APP</div>

            </div>
            <header className="app-header">
                {/* Imagem do logo seria aqui */}

                <div className="div-inputs" style={{flexDirection: 'column'}}>
                    <textarea value={name} onChange={(e) => setName(e.target.value)} className="input-h1"/>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="input-p"/>
                </div>

                <div className="container-imagem" style={{flexDirection: 'column'}}>
                    <img src="https://i.pinimg.com/originals/6a/97/3a/6a973acc6f9e9fb337ba5509bb77e58e.jpg"
                         alt="Descrição da Imagem" className="ajuste-imagem"/>
                </div>
            </header>
            <div className="category-container">
                <AddCategoryButton text={'+'}/>
                {responseData.groupItem.map((category, index) => (
                    <CategoryButton key={index} text={category.name}/>
                ))}
            </div>
<div style={{marginBottom:'20px'}}></div>
            <div className="product-container">
                <AddProductCard/>

                {responseData.products.map(product => (
                    <ProductCard key={product.id} {...product} />
                ))}

                <div  className="product-card-empty">

                </div>

            </div>
            <Modal isOpen={modalOpen} onClose={closeModal} product={selectedProduct} />

        </div>
    );
}

export default Manager;
