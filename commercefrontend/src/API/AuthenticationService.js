//const BASE_URL = "http://localhost:55922/api";
const BASE_URL = "http://localhost:5081/api";
//const BASE_URL = "https://commerceproject-8edb84ea86e0.herokuapp.com/api";

export const fetchUserById = async (id) => {
    const response = await fetch(`${BASE_URL}/Authentication/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch user');
    }
    return await response.json();
}

export const SearchUserByLoginAndPassword = async (login, password) => {
    console.log(password)
    const response = await fetch(`${BASE_URL}/Authentication/${login}/${password}`);
    if (!response.ok) {
        throw new Error('Failed to fetch user');
    }
    return await response.json();
}

export const updateUser = async ( userData) => {
    const response = await fetch(`${BASE_URL}/Authentication`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    if (!response.ok) {
        throw new Error('Failed to update user');
    }
    return await response.json();
}

export const InsertUser = async (userData) => {
    const response = await fetch(`${BASE_URL}/Authentication`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        let errorMessage = 'Falha ao inserir usuário.';
        if (response.headers.get("Content-Type")?.includes("application/json")) {
            const data = await response.json(); // Tenta converter a resposta para JSON
            errorMessage = data.message || errorMessage;
        } else {
            const text = await response.text(); // Obtém a resposta como texto simples
            errorMessage = text || errorMessage;
        }
        throw new Error(errorMessage);
    }

    return await response.json();
};
