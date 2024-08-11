import React, { useEffect, useState } from 'react';
import invoiceService from '../services/invoiceService';
import InvoiceForm from '../components/InvoiceForm';

const InvoicesPage = () => {
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        const fetchInvoices = async () => {
            const data = await invoiceService.getInvoices();
            setInvoices(data);
        };
        fetchInvoices();
    }, []);

    return (
        <div>
            <h1>Invoices</h1>
            <InvoiceForm />
            <ul>
                {invoices.map(invoice => (
                    <li key={invoice.id}>
                        {invoice.productName} - {invoice.totalValue.toFixed(2)}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InvoicesPage;
