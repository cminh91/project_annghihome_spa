import axios from 'axios';

const API_URL = 'http://localhost:4000/api/';

const partnerService = {
  async createPartner(data) {
    const { name, logo, website, order, isActive } = data;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('logo', logo); // dạng URL hoặc file nếu có upload
    formData.append('website', website || '');
    formData.append('order', order?.toString() || '0');
    formData.append('isActive', isActive ? 'true' : 'false');

    try {
      const response = await axios.post(`${API_URL}partners`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating partner:', error);
      throw error;
    }
  },

  async getAllPartners() {
    try {
      const response = await axios.get(`${API_URL}partners`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching partners:', error);
      throw error;
    }
  },

  async getPartnerById(id) {
    try {
      const response = await axios.get(`${API_URL}partners/${id}`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching partner by ID:', error);
      throw error;
    }
  },

  async editPartner(id, data) {
    const { name, logo, website, order, isActive } = data;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('logo', logo);
    formData.append('website', website || '');
    formData.append('order', order?.toString() || '0');
    formData.append('isActive', isActive ? 'true' : 'false');

    try {
      const response = await axios.put(`${API_URL}partners/${id}`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error editing partner:', error);
      throw error;
    }
  },

  async deletePartner(id) {
    try {
      const response = await axios.delete(`${API_URL}partners/${id}`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting partner:', error);
      throw error;
    }
  },
};

export default partnerService;
