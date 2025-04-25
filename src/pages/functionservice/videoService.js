// functionservice/videoService.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const videoService = {
  async createVideo(videoData) {
    try {
      const response = await api.post('/videos', videoData);
      return response.data;
    } catch (error) {
      console.error("Error creating video:", error.response?.data || error.message);
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

  async getVideoById(id) {
    try {
      const response = await api.get(`/videos/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching video by ID:", error);
      throw error;
    }
  },

  async editVideo(id, videoData) {
    try {
      const { id: _, ...payload } = videoData;
      const response = await api.put(`/videos/${id}`, payload);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred while editing the video.';
      console.error("Error editing video:", errorMessage);
      throw new Error(errorMessage);
    }
  },

  async deleteVideo(id) {
    try {
      const response = await api.delete(`/videos/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting video:", error);
      throw error;
    }
  },
};

export default videoService;
