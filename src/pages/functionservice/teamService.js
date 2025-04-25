import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL;

<<<<<<< HEAD
// Create axios instance with default headers and authorization
=======
// Create axios instance with default headers
>>>>>>> main
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});
<<<<<<< HEAD
=======

// Add request interceptor to include token
>>>>>>> main
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
<<<<<<< HEAD
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
=======
      if (!teamData.name || !teamData.image || !teamData.description) {
        throw new Error('Tên, hình ảnh và mô tả là bắt buộc');
      }

      const response = await api.post('/team', {
        name: teamData.name.trim(),
        image: teamData.image.trim(),
        description: teamData.description.trim(),
      });
      return response.data;
    } catch (error) {
      console.error("Error creating team member:", error.response?.data || error.message);
>>>>>>> main
      throw error;
    }
  },

  async editTeam(id, teamData) {
    try {
<<<<<<< HEAD
      console.log("Sending data to update team:", teamData);
      const response = await api.patch(`/team/${id}`, teamData);
      return response.data;
    } catch (error) {
      console.error("Error editing team:", error.response?.data || error.message);
=======
      if (!teamData.name || !teamData.image || !teamData.description) {
        throw new Error('Tên, hình ảnh và mô tả là bắt buộc');
      }

      const response = await api.patch(`/team/${id}`, { // Changed method to PATCH
        name: teamData.name.trim(),
        image: teamData.image.trim(),
        description: teamData.description.trim(),
      });
      return response.data;
    } catch (error) {
      console.error("Error editing team member:", error.response?.data || error.message);
      throw error;
    }
  },

  async getAllTeams() {
    try {
      const response = await api.get('/team');
      return response.data;
    } catch (error) {
      console.error("Error fetching team members:", error);
      throw error;
    }
  },

  async getTeamById(id) {
    try {
      const response = await api.get(`/team/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching team member by ID:", error);
>>>>>>> main
      throw error;
    }
  },

  async deleteTeam(id) {
    try {
      const response = await api.delete(`/team/${id}`);
      return response.data;
    } catch (error) {
<<<<<<< HEAD
      console.error("Error deleting teams:", error);
      throw error;
    }
  },
};

export default teamService;
=======
      console.error("Error deleting team member:", error);
      throw error;
    }
  }
};

export default teamService;
>>>>>>> main
