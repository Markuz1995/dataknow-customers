import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CustomersPage from './pages/CustomerPage';
import InvoicesPage from './pages/InvoicesPage';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-purple-50">
        <Header />
        <main className="p-8">
          <Routes>
            <Route path="/" element={<Navigate to="/clientes" />} />
            <Route path="/clientes" element={<CustomersPage />} />
            <Route path="/facturas" element={<InvoicesPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
