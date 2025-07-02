// src/components/OrderCard.js
import React, { useState, useEffect } from 'react';
import './OrderCard.css'; // Estilos del componente
import productService from '../../services/productService'; // Importamos el servicio de productos

const getStatusClass = (status) => {
  switch(status.toUpperCase()) {
    case 'DELIVERED':
      return 'or-status-delivered';
    case 'SHIPPING':
      return 'or-status-shipping';
    case 'PENDING':
      return 'or-status-preparing';
    default:
      return '';
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

const formatPrice = (price) => {
  return `S/ ${Number(price.$numberDecimal).toFixed(2)}`;
};

const OrderCard = ({ order }) => {
  const [expanded, setExpanded] = useState(false);
  const [productDetails, setProductDetails] = useState([]); // Guardar detalles de los productos

  // Obtener detalles de los productos cuando se reciba el ID del producto
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productsWithDetails = await Promise.all(
          order.products.map(async (orderProduct) => {
            const productData = await productService.getProducts();
            const productDetail = productData.find(p => p._id === orderProduct.product_id);
            return {
              ...productDetail,
              quantity: orderProduct.quantity,
              unit_price: orderProduct.unit_price,
              total_amount: orderProduct.total_amount
            };
          })
        );
        setProductDetails(productsWithDetails);
      } catch (error) {
        console.error('Error al obtener detalles del producto:', error);
      }
    };

    fetchProductDetails(); // Llamar a la función para cargar los detalles de los productos
  }, [order.products]);

  return (
    <div className="or-order-card">
      <div className="or-order-basic-info">
        <div className="or-order-summary">
          <div className="or-order-meta">
            <span className={`or-order-status ${getStatusClass(order.status)}`}>
              {order.status === 'PENDING' ? 'Preparando' : 
               order.status === 'SHIPPING' ? 'En camino' : 'Entregado'}
            </span>
            <span className="or-order-id">Pedido #{order._id.slice(-8)}</span>
            <span className="or-order-date">
              Fecha de entrega: {formatDate(order.delivery_date)}
            </span>
          </div>

          <div className="or-products-preview">
            {productDetails.map((product, index) => (
              <div key={index} className="or-product-thumbnail">
                <img 
                  src={product.photos[0] || '/default-product.jpg'} 
                  alt={product.name} 
                />
              </div>
            ))}
          </div>
        </div>

        <button 
          className="or-view-details"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Ocultar detalles' : 'Ver detalles del pedido'}
        </button>
      </div>

      {expanded && (
        <div className="or-order-details">
          <div className="or-shipping-info">
            <div className="or-shipping-header">
              <h3>Dirección de envío</h3>
              <span className="or-delivery-time">
                Entrega estimada: {formatDate(order.delivery_date)}
              </span>
            </div>
            <div className="or-shipping-address">
              <p>{order.shipping_address.full_address}</p>
            </div>
          </div>

          <div className="or-products-list">
            {productDetails.map((product, index) => (
              <div key={index} className="or-product-item">
                <div className="or-product-image">
                  <img 
                    src={product.photos[0] || '/default-product.jpg'} 
                    alt={product.name} 
                  />
                </div>
                <div className="or-product-info">
                  <h4 className="or-product-name">{product.name}</h4>
                  <p className="or-product-description">{product.description}</p>
                  <div className="or-product-details">
                    <span>Cantidad: {product.quantity}</span>
                    <span>Precio unitario: {formatPrice(product.unit_price)}</span>
                    <span>Total: {formatPrice(product.total_amount)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="or-payment-info">
            <div className="or-payment-method">
              <span>Método de pago:</span>
              <span>Tarjeta terminada en {order.payment_summary.last_digits}</span>
            </div>
            <div className="or-payment-total">
              <span>Total del pedido:</span>
              <span>{formatPrice(order.total_amount)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderCard;
