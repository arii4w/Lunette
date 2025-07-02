// src/components/Product.js
import React from 'react';
import { Link } from 'react-router-dom'; // Para hacer el producto clickeable
import './Product.css'; // Estilos específicos para el producto

const Product = ({ image, name, price, productId }) => {
  return (
    <div className="product">
      <Link to={`/product/${productId}`} className="product-link">
        <div className="product-image" style={{ backgroundImage: `url(${image})` }}>
          <button className="add-to-cart">+</button>
        </div>
        <div className="product-info">
          <p className="product-name">{name}</p>
          <p className="product-price">s/ {price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
