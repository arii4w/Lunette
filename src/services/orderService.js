// src/services/orderService.js
import axios from 'axios';

// URL base del API
const API_URL = 'http://20.169.245.239:5000/orders/user/';

// Función para obtener las órdenes de un usuario
const getOrdersByUserId = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}${userId}`);
    console.log("Respuesta recibida:", response.data);  // Verifica la respuesta aquí
    return response.data; // Devolvemos los datos de las órdenes
  } catch (error) {
    console.error("Error al obtener las órdenes:", error);
    throw error; // Lanzamos el error para que pueda ser manejado en el componente
  }
};

export default {
  getOrdersByUserId,
};
