import axios from "axios";

const API_URL = "http://20.169.245.239:5000";

const checkoutService = {
  addAddress: async (userId, address) => {
    const res = await axios.post(`${API_URL}/users/add-address`, {
      user_id: userId,
      full_address: address,
      is_default: false,
    });
    return res.data;
  },
  addCard: async (userId, card) => {
    const res = await axios.post(`${API_URL}/users/add-card`, {
      user_id: userId,
      card_number: card.card_number,
      card_type: card.card_type,
      cardholder_name: card.cardholder_name,
      expiration_month_year: card.expiration_month_year,
      cvv: card.cvv,
      //last_digits: card.last_digits,
    });
    return res.data;
  },
  getAddresses: async (userId) => {
    const res = await axios.get(`${API_URL}/users/${userId}/addresses`);
    return res.data;
  },
  getCards: async (userId) => {
    const res = await axios.get(`${API_URL}/users/${userId}/cards`);
    return res.data;
  },
  createOrder: async (orderData) => {
    const res = await axios.post(`${API_URL}/orders`, orderData);
    return res.data;
  },
};

export default checkoutService;
