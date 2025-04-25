<<<<<<< HEAD
=======
// functionservice/videoService.js
>>>>>>> main
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL;

<<<<<<< HEAD
// Create axios instance with default headers and authorization
=======
>>>>>>> main
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
<<<<<<< HEAD
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
=======
  },
>>>>>>> main
});

const videoService = {
  async createVideo(videoData) {
    try {
      const response = await api.post('/videos', videoData);
      return response.data;
    } catch (error) {
<<<<<<< HEAD
      console.error("Error creating videos:", error.response?.data || error.message);
      throw error;
    }
  },
  async getAllVideos() {
    try {
      const response = await api.get('/videos');
      console.log("Response data from getAllVideos:", response.data);
      return response.data.videos;
      
=======
      console.error("Error creating video:", error.response?.data || error.message);
      throw error;
    }
  },

  async getAllVideos() {
    try {
      const response = await api.get('/videos');
      return response.data;
>>>>>>> main
    } catch (error) {
      console.error("Error fetching videos:", error);
      throw error;
    }
  },

<<<<<<< HEAD
  async getVideosById(id) {
=======
  async getVideoById(id) {
>>>>>>> main
    try {
      const response = await api.get(`/videos/${id}`);
      return response.data;
    } catch (error) {
<<<<<<< HEAD
      console.error("Error fetching videos by ID:", error);
=======
      console.error("Error fetching video by ID:", error);
>>>>>>> main
      throw error;
    }
  },

  async editVideo(id, videoData) {
    try {
<<<<<<< HEAD
      const response = await api.put(`/videos/${id}`, videoData);
      return response.data;
    } catch (error) {
      console.error("Error editing videos:", error.response?.data || error.message);
      if (error.response) {
        console.error("Server response:", error.response.data);
      }
    throw error;
=======
      const { id: _, ...payload } = videoData;
      const response = await api.put(`/videos/${id}`, payload);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred while editing the video.';
      console.error("Error editing video:", errorMessage);
      throw new Error(errorMessage);
>>>>>>> main
    }
  },

  async deleteVideo(id) {
    try {
      const response = await api.delete(`/videos/${id}`);
      return response.data;
    } catch (error) {
<<<<<<< HEAD
      console.error("Error deleting videos:", error);
=======
      console.error("Error deleting video:", error);
>>>>>>> main
      throw error;
    }
  },
};

export default videoService;
