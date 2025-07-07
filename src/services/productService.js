// src/services/orderService.js
import axios from 'axios';

// URL base del API
const API_URL = 'http://20.169.245.239:5000/products';

// Función para obtener los productos
const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/ls`);
    console.log("Datos crudos recibidos:", JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    throw error;
  }
};

const getProductById = async (productId) => {
  const response = await axios.get(`${API_URL}/${productId}`);
  console.log("Producto obtenido por ID:", response.data);
  return response.data;
};


export default {
  getProducts,
  getProductById
};
