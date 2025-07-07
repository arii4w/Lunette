// src/components/Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import './Layout.css';

const Layout = () => {
  return (
    <div className="layout-container">
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
