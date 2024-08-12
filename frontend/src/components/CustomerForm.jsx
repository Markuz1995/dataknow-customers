import React, { useState } from 'react';
import customerService from '../services/customerService';
import { toast, Toaster } from 'react-hot-toast';

function CustomerForm() {
  const [formData, setFormData] = useState({
    customerName: '',
    identificationType: '',
    identificationNumber: '',
    notes: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await customerService.createCustomer(formData);
      toast.success('Cliente guardado exitosamente', {
        duration: 3000,
        position: 'bottom-right',
        style: {
          background: '#4C1D95',
          color: '#fff',
          padding: '16px',
          borderRadius: '10px',
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#4C1D95',
        },
      });
      setFormData({
        customerName: '',
        identificationType: '',
        identificationNumber: '',
        notes: ''
      });
    } catch (error) {
      toast.error('Error al guardar el cliente', {
        duration: 3000,
        position: 'bottom-right',
        style: {
          background: '#DC2626',
          color: '#fff',
          padding: '16px',
          borderRadius: '10px',
        },
      });
    }
  };

  return (
    <>
      <Toaster 
        position="bottom-right"
        toastOptions={{
          className: '',
          style: {
            marginBottom: '70px',
          },
        }}
      />
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-8 space-y-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Clientes</h2>
        <p className="text-purple-600 mb-6">Rellena la siguiente información</p>
        
        <fieldset className="border border-gray-300 rounded-md p-4 relative">
          <legend className="text-sm font-medium text-gray-700 px-2">Nombre del cliente</legend>
          <input
            type="text"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            placeholder="Escribe el nombre del cliente"
            className="w-full p-2 border-none focus:ring-0 text-gray-700 placeholder-gray-400"
          />
        </fieldset>

        <div className="grid grid-cols-2 gap-4">
          <fieldset className="border border-gray-300 rounded-md p-4 relative">
            <legend className="text-sm font-medium text-gray-700 px-2">Tipo de identificación</legend>
            <select
              name="identificationType"
              value={formData.identificationType}
              onChange={handleChange}
              className="w-full p-2 border-none focus:ring-0 text-gray-700 bg-transparent"
            >
              <option value="">Selecciona</option>
              <option value="CC">Cédula de Ciudadanía</option>
              <option value="NIT">NIT</option>
              <option value="TI">Tarjeta de Identidad</option>
            </select>
          </fieldset>

          <fieldset className="border border-gray-300 rounded-md p-4 relative">
            <legend className="text-sm font-medium text-gray-700 px-2">Número de identificación</legend>
            <input
              type="text"
              name="identificationNumber"
              value={formData.identificationNumber}
              onChange={handleChange}
              placeholder="Escribe número de identificación"
              className="w-full p-2 border-none focus:ring-0 text-gray-700 placeholder-gray-400"
            />
          </fieldset>
        </div>

        <fieldset className="border border-gray-300 rounded-md p-4 relative">
          <legend className="text-sm font-medium text-gray-700 px-2">Observaciones</legend>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Escribe observaciones"
            className="w-full p-2 border-none focus:ring-0 text-gray-700 placeholder-gray-400 resize-none"
            rows="3"
          ></textarea>
        </fieldset>

        <button type="submit" className="bg-purple-500 text-white rounded-md py-2 px-4 w-full hover:bg-purple-600 transition duration-300">
          Guardar cliente
        </button>
      </form>
    </>
  );
}

export default CustomerForm;