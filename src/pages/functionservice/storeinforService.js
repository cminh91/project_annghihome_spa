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

const storeinfnorService = {
  async createStoreinfo(storeinfoData) {
    try {
      const response = await api.post('/store-info', storeinfoData);
      return response.data;
    } catch (error) {
      console.error("Error creating store-info:", error.response?.data || error.message);
      throw error;
    }
  },

  async getAllStoreinfo() {
    try {
      const response = await api.get('/store-info');
      return response.data;
    } catch (error) {
      console.error("Error fetching store-info:", error);
      throw error;
    }
  },

  async getStoreinfoById(id) {
    try {
      const response = await api.get(`/store-info/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching store-info by ID:", error);
      throw error;
    }
  },

  async editStoreinfo(id, storeinfoData) {
    try {
      const { id: _, ...payload } = storeinfoData;
      const response = await api.put(`/store-info/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error("Error editing store-info:", error.response?.data || error.message);
      throw error;
    }
  },

  async deleteStoreinfo(id) {
    try {
      const response = await api.delete(`/store-info/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting store:", error);
      throw error;
    }
  },
};

export default storeinfnorService;