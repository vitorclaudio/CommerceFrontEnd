const BASE_URL = "http://localhost:55922/api";

export const fetchUserById = async (id) => {
    const response = await fetch(`${BASE_URL}/Authentication/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch user');
    }
    return await response.json();
}

export const SearchUserByLoginAndPassword = async (login, password) => {
    console.log('entrou')
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