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

const videoService = {
  async createVideo(videoData) {
    try {
      const response = await api.post('/videos', videoData);
      return response.data;
    } catch (error) {
      console.error("Error creating videos:", error.response?.data || error.message);
      throw error;
    }
  },
  async getAllVideos() {
    try {
      const response = await api.get('/videos');
      return response.data;
    } catch (error) {
      console.error("Error fetching videos:", error);
      throw error;
    }
  },

  async getVideosById(id) {
    try {
      const response = await api.get(`/videos/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching videos by ID:", error);
      throw error;
    }
  },

  async editVideo(id, videoData) {
    try {
      const response = await api.put(`/videos/${id}`, videoData);
      return response.data;
    } catch (error) {
      console.error("Error editing videos:", error.response?.data || error.message);
      throw error;
    }
  },

  async deleteVideo(id) {
    try {
      const response = await api.delete(`/videos/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting videos:", error);
      throw error;
    }
  },
};

export default videoService;
