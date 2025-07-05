// src/services/cartService.js
import axios from 'axios';

const API_URL = 'http://20.169.245.239:5000/shopping_carts';

// Obtener carrito por ID de usuario
const getCartByUserId = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener carrito:", error);
    throw error;
  }
};

// Agregar producto al carrito
const addProductToCart = async (userId, productData) => {
  try {
    const response = await axios.put(`${API_URL}/user/${userId}`, {
      products: [productData]
    });
    return response.data;
  } catch (error) {
    console.error("Error al agregar producto al carrito:", error);
    throw error;
  }
};

// Eliminar producto del carrito
const removeProductsFromCart = async (userId, productIds) => {
  try {
    const response = await axios.put(`${API_URL}/remove_products/${userId}`, {
      product_ids: productIds // array de strings (product_id)
    });
    return response.data;
  } catch (error) {
    console.error("Error al eliminar productos del carrito:", error);
    throw error;
  }
};

// Vaciar carrito
const emptyCart = async (userId) => {
  try {
    const response = await axios.put(`${API_URL}/empty/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error al vaciar el carrito:", error);
    throw error;
  }
};

export default {
  getCartByUserId,
  addProductToCart,
  removeProductsFromCart,
  emptyCart
};
