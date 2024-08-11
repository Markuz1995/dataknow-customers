import React, { createContext, useState, useContext } from 'react';

const InvoiceContext = createContext();

export const useInvoice = () => {
    return useContext(InvoiceContext);
};

export const InvoiceProvider = ({ children }) => {
    const [invoices, setInvoices] = useState([]);

    return (
        <InvoiceContext.Provider value={{ invoices, setInvoices }}>
            {children}
        </InvoiceContext.Provider>
    );
};
