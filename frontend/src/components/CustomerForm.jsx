import { useState } from 'react';
import customerService from '../services/customerService';

const CustomerForm = () => {
    const [customerName, setCustomerName] = useState('');
    const [identificationType, setIdentificationType] = useState('');
    const [identificationNumber, setIdentificationNumber] = useState('');
    const [notes, setNotes] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await customerService.createCustomer({
            customerName,
            identificationType,
            identificationNumber,
            notes
        });
        // Reset form or handle success
        setCustomerName('');
        setIdentificationType('');
        setIdentificationNumber('');
        setNotes('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Customer Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Identification Type"
                value={identificationType}
                onChange={(e) => setIdentificationType(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Identification Number"
                value={identificationNumber}
                onChange={(e) => setIdentificationNumber(e.target.value)}
                required
            />
            <textarea
                placeholder="Notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default CustomerForm;
