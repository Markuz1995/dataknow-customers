import React, { useState, useEffect } from "react";
import invoiceService from "../services/invoiceService";

function InvoiceList({ onCreate }) {
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    setIsLoading(true);
    try {
      const response = await invoiceService.getInvoices();
      if (response && response.invoices) {
        setInvoices(response.invoices);
      } else {
        throw new Error("Invalid invoice data received");
      }
    } catch (error) {
      console.error("Error fetching invoices:", error);
      setError(
        "No se pudieron cargar las facturas. Por favor, intente de nuevo más tarde."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="text-center py-4">Cargando facturas...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="flex justify-between items-center p-6 bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-800">
          Listado de Facturas
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
          Crear Factura
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cliente
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-gray-50">
                <td className="py-4 px-6 whitespace-nowrap">
                  {invoice.Customer.customerName}
                </td>
                <td className="py-4 px-6 whitespace-nowrap">
                  {new Date(invoice.date).toLocaleDateString("es-CO", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </td>
                <td className="py-4 px-6 whitespace-nowrap font-medium text-gray-900">
                  $
                  {parseFloat(invoice.totalValue).toLocaleString("es-CO", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td className="py-4 px-6 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Pagada
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {invoices.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          No hay facturas disponibles.
        </div>
      )}
    </div>
  );
}

export default InvoiceList;
