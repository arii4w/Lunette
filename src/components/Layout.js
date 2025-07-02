// src/components/Layout.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header'; // Corregido el path
import { Outlet } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();
  
  // Mostrar el Header solo si no estamos en /login o /register
  const showHeader = location.pathname !== '/login' && location.pathname !== '/register';

  return (
    <div>
      {showHeader && <Header />}
      <Outlet /> {/* Este es el lugar donde se cargan las rutas hijas */}
    </div>
  );
};

export default Layout; // Asegúrate de usar export default
