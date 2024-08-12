import React, { useState } from "react";
import InvoiceForm from "../components/InvoiceForm";
import InvoiceList from "../components/InvoiceList";

function InvoicesPage() {
  const [showForm, setShowForm] = useState(false);

  const handleCreateClick = () => {
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  return (
    <div className="container mx-auto p-4">
      {showForm ? (
        <div>
          <button
            onClick={handleFormClose}
            className="mb-4 bg-gray-300 text-black rounded-md py-2 px-4 hover:bg-gray-400 transition duration-300"
          >
            Volver al Listado
          </button>
          <InvoiceForm />
        </div>
      ) : (
        <InvoiceList onCreate={handleCreateClick} />
      )}
    </div>
  );
}

export default InvoicesPage;
