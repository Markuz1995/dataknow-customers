const API_URL = 'http://localhost:5000/api';

const createInvoice = async (invoice) => {
    const response = await fetch(`${API_URL}/invoices`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(invoice)
    });
    return await response.json();
};

const getInvoices = async (query = {}) => {
    const queryString = new URLSearchParams(query).toString();
    const response = await fetch(`${API_URL}/invoices?${queryString}`);
    return await response.json();
};

export default {
    createInvoice,
    getInvoices
};
