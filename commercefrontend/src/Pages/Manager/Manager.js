import React,  { useState, useEffect } from 'react';
import './Manager.css';
import './../../API/ManagerService'
import {
    DeleteGroup, DeleteItem,
    GetAllGroupId,
    GetAllGroupItem, GetAllItem,
    InsertGroup, InsertItem,
    UpdateGroup, UpdateItem,
    UpdateStore
} from "../../API/ManagerService";

// import { useLocation } from 'wouter'; // Descomente se precisar utilizar a localização


const responseData = {
    store:{
        id: 1,
        name: 'Nome da loja',
        description: 'Texto que descreve o catálogo, os produtos.',
        imageUrl:'https://i.pinimg.com/originals/6a/97/3a/6a973acc6f9e9fb337ba5509bb77e58e.jpg',
        user_id: 1
    },
    groupItem: [
        {
            id: '1',
            name: 'Acessórios camionete',
            store_id: '1'
        },
        { id: '2',
            name: 'Acessórios moto',
            store_id: '1'
        },
        { id: '3',
            name: 'Acessórios moto',
            store_id: '1'
        },
        { id: '4',
            name: 'Acessórios moto',
            store_id: '1'
        },
        { id: '5',
            name: 'Capas de banco',
            store_id: '1'
        },
        { id: '6',
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
            groupItem_id: '2',
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
            groupItem_id: '3',
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

function formatValue(value) {
    // Converte o valor para string para garantir que o método replace possa ser chamado
    if (!value) return '';
    const stringValue = String(value); // Converte o valor para string
    return stringValue.replace('R$', '').trim();
}

function Manager() {

    const [name, setName] = useState(responseData.store.name);
    const [description, setDescription] = useState(responseData.store.description);

    const [editTitleModalOpen, setEditTitleModalOpen] = useState(false);
    // Inicialize tempTitle e tempDescription como strings vazias ou outro valor inicial.

    const [groupItems, setGroupItems] = useState(responseData.groupItem);
    const [items, setItems] = useState(responseData.item);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    /* MODAL NEW GROUP SECTION */

    const [modalNewGroupOpen, setModalNewGroupOpen] = useState(false);
    
    function Modal({ isOpen, onClose, product, groupItems }) {
        const [item, setItem] = useState(product || {});
        const [selectedGroupId, setSelectedGroupId] = useState(product?.groupItem_id || '');

        useEffect(() => {
            if (product) {
                setItem({
                    ...product,
                    value: formatValue(product.value),
                });
                setSelectedGroupId(product.groupItem_id || '');
                console.log(product.groupItem_id || 'tem nada'); // Aqui você pode adicionar lógica para salvar o grupo

            }
        }, [product]);

        const handleDelete = () => {

            DeleteItem(item.id).then(() => {
                console.log("Item deletado com sucesso.");

                // Chamada assíncrona para buscar todos os grupos, se necessário
                GetAllItem(responseData.store.id).then(resultAllItem => {
                    console.log('result all item',resultAllItem);
                    setItems(resultAllItem); // Ajuste conforme necessário
                }).catch(error => console.error("Erro ao buscar items:", error));

            }).catch(error => console.error("Erro ao inserir item:", error));
            onClose(); // Fecha o modal após a inserção
        };
        const handleSave = () => {

            let itemToSave = { ...item };

            // Checa se o valor é uma string e faz a conversão
            if (typeof itemToSave.value === 'string') {
                // Remove pontos de milhar e substitui vírgula por ponto para conversão
                let formattedValue = itemToSave.value.replace(/\./g, '').replace(',', '.');
                itemToSave.value = parseFloat(formattedValue);
            }
            console.log('handleSave Modal', itemToSave);

            UpdateItem(itemToSave).then(() => {
                console.log("Item inserido com sucesso.");

                // Chamada assíncrona para buscar todos os grupos, se necessário
                GetAllItem(responseData.store.id).then(resultAllItem => {
                    console.log('result all item',resultAllItem);
                    setItems(resultAllItem); // Ajuste conforme necessário
                }).catch(error => console.error("Erro ao buscar items:", error));

            }).catch(error => console.error("Erro ao inserir item:", error));
            onClose(); // Fecha o modal após a inserção
        };

        const handleChangeGroup = (e) => {
            // Atualiza o item com o novo groupItem_id selecionado
            const newGroupId = e.target.value;
            setSelectedGroupId(newGroupId);
            setItem({ ...item, groupItem_id: newGroupId });
        };
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
                    <div style={{marginBottom: '20px'}}>
                        <select
                            value={selectedGroupId}
                            onChange={handleChangeGroup}
                            className="input-select-modal"
                        >
                            <option value="">{!item.groupItem_id ? 'Selecione um grupo' : 'Mudar grupo'}</option>
                            {groupItems.map((group) => (
                                <option key={group.id} value={group.id}>
                                    {group.name}
                                </option>
                            ))}
                        </select>
                    </div>
                        <img src={item.imageItem && item.imageItem[0].url} alt={item.name} className="modal-image"/>

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
                        <button style={{width: '100%', backgroundColor: '#4CB5F9'}} onClick={handleSave}>Salvar</button>
                        <div style={{width: '50%'}}/>
                        <button style={{width: '100%', backgroundColor: 'red'}} onClick={handleDelete}>Excluir</button>
                    </div>
                </div>
            </div>
        );
    }

    function ModalAddProductCard({ isOpen, onClose, groupItems }) { // Adicione groupItems aqui

        const defaultItem = {
            id: 0,
            name: '',
            store_id: responseData.store.id,
            description: '',
            value: '',
            groupItem_id: 0,
            imageItem: [
                {
                    id: 0,
                    url: 'https://static.thenounproject.com/png/396915-200.png',
                    item_id: 0
                }
            ]
        };
        const [item, setItem] = useState(defaultItem);
        const [selectedGroupId, setSelectedGroupId] = useState(''); // Isso garante que o estado seja manipulado corretamente
        useEffect(() => {
            setItem(defaultItem);
            setSelectedGroupId('');
        }, [isOpen]);
        const handleChangeGroup = (e) => {
            const newGroupId = e.target.value;
            setSelectedGroupId(newGroupId);
            setItem({ ...item, groupItem_id: newGroupId });
        };


        const handleChange = (e, key) => {
            let value = e.target.value;
            if (key === 'value') {
                value = value.replace(/\D/g, '');

                if (value) {
                    value = (parseInt(value) / 100).toFixed(2);

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

        const handleSave = () => {

            let itemToSave = { ...item };

            // Checa se o valor é uma string e faz a conversão
            if (typeof itemToSave.value === 'string') {
                // Remove pontos de milhar e substitui vírgula por ponto para conversão
                let formattedValue = itemToSave.value.replace(/\./g, '').replace(',', '.');
                itemToSave.value = parseFloat(formattedValue);
            }
            console.log(item);

            InsertItem(itemToSave).then(() => {
                console.log("Item inserido com sucesso.");

                // Chamada assíncrona para buscar todos os grupos, se necessário
                GetAllItem(responseData.store.id).then(resultAllItem => {
                    console.log('result all item',resultAllItem);
                    setItems(resultAllItem); // Ajuste conforme necessário
                }).catch(error => console.error("Erro ao buscar items:", error));

            }).catch(error => console.error("Erro ao inserir item:", error));
            onClose(); // Fecha o modal após a inserção
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
                    <div style={{marginBottom: '20px'}}>
                        <select
                            value={selectedGroupId}
                            onChange={(e) => {
                                const newGroupId = e.target.value;
                                setSelectedGroupId(newGroupId);
                                setItem({...item, groupItem_id: newGroupId});
                            }}
                            className="input-select-modal"
                        >
                            <option value="">Selecione um grupo</option>
                            {groupItems.map((group) => (
                                <option key={group.id} value={group.id}>
                                    {group.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <img src={item.imageItem[0].url} alt={item.name} className="modal-image" />
                    <textarea
                        placeholder={'Coloque a descrição do seu item.'}
                        value={item.description}
                        onChange={(e) => handleChange(e, 'description')}
                        className="input-p-modal-description"
                        style={{height: 'auto'}} // Inicializa com altura auto
                    />

                    <div style={{alignItems: 'center'}}>
                        {item.value && (
                            <div style={{marginLeft: '10px', display: 'flex', alignItems: 'center', marginBottom: '-27px'}}>
                                R$:
                            </div>
                        )}


                        <div style={{alignItems: 'center'}}>
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
                        <button style={{width: '100%', backgroundColor: '#4CB5F9'}} onClick={handleSave}>Salvar</button>
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


            let updateGroupData = {
                id: group.id,
                name: groupName,
                store_id: group.store_id
            };
            console.log(updateGroupData);

            UpdateGroup(updateGroupData).then(() => {
                console.log("Grupo inserido com sucesso.");

                // Chamada assíncrona para buscar todos os grupos
                GetAllGroupItem(responseData.store.id).then(resultAllGroupItem => {
                    console.log(resultAllGroupItem);


                    setGroupItems(resultAllGroupItem); // Esta linha pode precisar ser ajustada
                }).catch(error => console.error("Erro ao buscar grupos:", error));

            }).catch(error => console.error("Erro ao inserir Grupo:", error));
            onClose();
        };

        const handleDelete = () => {

            DeleteGroup(group.id).then(() => {
                console.log("Grupo deletado com sucesso.");

                GetAllGroupItem(responseData.store.id).then(resultAllGroupItem => {

                    setGroupItems(resultAllGroupItem);
                }).catch(error => console.error("Erro ao buscar grupos:", error));

            }).catch(error => console.error("Erro ao inserir Grupo:", error));
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
                        <button style={{width: '80%', backgroundColor: '#4CB5F9'}} onClick={handleSave}>Salvar</button>
                        <div style={{width: '80%'}}/>

                        <button style={{width: '80%', backgroundColor: 'red'}} onClick={handleDelete}>Excluir</button>
                    </div>

                </div>
            </div>
        );
    }

    function ModalNewGroup({isOpen, onClose}) {
        const [groupName, setGroupName] = useState(''); // Adiciona estado para armazenar o nome do grupo

        if (!isOpen) return null;

        const handleInputChange = (e) => {
            setGroupName(e.target.value);
        };

        const handleSave = () => {
            console.log(groupName);
            let insertGroupData = {
                id: '0',
                name: groupName,
                store_id: responseData.store.id
            };
            InsertGroup(insertGroupData).then(() => {
                console.log("Grupo inserido com sucesso.");

                // Chamada assíncrona para buscar todos os grupos
                GetAllGroupItem(responseData.store.id).then(resultAllGroupItem => {
                    // Supondo que resultAllGroupItem retorne os dados esperados diretamente
                    console.log(resultAllGroupItem);

                    // Atualiza a lista de groupItems com o resultado
                    // Aqui você precisará garantir que o estado global seja atualizado,
                    // possivelmente passando uma função de atualização para este componente
                    // ou utilizando uma abordagem de gerenciamento de estado global (como Context ou Redux)
                    setGroupItems(resultAllGroupItem); // Esta linha pode precisar ser ajustada
                }).catch(error => console.error("Erro ao buscar grupos:", error));

            }).catch(error => console.error("Erro ao inserir Grupo:", error));
            onClose(); // Fechar modal após a inserção e atualização serem concluídas
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


    const openModal = (id, name, description, value, imageItem, store_id, groupItem_id) => {
        const product = {
            id,
            name,         // Equivalente a name: name,
            description,  // Equivalente a description: description,
            value,        // Equivalente a value: value,
            imageItem,
            store_id,
            groupItem_id
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
    const ProductCard = ({id, name, description, value, imageItem, store_id, groupItem_id}) => (
        <div className="product-card" onClick={() => openModal(id, name, description, value, imageItem, store_id, groupItem_id)}>
            <img src={imageItem[0].url} alt={name} className="product-image" />
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



    function EditTitleModal({ isOpen, onClose, name, description, setName, setDescription, setEditTitleModalOpen }) {
        const [tempTitle, setTempTitle] = useState(name);
        const [tempDescription, setTempDescription] = useState(description);

        // Atualiza os estados locais quando os valores externos mudam
        useEffect(() => {
            setTempTitle(name);
            setTempDescription(description);
        }, [name, description]);

        const updateStore = () => {
            if (tempTitle !== name || tempDescription !== description) {
                let updatedStore = {
                    id: responseData.store.id,
                    name: tempTitle,
                    description: tempDescription,
                    imageUrl: responseData.store.imageUrl,
                    user_id: responseData.store.user_id
                };

                UpdateStore(updatedStore)
                    .then(() => {
                        console.log("Loja atualizada com sucesso.");
                        setName(tempTitle);
                        setDescription(tempDescription);
                        responseData.store.name = tempTitle;
                        responseData.store.description = tempDescription;
                    }).catch(error => console.error("Erro ao atualizar a loja:", error));
            }
            onClose(); // Apenas fecha o modal, sem resetar os estados globais
        };

        if (!isOpen) return null;

        return (
            <div className="modal-overlay">
                <div className="modal-content">
                    <div className="close-button-container">
                        <button onClick={onClose} className="close-button">&times;</button>
                    </div>

                    <div className="div-inputs" style={{flexDirection: 'column'}}>
                    <textarea
                        placeholder="Título"
                        value={tempTitle}
                        onChange={(e) => setTempTitle(e.target.value)}
                        className="input-h1-store-modal"
                    />
                        <textarea
                            placeholder="Escreva a descrição do seu catálogo"
                            value={tempDescription}
                            onChange={(e) => setTempDescription(e.target.value)}
                            className="input-p"
                        />
                    </div>

                    <button onClick={updateStore} className="save-button">Salvar</button>
                </div>
            </div>
        );
    }


    const openEditTitleModal = () => {
        // Atualiza estados temporários com os valores atuais antes de abrir o modal

        setEditTitleModalOpen(true);
    };

    return (
        <div className="manager">
            <div style={{backgroundColor: 'lightgrey', height: '30px'}}>
                <div style={{marginLeft: '13px', fontSize: '13px'}}> MY</div>
                <div style={{marginLeft: '10px', fontSize: '13px'}}> APP</div>

            </div>

            <div class="header-container">

            <header className="app-header">
                {/* Imagem do logo seria aqui */}

                <div className="div-inputs" style={{flexDirection: 'column'}}>
                 <textarea
                     placeholder={'Titulo'}
                     value={name}
                     onClick={openEditTitleModal}
                     className="input-h1"
                 />
                    <textarea
                        placeholder={'Escreva a descrição do seu catálogo'}
                        value={description}
                        onClick={openEditTitleModal}
                        className="input-p"/>
                </div>



                <div className="container-imagem" style={{flexDirection: 'column'}}>
                    <img src="https://i.pinimg.com/originals/6a/97/3a/6a973acc6f9e9fb337ba5509bb77e58e.jpg"
                         alt="Descrição da Imagem" className="ajuste-imagem"/>
                </div>
            </header>
            </div>
            <div className="category-container">
                <AddCategoryButton text={'+'}/>
                {groupItems.map((category, index) => (
                    <CategoryButton key={index} {...category}/>
                ))}
            </div>
            <div style={{marginBottom:'20px'}}></div>
            <div className="product-container">
                <AddProductCard/>

                {items.map(product => (
                    <ProductCard key={product.id} {...product} />
                ))}

                <div  className="product-card-empty">

                </div>

            </div>
            <Modal isOpen={modalOpen} onClose={closeModal} product={selectedProduct} groupItems={groupItems} />
            <ModalNewGroup isOpen={modalNewGroupOpen} onClose={closeModalNewGroup} />
            <ModalEditGroup isOpen={modalEditGroupOpen} onClose={closeModalEditGroup} group={selectedGroup} />
            <ModalAddProductCard isOpen={addProductModal} onClose={closeAddProductModal} groupItems={groupItems} />
            <EditTitleModal
                isOpen={editTitleModalOpen}
                onClose={() => setEditTitleModalOpen(false)}
                name={name}
                description={description}
                setName={setName}
                setDescription={setDescription}
                setEditTitleModalOpen={setEditTitleModalOpen}
            />

        </div>
    );
}

export default Manager;
