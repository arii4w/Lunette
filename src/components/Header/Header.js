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

      <div className="nav-groups">
        {/* Grupo de opciones */}
        {isAuthenticated ? (
          <div className="nav-options">
            <Link to="/" className="nav-link">Inicio</Link>
            <Link to="/cart" className="nav-link">Carrito</Link>
            <Link to="/orders" className="nav-link">Órdenes</Link>
          </div>
        ) : null} {/* Solo se muestra si el usuario está autenticado */}

        {/* Grupo de perfil / Autenticación */}
        <div className="nav-profile">
          {isAuthenticated ? (
            <>
              <Link to="/profile">
              <button className="profile-button">Perfil</button>
              </Link>
              <button onClick={logOut} className="logout-button">Cerrar sesión</button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="auth-button">Iniciar sesión</button>
              </Link>
              <Link to="/register">
                <button className="auth-button">Crear Cuenta</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
