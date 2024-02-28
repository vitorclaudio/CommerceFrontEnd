//const BASE_URL = "http://localhost:55922/api";
const BASE_URL = "http://localhost:5081/api";
//const BASE_URL = "https://commerceproject-8edb84ea86e0.herokuapp.com/api";

export const GetStoreById = async (id) => {
    const response = await fetch(`${BASE_URL}/Store/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch user');
    }
    return await response.json();
}
export const GetAllStore = async (id) => {
    const response = await fetch(`${BASE_URL}/Store/manager/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch user');
    }
    return await response.json();
}
export const DeleteStore = async (id) => {
    const response = await fetch(`${BASE_URL}/Store/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Failed to fetch user');
    }
    return await response.json();
}
export const DeleteGroup = async (id) => {
    const response = await fetch(`${BASE_URL}/GroupItem/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Failed to fetch user');
    }
    return await response.json();
}

export const DeleteItem = async (id) => {
    const response = await fetch(`${BASE_URL}/Item/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Failed to fetch user');
    }
    return await response.json();
}

export const GetAllGroupItem = async (id) => {
    const response = await fetch(`${BASE_URL}/GroupItem/ByStoreID/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch user');
    }
    return await response.json();
}
export const GetAllItem = async (id) => {
    console.log('getallitem', id);
    const response = await fetch(`${BASE_URL}/Item/GetItemByStoreId/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch user');
    }
    return await response.json();
}
export const UpdateStore = async (userData) => {
    const response = await fetch(`${BASE_URL}/Store`, {
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

export const InsertGroup = async (userData) => {
    const response = await fetch(`${BASE_URL}/GroupItem`, {
        method: 'POST',
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
export const InsertItem = async (userData) => {
    console.log('entrou no insertitem');
    console.log(userData);
    const response = await fetch(`${BASE_URL}/Item`, {
        method: 'POST',
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

export const UpdateItem = async (userData) => {
    const response = await fetch(`${BASE_URL}/Item`, {
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

export const UpdateGroup = async (userData) => {
    const response = await fetch(`${BASE_URL}/GroupItem`, {
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

export const InsertStore = async (userData) => {
    const response = await fetch(`${BASE_URL}/Store`, {
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
