import React, { useState, useEffect } from "react";
import Select from "react-select";
import invoiceService from "../services/invoiceService";
import customerService from "../services/customerService";
import { toast, Toaster } from "react-hot-toast";
import { NumericFormat } from "react-number-format";

function InvoiceForm() {
  const [formData, setFormData] = useState({
    customerId: "",
    date: "",
    productName: "",
    price: "",
    discountValue: "0",
    vat: "19%",
    totalValue: "",
  });

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    customerService
      .getCustomers()
      .then((response) => {
        if (response && Array.isArray(response)) {
          const customerOptions = response.map((customer) => ({
            value: customer.id,
            label: customer.customerName,
          }));
          setCustomers(customerOptions);
        } else {
          console.error("Invalid customer data received:", response);
          setCustomers([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
        setCustomers([]);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const newData = { ...prevData, [name]: value };
      if (name === "price" || name === "discountValue") {
        return calculateInvoice(newData);
      }
      return newData;
    });
  };

  const handleCustomerChange = (selectedOption) => {
    setFormData({ ...formData, customerId: selectedOption.value });
  };

  const calculateInvoice = (data) => {
    const price = parseFloat(data.price) || 0;
    const discountValue = (parseFloat(data.discountValue) / 100) * price || 0;
    const netPrice = price - discountValue;
    const vat = netPrice * 0.19;
    const totalValue = netPrice + vat;

    return {
      ...data,
      vat: "19%",
      totalValue: totalValue.toFixed(2),
    };
  };

  const handlePriceChange = (values) => {
    const { value } = values;
    setFormData((prevData) => {
      const newData = { ...prevData, price: value };
      return calculateInvoice(newData);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await invoiceService.createInvoice({
        ...formData,
        vat: formData.vat.replace("%", ""),
        totalValue: parseFloat(formData.totalValue),
      });
      toast.success("Factura enviada exitosamente", {
        duration: 3000,
        position: "bottom-right",
        style: {
          background: "#4C1D95",
          color: "#fff",
          padding: "16px",
          borderRadius: "10px",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#4C1D95",
        },
      });
      setFormData({
        customerId: "",
        date: "",
        productName: "",
        price: "",
        discountValue: "0",
        vat: "19%",
        totalValue: "",
      });
    } catch (error) {
      toast.error("Error al enviar la factura", {
        duration: 3000,
        position: "bottom-right",
        style: {
          background: "#DC2626",
          color: "#fff",
          padding: "16px",
          borderRadius: "10px",
        },
      });
    }
  };

  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: "",
          style: {
            marginBottom: "70px",
          },
        }}
      />
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded p-8 space-y-6 max-w-2xl mx-auto"
      >
        <h2 className="text-2xl font-bold mb-4">Facturas</h2>
        <p className="text-purple-600 mb-6">Rellena la siguiente información</p>

        <div className="grid grid-cols-2 gap-4">
          <fieldset className="border border-gray-300 rounded-md p-4 relative">
            <legend className="text-sm font-medium text-gray-700 px-2">
              Cliente
            </legend>
            <Select
              value={customers.find(
                (option) => option.value === formData.customerId
              )}
              onChange={handleCustomerChange}
              options={customers}
              placeholder="Selecciona cliente"
              isSearchable
              className="w-full text-gray-700"
            />
          </fieldset>

          <fieldset className="border border-gray-300 rounded-md p-4 relative">
            <legend className="text-sm font-medium text-gray-700 px-2">
              Fecha
            </legend>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-2 border-none focus:ring-0 text-gray-700"
            />
          </fieldset>
        </div>

        <fieldset className="border border-gray-300 rounded-md p-4 relative">
          <legend className="text-sm font-medium text-gray-700 px-2">
            Nombre del producto
          </legend>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            placeholder="Escribe nombre de producto"
            className="w-full p-2 border-none focus:ring-0 text-gray-700 placeholder-gray-400"
          />
        </fieldset>

        <div className="grid grid-cols-2 gap-4">
          <fieldset className="border border-gray-300 rounded-md p-4 relative">
            <legend className="text-sm font-medium text-gray-700 px-2">
              Precio
            </legend>
            <NumericFormat
              thousandSeparator={true}
              prefix="$"
              name="price"
              value={formData.price}
              onValueChange={handlePriceChange}
              placeholder="Escribe precio"
              className="w-full p-2 border-none focus:ring-0 text-gray-700 placeholder-gray-400"
            />
          </fieldset>

          <fieldset className="border border-gray-300 rounded-md p-4 relative">
            <legend className="text-sm font-medium text-gray-700 px-2">
              Valor del descuento
            </legend>
            <select
              name="discountValue"
              value={formData.discountValue}
              onChange={handleChange}
              className="w-full p-2 border-none focus:ring-0 text-gray-700 bg-transparent"
            >
              {[0, 10, 20, 30, 40, 50].map((discount) => (
                <option key={discount} value={discount}>
                  {discount}%
                </option>
              ))}
            </select>
          </fieldset>
        </div>

        <fieldset className="border border-gray-300 rounded-md p-4 relative">
          <legend className="text-sm font-medium text-gray-700 px-2">
            Iva
          </legend>
          <input
            type="text"
            name="vat"
            value={formData.vat}
            onChange={handleChange}
            readOnly
            className="w-full p-2 border-none focus:ring-0 text-gray-700 bg-gray-100"
          />
        </fieldset>

        <p className="text-gray-700 mt-4 text-lg">
          Valor total de la factura:{" "}
          <span className="font-bold">
            $
            {parseFloat(formData.totalValue).toLocaleString("es-CO", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </p>

        <button
          type="submit"
          className="bg-purple-500 text-white rounded-md py-2 px-4 w-full hover:bg-purple-600 transition duration-300"
        >
          Enviar factura
        </button>
      </form>
    </>
  );
}

export default InvoiceForm;
