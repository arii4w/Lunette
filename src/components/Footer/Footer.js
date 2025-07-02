// src/components/Footer.js
import React from 'react';
import './Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h3>Lunette</h3>
        <p>Brindar joyería personalizada con un sello de elegancia, fantasía y exclusividad.</p>
      </div>
      <div className="footer-section">
        <h3>Categorías</h3>
        <ul>
          <li>Collares</li>
          <li>Pulseras</li>
          <li>Aretes</li>
        </ul>
      </div>
      <div className="footer-section">
        <h3>Legal</h3>
        <ul>
          <li>Libro de Reclamaciones</li>
        </ul>
      </div>
      <div className="footer-section">
        <h3>Contáctanos</h3>
        <ul>
          <li>+51 123 456 678</li>
          <li>lunette@gmail.com</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
