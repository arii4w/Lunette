// src/pages/Orders.js
import React, { useState, useEffect } from 'react';
import './Orders.css';
import orderService from '../services/orderService'; // Importamos el servicio
import OrderCard from '../components/OrderCard'; // Importamos el nuevo componente

const Orders = () => {
  const [orders, setOrders] = useState([]); // Estado para almacenar las órdenes
  const [loading, setLoading] = useState(true); // Estado para controlar la carga
  const userId = "6864e6367a786a1395efe718"; // El ID del usuario (esto debería ser dinámico)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await orderService.getOrdersByUserId(userId);
        if (fetchedOrders && Array.isArray(fetchedOrders)) {
          setOrders(fetchedOrders); // Guardamos las órdenes en el estado
        } else {
          console.error('Error: La respuesta de la API no contiene una lista de órdenes');
        }
      } catch (error) {
        console.error("Error al cargar las órdenes:", error);
      } finally {
        setLoading(false); // Termina la carga
      }
    };

    fetchOrders(); // Llamamos la función para cargar las órdenes
  }, [userId]);

  if (loading) {
    return <div>Cargando órdenes...</div>;
  }

  return (
    <div className="or-orders">
      <h1 className="or-orders-title">Mis Pedidos</h1>
      <div className="or-orders-list">
        {orders.length > 0 ? (
          orders.map((order) => (
            // Validamos que la orden tenga items antes de renderizar
            order.products && Array.isArray(order.products) && order.products.length > 0 ? (
              <OrderCard key={order._id} order={order} /> // Usamos _id como key
            ) : (
              <div key={order._id} className="or-order-card">
                <p>No hay productos disponibles para esta orden.</p>
              </div>
            )
          ))
        ) : (
          <div>No tienes órdenes para mostrar.</div>
        )}
      </div>
    </div>
  );
};

export default Orders;
