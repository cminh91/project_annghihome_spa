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

const contactService = {
  async createContact(contactData) {
    try {
        const formattedData = {
            name: contactData.name,
            phoneNumber: contactData.phoneNumber,
            subject: contactData.message,
            email: contactData.email,
            message: contactData.message,

          };
      const response = await api.post('/contact', formattedData);
      return response.data;
    } catch (error) {
      console.error("Error creating contact:", error.response?.data || error.message);
      throw error;
    }
  },
  async getAllContact() {
    try {
      const response = await api.get('/contact');
      console.log("Response data from getAllcontact:", response.data);
      return response.data;
      
    } catch (error) {
      console.error("Error fetching contact:", error);
      throw error;
    }
  },

  async getContactById(id) {
    try {
      const response = await api.get(`/contact/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching contact by ID:", error);
      throw error;
    }
  },

  async markAsRead(id) {
    try {
      const response = await api.put(`/contact/${id}/read`);
      return response.data;
    } catch (error) {
      console.error("Error marking as read:", error.response?.data || error.message);
      throw error;
    }
  },
  
  async markAsReplied(id) {
    try {
      const response = await api.put(`/contact/${id}/replied`);
      return response.data;
    } catch (error) {
      console.error("Error marking as replied:", error.response?.data || error.message);
      throw error;
    }
  },
  

  async deleteContact(id) {
    try {
      const response = await api.delete(`/contact/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting contact:", error);
      throw error;
    }
  },
};

export default contactService;
