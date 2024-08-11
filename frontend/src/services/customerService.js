const API_URL = 'http://localhost:5000/api';

const createCustomer = async (customer) => {
    const response = await fetch(`${API_URL}/customers`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)
    });
    return await response.json();
};

const getCustomers = async () => {
    const response = await fetch(`${API_URL}/customers`);
    return await response.json();
};

export default {
    createCustomer,
    getCustomers
};
