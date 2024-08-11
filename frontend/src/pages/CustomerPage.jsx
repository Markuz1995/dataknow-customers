import React, { useEffect, useState } from 'react';
import customerService from '../services/customerService';
import CustomerForm from '../components/CustomerForm';

const CustomersPage = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const fetchCustomers = async () => {
            const data = await customerService.getCustomers();
            setCustomers(data);
        };
        fetchCustomers();
    }, []);

    return (
        <div>
            <h1>Customers</h1>
            <CustomerForm />
            <ul>
                {customers.map(customer => (
                    <li key={customer.id}>{customer.customerName}</li>
                ))}
            </ul>
        </div>
    );
};

export default CustomersPage;
