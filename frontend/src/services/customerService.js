const API_URL = 'http://localhost:5000/api';

const handleResponse = async (response) => {
    if (!response.ok) {
        const errorBody = await response.text();
        console.error('API error response:', errorBody);
        throw new Error(errorBody || response.statusText);
    }
    return response.json();
};

const createCustomer = async (customer) => {
    try {
        console.log('Sending customer data:', customer);
        const response = await fetch(`${API_URL}/customers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Error creating customer:', error);
        throw error;
    }
};

const getCustomers = async () => {
    try {
        const response = await fetch(`${API_URL}/customers`);
        return await handleResponse(response);
    } catch (error) {
        console.error('Error getting customers:', error);
        throw error;
    }
};

export default {
    createCustomer,
    getCustomers
};