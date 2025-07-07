// src/pages/Checkout/CheckoutStep3.js
import React from 'react';
import './Checkout.css';
import { Link } from 'react-router-dom';

const CheckoutStep3 = ({ checkoutData }) => {
  const {
    orderId,
    createdAt,
    address,
    total
  } = checkoutData;

  return (
    <div className="checkout-step">
      <h2>¡Compra realizada con éxito!</h2>
      <p>Gracias por tu compra. Pronto recibirás un correo electrónico con los detalles de tu pedido.</p>

      <p><strong>Número de pedido:</strong> {orderId || 'No disponible'}</p>
      <p><strong>Fecha:</strong> {createdAt ? new Date(createdAt).toLocaleDateString() : 'No disponible'}</p>
      <p><strong>Total:</strong> S/ {parseFloat(total).toFixed(2)}</p>
      <p><strong>Dirección de envío:</strong> {address?.full_address || 'No disponible'}</p>

      <div className="button-center">
        <Link to="/home">
          <button className="success-button">Volver a la tienda</button>
        </Link>
      </div>
    </div>
  );
};

export default CheckoutStep3;
