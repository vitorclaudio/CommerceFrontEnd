import React,  { useState, useEffect } from 'react';
import './Manager.css';

// import { useLocation } from 'wouter'; // Descomente se precisar utilizar a localização


const responseData = {
    store:{
        name: 'Nome da loja',
        description: 'Texto que descreve o catálogo, os produtos.',
        imageUrl:'https://i.pinimg.com/originals/6a/97/3a/6a973acc6f9e9fb337ba5509bb77e58e.jpg'
    },
    groupItem: [
        {
            id: '2',
            name: 'Acessórios camionete',
            store_id: '1'
        },
        { id: '2',
            name: 'Acessórios moto',
            store_id: '1'
        },
        { id: '2',
            name: 'Acessórios moto',
            store_id: '1'
        },
        { id: '2',
            name: 'Acessórios moto',
            store_id: '1'
        },
        { id: '2',
            name: 'Capas de banco',
            store_id: '1'
        },
        { id: '3',
            name: 'Acessórios carro',
            store_id: '1'
        }

    ],
    item: [
        {
            id: 2,
            name: 'Cama para pet',
            description: 'Cama aveludada para seu PET',
            value: 'R$ 120,00',
            store_id: '1',
            groupItem_id: '1',
            imageItem: [
                {
                    id: '1',
                    url: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcS-NAirmCqGHYmIE-mDNeeIZHnr6VdyQ6mQGKQR-ufy9vtgehoTeTcvbRim1ai-IPRn-m2IF4NugKuM6esC4g1FaTv9vCGDWv405rqCEJo&usqp=CAE',
                    item_id: '1'
                }
            ]
        },
        {
            id: 1,
            name: 'ITag - Rastreador de animais',
            description: 'Pingente para rastreamento do animal a partir de GPS',
            value: 'R$ 200,00',
            store_id: '1',
            groupItem_id: '1',
            imageItem: [
                {
                    id: '1',
                    url: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQxv-x__rfJ1qpIM1F2CP5H1s7J3xHTDLZbZS4UN5HAPACf9NcEgXj_xe--e-ft0HkxvUh3T1I4-Xk6UkyheAHcifjfnKcki3XHXI3ttbyCyTXzG7x61lfp&usqp=CAE',
                    item_id: '1'
                }
            ]
        },

        {
            id: 3,
            name: 'Peruca para pet',
            description: 'Peruca engraçada para seu PET',
            value: 'R$ 120,00',
            store_id: '1',
            groupItem_id: '1',
            imageItem: [
                {
                    id: '1',
                    url: 'https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/51tYXyD5NHL.__AC_SX300_SY300_QL70_FMwebp_.jpg',
                    item_id: '1'
                }
            ]
        }
    ]
};
// Modal.js
function Modal({ isOpen, onClose, product }) {
    const [item, setItem] = useState(product || {});

    useEffect(() => {
        if (product) {
            setItem({
                ...product,
                // Formata o valor para incluir R$ se necessário
                value: formatValue(product.value),
            });
        }
    }, [product]);

    const handleChange = (e, key) => {
        let value = e.target.value;
        if (key === 'value') {
            value = value.replace(/\D/g, ''); // Remove tudo que não for dígito

            if (value) {
                value = (parseInt(value) / 100).toFixed(2); // Formata para duas casas decimais
                value = value.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Substitui ponto por vírgula e adiciona ponto para milhar
            }
        }

        setItem({ ...item, [key]: value });
        if (key === 'description') {
            adjustTextareaHeight(e.target);
        }
    };

    const adjustTextareaHeight = (textarea) => {
        textarea.style.height = 'inherit';
        textarea.style.height = `${textarea.scrollHeight}px`;
    };



    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="close-button-container">
                    <button onClick={onClose} className="close-button">&times;</button>
                </div>
                <input
                    value={item.name || ''}
                    placeholder="Titulo do item"
                    onChange={(e) => handleChange(e, 'name')}
                    className="input-h1-modal"
                />
                <img src={item.imageItem && item.imageItem[0].url} alt={item.name} style={{width: "100%"}}/>
                <textarea
                    placeholder="Coloque a descrição do seu item."
                    value={item.description || ''}
                    onChange={(e) => handleChange(e, 'description')}
                    className="input-p-modal-description"
                    style={{height: 'auto'}}
                />

                <div style={{display: 'flex', alignItems: 'center'}}>

                    <input
                        placeholder="Coloque o valor. Ex: R$ 100,00"
                        value={item.value ? `R$ ${item.value}` : ''}
                        onChange={(e) => handleChange(e, 'value')}
                        className="input-p-modal-value"
                        type="text"
                    />
                </div>

                <div style={{display: 'flex', marginBottom: '10px', justifyContent: 'space-evenly'}}>
                    <button style={{width: '100%', backgroundColor: '#4CB5F9'}} onClick={onClose}>Salvar</button>
                    <div style={{width: '50%'}}/>
                    <button style={{width: '100%', backgroundColor: 'red'}} onClick={onClose}>Excluir</button>
                </div>
            </div>
        </div>
    );
}

function formatValue(value) {
    if (!value) return '';
    // Assume que o valor vem no formato 'R$ 123,45'. Ajuste esta função conforme necessário
    return value.replace('R$', '').trim();
}


function ModalNewGroup({isOpen, onClose}) {
    const [groupName, setGroupName] = useState(''); // Adiciona estado para armazenar o nome do grupo

    if (!isOpen) return null;

    const handleInputChange = (e) => {
        setGroupName(e.target.value); // Atualiza o estado com o valor do input
    };

    // Função para lidar com a ação de salvar (opcional)
    const handleSave = () => {
        console.log(groupName); // Aqui você pode adicionar lógica para salvar o grupo
        onClose(); // Fecha o modal após salvar
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">

                <div style={{display: 'flex', marginBottom: '25px', justifyContent: 'start'}}>
                    <div className="close-button-container">
                        <button onClick={onClose} className="close-button">
                            &times; {/* Símbolo de multiplicação usado como ícone de fechar */}
                        </button>
                    </div>
                    <div style={{
                        textAlign: 'center',
                        marginLeft: '50px',
                        marginTop: '10px',
                        fontWeight: 'bold'
                    }}>Adicionar novo grupo
                    </div>
                </div>


                <input
                    placeholder={'Nome do grupo'}
                    value={groupName}
                    onChange={handleInputChange}
                    className="input-modal"
                />
                <button
                    style={{ backgroundColor: '#4CB5F9'}}
                    onClick={handleSave} // Alterado para usar handleSave
                >
                    Salvar
                </button>
                <div style={{display: 'flex', marginBottom: '25px', justifyContent: 'space-evenly'}}>

                    <div style={{width: '80%'}}/>

                </div>
            </div>
        </div>
    );
}

function ModalAddProductCard({isOpen, onClose}) {
    const defaultItem = {
        name: '',
        description: '',
        value: '',
        imageItem: [{url: 'https://static.thenounproject.com/png/396915-200.png'}]
    };

    const [item, setItem] = useState(defaultItem);

    const handleChange = (e, key) => {
        let value = e.target.value;
        if (key === 'value') {
            // Remove tudo que não for dígito
            value = value.replace(/\D/g, '');

            // Formata para duas casas decimais
            if (value) {
                value = (parseInt(value) / 100).toFixed(2);

                // Substitui ponto por vírgula e adiciona ponto para milhar
                value = value.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            }
        }

        setItem({ ...item, [key]: value });

        if (key === 'description') {
            adjustTextareaHeight(e.target);
        }
    };
    const adjustTextareaHeight = (textarea) => {
        textarea.style.height = 'inherit'; // Reseta a altura para calcular corretamente
        textarea.style.height = `${textarea.scrollHeight}px`; // Define a altura para acomodar todo o conteúdo
    };


    if (!isOpen) return null;

    const valueInputStyle = {
        marginLeft: item.value ? '30px' : '0', // Ajuste '20px' conforme necessário
        // Outros estilos para o input podem ser adicionados aqui
    };
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="close-button-container">
                    <button onClick={onClose} className="close-button">
                        &times; {/* Símbolo de multiplicação usado como ícone de fechar */}
                    </button>
                </div>

                <input
                    value={item.name}
                    placeholder={'Titulo do item'}
                    onChange={(e) => handleChange(e, 'name')}
                    className="input-h1-modal"
                />
                <img src={item.imageItem[0].url} alt={item.name} style={{width: "100%"}}/>
                <textarea
                    placeholder={'Coloque a descrição do seu item.'}
                    value={item.description}
                    onChange={(e) => handleChange(e, 'description')}
                    className="input-p-modal-description"
                    style={{height: 'auto'}} // Inicializa com altura auto
                />

                <div style={{alignItems: 'center'}}>
                    {item.value && (
                        <div style={{marginLeft:'10px', display: 'flex', alignItems: 'center', marginBottom: '-27px'}}>
                            R$:
                        </div>
                    )}


                    <div style={{ alignItems: 'center'}}>
                        <input
                            placeholder={'Coloque o valor. Ex: R$ 100,00'}
                            value={item.value}
                            onChange={(e) => handleChange(e, 'value')}
                            className="input-p-modal-value"
                            type="text"
                            style={valueInputStyle} // Aplicar estilo condicional
                        />
                    </div>
                </div>

                <div style={{display: 'flex', marginBottom: '10px', justifyContent: 'space-evenly'}}>
                    <button style={{width: '100%', backgroundColor: '#4CB5F9'}} onClick={onClose}>Salvar</button>
                </div>

            </div>
        </div>
    );
}


function ModalEditGroup({isOpen, onClose, group}) {
    const [groupName, setGroupName] = useState('');

    // Atualiza o estado groupName sempre que a propriedade group mudar
    useEffect(() => {
        if (group) {
            setGroupName(group.name);
        } else {
            setGroupName(''); // Reseta o groupName se group for null
        }
    }, [group]);

    if (!isOpen) return null;

    const handleInputChange = (e) => {
        setGroupName(e.target.value);
    };

    const handleSave = () => {
        console.log(groupName);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">

                <div style={{display: 'flex', marginBottom: '25px', justifyContent: 'start'}}>
                    <div className="close-button-container">
                        <button onClick={onClose} className="close-button">
                            &times; {/* Símbolo de multiplicação usado como ícone de fechar */}
                        </button>
                    </div>

                    <div style={{    textAlign: 'center',
                        marginLeft: '80px',
                        marginTop: '10px',
                        fontWeight: 'bold'}}>Editar grupo
                    </div>

                </div>
                <input
                    placeholder={'Nome do grupo'}
                    value={groupName}
                    onChange={handleInputChange}
                    className="input-modal"
                />
                <div style={{display: 'flex', marginBottom: '25px', justifyContent: 'space-evenly'}}>
                    <button style={{width: '80%', backgroundColor: '#4CB5F9'}} onClick={onClose}>Salvar</button>
                    <div style={{width: '80%'}}/>

                    <button style={{width: '80%', backgroundColor: 'red'}} onClick={onClose}>Excluir</button>
                </div>

            </div>
        </div>
    );
}

function Manager() {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    /* MODAL NEW GROUP SECTION */

    const [modalNewGroupOpen, setModalNewGroupOpen] = useState(false);

    const openModalNewGroup = () => {
        setModalNewGroupOpen(true);
    };
    const closeModalNewGroup = () => {
        setModalNewGroupOpen(false);
    };

    /* FIM: NEW GROUP SECTION */

    /* MODAL EDIT GROUP SECTION */

    const [modalEditGroupOpen, setModalEditGroupOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(null);

    const openModalEditGroup = (id, name, store_id) => {
        const group = {
            id,
            name,
            store_id,
        };
        setSelectedGroup(group);
        setModalEditGroupOpen(true);
    };
    const closeModalEditGroup = () => {
        setModalEditGroupOpen(false);
    };

    /* FIM: NEW GROUP SECTION */


    /* MODAL ITEM SECTION */


    const openModal = (name, description, value, imageItem) => {
        const product = {
            name,         // Equivalente a name: name,
            description,  // Equivalente a description: description,
            value,        // Equivalente a value: value,
            imageItem      // Equivalente a imageUrl: imageUrl
        };
        setSelectedProduct(product);
        setModalOpen(true);
    };


    const closeModal = () => {
        setModalOpen(false);
    };

    const [addProductModal, setAddProductModal] = useState(false);

    const openAddProductModal = () => {

        setAddProductModal(true);
    };

    const closeAddProductModal = () => {
        setAddProductModal(false);
    };

    /* FIM: MODAL ITEM SECTION */

    const [name, setName] = useState(responseData.name);
    const [description, setDescription] = useState(responseData.description);

    const CategoryButton = ({id, name, store_id}) => (
        <button className="category-button" onClick={() => openModalEditGroup(id, name, store_id)}>{name}</button>
    );
    const AddCategoryButton = ({ text }) => (
        <div className="add-category-button-container" onClick={() => openModalNewGroup()}>
            <button className="add-category-button">{text}</button>
        </div>
    );


    const AddProductCard = () => (
        <div style = {{textAlign:'center', }} className="add-product-card" onClick={() => openAddProductModal()}>
            <div className="add-product-card-text-title">Adicionar</div>
            <div className="add-product-card-text-subtitle">item</div>
        </div>
    );
    const ProductCard = ({name, description, value, imageItem}) => (
        <div className="product-card">
            <img src={imageItem[0].url} alt={name} className="product-image" onClick={() => openModal(name, description, value, imageItem)}/>
            <h3>{name}</h3>
            <p>{description}</p>
            <p className="value">{value}</p>
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
                    <textarea placeholder={'Titulo'} value={name} onChange={(e) => setName(e.target.value)} className="input-h1"/>
                    <textarea placeholder={'Escreva a descrição do seu catálogo'} value={description} onChange={(e) => setDescription(e.target.value)} className="input-p"/>
                </div>

                <div className="container-imagem" style={{flexDirection: 'column'}}>
                    <img src="https://i.pinimg.com/originals/6a/97/3a/6a973acc6f9e9fb337ba5509bb77e58e.jpg"
                         alt="Descrição da Imagem" className="ajuste-imagem"/>
                </div>
            </header>
            <div className="category-container">
                <AddCategoryButton text={'+'}/>
                {responseData.groupItem.map((category, index) => (
                    <CategoryButton key={index} {...category}/>
                ))}
            </div>
            <div style={{marginBottom:'20px'}}></div>
            <div className="product-container">
                <AddProductCard/>

                {responseData.item.map(product => (
                    <ProductCard key={product.id} {...product} />
                ))}

                <div  className="product-card-empty">

                </div>

            </div>
            <Modal isOpen={modalOpen} onClose={closeModal} product={selectedProduct} />
            <ModalNewGroup isOpen={modalNewGroupOpen} onClose={closeModalNewGroup} />
            <ModalEditGroup isOpen={modalEditGroupOpen} onClose={closeModalEditGroup} group={selectedGroup} />
            <ModalAddProductCard isOpen={addProductModal} onClose={closeAddProductModal} />


        </div>
    );
}

export default Manager;
