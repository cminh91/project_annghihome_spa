import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const storeService = {
  async createaddresses(addressesData) {
    try {
      const response = await api.post('/addresses', addressesData);
      return response.data;
    } catch (error) {
      console.error("Error creating addresses:", error.response?.data || error.message);
      throw error;
    }
  },

  async getAlladdresses() {
    try {
      const response = await api.get('/addresses');
      return response.data;
    } catch (error) {
      console.error("Error fetching addresses:", error);
      throw error;
    }
  },

  async getaddressesById(id) {
    try {
      const response = await api.get(`/addresses/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching addresses by ID:", error);
      throw error;
    }
  },

  async editaddresses(id, addressesData) {
    try {
      const { id: _, ...payload } = addressesData;
      const response = await api.put(`/addresses/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error("Error editing addresses:", error.response?.data || error.message);
      throw error;
    }
  },

  async deleteaddresses(id) {
    try {
      const response = await api.delete(`/addresses/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting store:", error);
      throw error;
    }
  },
};

export default storeService;