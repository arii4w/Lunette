// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../store/authStore'; 
import './Header.css'; // Importa el archivo CSS

const Header = () => {
  const { isAuthenticated, logOut } = useAuth(); // Accede al estado de autenticación

  return (
    <header className="header">
      <div className="logo">
        <h1>Lunette</h1>
      </div>

      {!isAuthenticated ? (
        <div className="nav-groups">
          {/* Grupo de opciones */}
          <div className="nav-options">
            <Link to="/" className="nav-link">Inicio</Link>
            <Link to="/cart" className="nav-link">Carrito</Link>
            <Link to="/orders" className="nav-link">Órdenes</Link>
          </div>

          {/* Grupo de perfil */}
          <div className="nav-profile">
            <button className="profile-button">Perfil</button>
            <button onClick={logOut} className="logout-button">Cerrar sesión</button>
          </div>
        </div>
      ) : (
        <nav className="nav-auth">
          <Link to="/login">
            <button className="auth-button">Iniciar sesión</button>
          </Link>
          <Link to="/register">
            <button className="auth-button">Crear Cuenta</button>
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
