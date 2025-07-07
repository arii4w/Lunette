// src/components/Product.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Product.css';

const Product = ({ image, name, price, productId, description }) => {
  const formatPrice = (price) => {
    if (price && price.$numberDecimal) {
      return price.$numberDecimal;
    }
    return price;
  };

  // Función para truncar el texto si es muy largo
  const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <div className="product">
      <Link to={`/product/${productId}`} className="product-link">
        <div className="product-badge">Nuevo</div>
        <div 
          className="product-image" 
          style={{ 
            backgroundImage: `url(${image || 'https://via.placeholder.com/200x200?text=Producto'})` 
          }}
        >
          <button className="add-to-cart" title="Añadir al carrito">
            +
          </button>
        </div>
        <div className="product-info">
          <h3 className="product-name">{truncateText(name, 40)}</h3>
          <p className="product-price">
            S/ {formatPrice(price)}
          </p>
          {description && (
            <p className="product-description">
              {truncateText(description, 60)}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
};

export default Product;
