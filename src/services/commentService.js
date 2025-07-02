// src/services/orderService.js
import axios from 'axios';

// URL base del API
const API_URL = 'http://20.169.245.239:5000/reviews/';

// Función para obtener los comentarios de un producto
const getCommentsByProductId = async (productId) => {
  try {
    const response = await axios.get(`${API_URL}${productId}`);
    console.log("Respuesta recibida:", response.data);  // Verifica la respuesta aquí
    return response.data; // Devolvemos los datos de las órdenes
  } catch (error) {
    console.error("Error al obtener las órdenes:", error);
    throw error; // Lanzamos el error para que pueda ser manejado en el componente
  }
};

export default {
  getCommentsByProductId,
};
