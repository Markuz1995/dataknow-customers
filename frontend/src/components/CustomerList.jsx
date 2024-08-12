import React, { useState, useEffect } from "react";
import customerService from "../services/customerService";

function CustomerList({ onCreate }) {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setIsLoading(true);
    try {
      const response = await customerService.getCustomers();
      if (response && Array.isArray(response)) {
        setCustomers(response);
      } else {
        throw new Error("Invalid customer data received");
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
      setError(
        "No se pudieron cargar los clientes. Por favor, intente de nuevo más tarde."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="text-center py-4">Cargando clientes...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="flex justify-between items-center p-6 bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-800">
          Listado de Clientes
        </h2>
        <button
          onClick={onCreate}
          className="bg-purple-500 text-white rounded-md py-2 px-4 hover:bg-purple-600 transition duration-300 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Crear Cliente
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo de Identificación
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Número de Identificación
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Observaciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50">
                <td className="py-4 px-6 whitespace-nowrap font-medium text-gray-900">
                  {customer.customerName}
                </td>
                <td className="py-4 px-6 whitespace-nowrap text-gray-500">
                  {customer.identificationType}
                </td>
                <td className="py-4 px-6 whitespace-nowrap text-gray-500">
                  {customer.identificationNumber}
                </td>
                <td className="py-4 px-6 text-gray-500">
                  {customer.notes ? (
                    <span
                      className="inline-block max-w-xs truncate"
                      title={customer.notes}
                    >
                      {customer.notes}
                    </span>
                  ) : (
                    <span className="text-gray-400 italic">
                      Sin observaciones
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {customers.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          No hay clientes disponibles.
        </div>
      )}
    </div>
  );
}

export default CustomerList;
