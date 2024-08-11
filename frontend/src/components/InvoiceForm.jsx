import { useState, useEffect } from 'react';
import customerService from '../services/customerService';
import invoiceService from '../services/invoiceService';

const InvoiceForm = () => {
    const [customers, setCustomers] = useState([]);
    const [customerId, setCustomerId] = useState('');
    const [date, setDate] = useState('');
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState(0);
    const [discountValue, setDiscountValue] = useState(0);
    const [vat, setVat] = useState(0);
    const [totalValue, setTotalValue] = useState(0);

    useEffect(() => {
        const fetchCustomers = async () => {
            const customersList = await customerService.getCustomers();
            setCustomers(customersList);
        };
        fetchCustomers();
    }, []);

    useEffect(() => {
        const calculatedVat = price * 0.19;
        setVat(calculatedVat);
        const discount = (price * discountValue) / 100;
        setTotalValue(price - discount + calculatedVat);
    }, [price, discountValue]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await invoiceService.createInvoice({
            customerId,
            date,
            productName,
            price,
            discountValue,
            vat,
            totalValue
        });
        // Reset form or handle success
        setCustomerId('');
        setDate('');
        setProductName('');
        setPrice(0);
        setDiscountValue(0);
        setVat(0);
        setTotalValue(0);
    };

    return (
        <form onSubmit={handleSubmit}>
            <select
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                required
            >
                <option value="">Select Customer</option>
                {customers.map(customer => (
                    <option key={customer.id} value={customer.id}>
                        {customer.customerName}
                    </option>
                ))}
            </select>
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                required
            />
            <select
                value={discountValue}
                onChange={(e) => setDiscountValue(Number(e.target.value))}
                required
            >
                <option value={0}>0%</option>
                <option value={10}>10%</option>
                <option value={20}>20%</option>
                <option value={30}>30%</option>
                <option value={50}>50%</option>
            </select>
            <p>VAT: {vat.toFixed(2)}</p>
            <p>Total: {totalValue.toFixed(2)}</p>
            <button type="submit">Submit</button>
        </form>
    );
};

export default InvoiceForm;
