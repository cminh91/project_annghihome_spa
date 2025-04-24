import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL;

// Create axios instance with default headers and authorization
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add request interceptor to include token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('jwt-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

const bannerService = {
  async createBanner(bannerData) {
    try {
      const response = await api.post('/banners', bannerData);
      return response.data;
    } catch (error) {
      console.error("Error creating banner:", error.response?.data || error.message);
      throw error;
    }
  },
  async getAllBanners() {
    try {
      const response = await api.get('/banners');
      return response.data;
    } catch (error) {
      console.error("Error fetching banners:", error);
      throw error;
    }
  },

  async getBannerById(id) {
    try {
      const response = await api.get(`/banners/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching banner by ID:", error);
      throw error;
    }
  },

  async editBanner(id, bannerData) {
    try {
      const response = await api.put(`/banners/${id}`, bannerData);
      return response.data;
    } catch (error) {
      console.error("Error editing banner:", error.response?.data || error.message);
      throw error;
    }
  },

  async deleteBanner(id) {
    try {
      const response = await api.delete(`/banners/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting banner:", error);
      throw error;
    }
  },
};

export default bannerService;
