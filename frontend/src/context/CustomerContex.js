import React, { createContext, useState, useContext } from 'react';

const CustomerContext = createContext();

export const useCustomer = () => {
    return useContext(CustomerContext);
};

export const CustomerProvider = ({ children }) => {
    const [customers, setCustomers] = useState([]);

    return (
        <CustomerContext.Provider value={{ customers, setCustomers }}>
            {children}
        </CustomerContext.Provider>
    );
};
