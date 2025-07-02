// src/services/orderService.js
import axios from 'axios';

// URL base del API
const API_URL = 'http://20.169.245.239:5000/products/ls';

// Función para obtener los productos
const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    console.log("Respuesta recibida:", response.data);  // Verifica la respuesta aquí
    return response.data; // Devolvemos los datos de las órdenes
  } catch (error) {
    console.error("Error al obtener las órdenes:", error);
    throw error; // Lanzamos el error para que pueda ser manejado en el componente
  }
};

export default {
  getProducts,
};
