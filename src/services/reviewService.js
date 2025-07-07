// src/services/reviewService.js
import axios from 'axios';

const API_URL = 'http://20.169.245.239:5000/reviews';

const getCommentsByProductId = async (productId) => {
  const response = await axios.get(`${API_URL}/${productId}`);
  return response.data;
};

const addComment = async (reviewData) => {
  const response = await axios.post(`${API_URL}`, reviewData);
  return response.data;
};

export default {
  getCommentsByProductId,
  addComment
};
