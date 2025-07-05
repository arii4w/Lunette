import axios from "axios";

const API_URL = "http://20.169.245.239:5000/favorite_products";

const favoriteService = {
  // Crear un nuevo producto favorito
  addFavorite: async (userId, productId) => {
    const response = await axios.post(API_URL, {
      user_id: userId,
      product_id: productId,
      created_at: new Date().toISOString(),
    });
    return response.data;
  },

  // Obtener todos los productos favoritos de un usuario
  getFavoritesByUser: async (userId) => {
    const response = await axios.get(`${API_URL}/user/${userId}`);
    return response.data;
  },

  // Eliminar un producto favorito por su _id en favoritos
  deleteFavoriteById: async (favoriteId) => {
    const response = await axios.delete(`${API_URL}/${favoriteId}`);
    return response.data;
  },
};

export default favoriteService;
