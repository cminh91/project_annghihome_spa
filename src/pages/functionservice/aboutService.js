import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const aboutService = {
  async createAbout(aboutData) {
    try {
      const response = await axios.post(`${API_URL}/about`, aboutData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating About:", error);
      throw error;
    }
  },

  async getAllAbout() {
    try {
      const response = await axios.get(`${API_URL}/about`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching About list:", error);
      throw error;
    }
  },

  async getAboutById(id) {
    try {
      const response = await axios.get(`${API_URL}/about/${id}`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching About by ID:", error);
      throw error;
    }
  },

  async updateAbout(id, aboutData) {
    try {
      const response = await axios.put(`${API_URL}/about/${id}`, aboutData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating About:", error.response || error.message);
      throw error;
    }
  },

  async deleteAbout(id) {
    try {
      const response = await axios.delete(`${API_URL}/about/${id}`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting About:", error);
      throw error;
    }
  },
};

export default aboutService;
