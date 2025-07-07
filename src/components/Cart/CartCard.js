// src/components/CartCard.js
import React, { useState, useEffect } from "react";
import "./CartCard.css"; // Recuerda crearlo tú con estilos parecidos a OrderCard.css
import productService from "../../services/productService";

const formatPrice = (price) => {
  return `S/ ${Number(price).toFixed(2)}`;
};

const CartCard = ({ cart }) => {
  const [productDetails, setProductDetails] = useState([]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const allProducts = await productService.getProducts();
        const details = cart.products.map((cartItem) => {
          const product = allProducts.find(
            (p) => p._id === cartItem.product_id
          );
          return {
            ...product,
            quantity: cartItem.quantity,
            price: cartItem.price,
            total: cartItem.quantity * cartItem.price,
          };
        });
        setProductDetails(details);
      } catch (err) {
        console.error("Error al cargar productos del carrito:", err);
      }
    };

    fetchProductDetails();
  }, [cart.products]);

  const totalAmount = productDetails.reduce((sum, p) => sum + p.total, 0);

  return (
    <div className="cart-card">
      <h2>Productos en el carrito</h2>
      {productDetails.map((product, index) => (
        <div key={index} className="cart-item">
          <img
            src={product.photos[0]}
            alt={product.name}
            className="cart-item-image"
          />
          <div className="cart-item-info">
            <h4>{product.name}</h4>
            <p>Cantidad: {product.quantity}</p>
            <p>Precio unitario: {formatPrice(product.price)}</p>
            <p>Total: {formatPrice(product.total)}</p>
          </div>
        </div>
      ))}

      <div className="cart-total">
        <strong>Total general:</strong> {formatPrice(totalAmount)}
      </div>
    </div>
  );
};

export default CartCard;
