import axios from '../libs/axios';

export const loginRequest = async (email: string, password: string) => {
    const response = await axios.post('/login', {
        email,
        password
    })

    return response.data
}

export const registerRequest = async (name: string, email: string, password: string) => {
    const response = await axios.post('/register', { name, email, password });
    return response.data;
};

export const profileRequest = async () => {
    return await axios.get('/profile')
}

export const getProductsRequest = async () => {
    try {
        const response = await axios.get('/products')
        return response.data
    } catch (error) {
        console.error('Error during getProductsRequest:', error)
    }
}

export const registerProductRequest = async (name: string, description: string, price: number) => {
    const response = await axios.post('/products', {
        name,
        description,
        price
    })
    return response.data
}
