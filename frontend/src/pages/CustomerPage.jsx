import React, { useState } from "react";
import CustomerForm from "../components/CustomerForm";
import CustomerList from "../components/CustomerList";

function CustomersPage() {
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
          <CustomerForm />
        </div>
      ) : (
        <CustomerList onCreate={handleCreateClick} />
      )}
    </div>
  );
}

export default CustomersPage;
