import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-black text-white p-4 flex justify-between items-end h-16">
      <div className="flex items-center">
        <img src="/Logo.svg" alt="Facturate Logo" className="h-10 w-40 mr-2" />
      </div>
      <div className="pt-10">
        <nav className="flex space-x-8 h-full">
          <NavLink
            to="/clientes"
            className={({ isActive }) =>
              isActive
                ? "text-white border-b-4 border-purple-500 flex items-center pb-1 px-2 h-full"
                : "text-white hover:text-purple-400 flex items-center pb-1 px-2 h-full"
            }
          >
            Clientes
          </NavLink>
          <NavLink
            to="/facturas"
            className={({ isActive }) =>
              isActive
                ? "text-white border-b-4 border-purple-400 flex items-center pb-1 h-full"
                : "text-white hover:text-purple-400 flex items-center pb-1 px-2 h-full"
            }
          >
            Facturas
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;