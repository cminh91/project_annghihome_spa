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
api.interceptors.request.use(config => {
  const token = localStorage.getItem('jwt-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

const teamService = {
  async createTeam(teamData) {
    try {
      const response = await api.post('/team', teamData);
      return response.data;
    } catch (error) {
      console.error("Error creating teams:", error.response?.data || error.message);
      throw error;
    }
  },
  async getAllTeams() {
    try {
      const response = await api.get('/team');
      console.log("Response data from getAllteams:", response.data);
      return response.data;
      
    } catch (error) {
      console.error("Error fetching teams:", error);
      throw error;
    }
  },

  async getTeamsById(id) {
    try {
      const response = await api.get(`/team/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching teams by ID:", error);
      throw error;
    }
  },

  async editTeam(id, teamData) {
    try {
      console.log("Sending data to update team:", teamData);
      const response = await api.patch(`/team/${id}`, teamData);
      return response.data;
    } catch (error) {
      console.error("Error editing team:", error.response?.data || error.message);
      throw error;
    }
  },

  async deleteTeam(id) {
    try {
      const response = await api.delete(`/team/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting teams:", error);
      throw error;
    }
  },
};

export default teamService;
