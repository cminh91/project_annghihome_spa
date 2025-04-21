import axios from 'axios';

const API_URL = 'http://localhost:4000/api/stores';  // Đảm bảo URL khớp với API endpoint

const storeService = {
  // Tạo mới Store
  async createStore(storeData) {
    try {
      const response = await axios.post(API_URL, storeData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating store:', error);
      throw error;
    }
  },

  // Lấy danh sách tất cả các Store
  async getAllStores() {
    try {
      const response = await axios.get(API_URL, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching stores:', error);
      throw error;
    }
  },

  // Lấy thông tin Store theo ID
  async getStoreById(id) {
    try {
      const response = await axios.get(`${API_URL}/${id}`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching store by ID:', error);
      throw error;
    }
  },

  // Cập nhật thông tin Store
  async updateStore(id, storeData) {
    try {
      const response = await axios.put(`${API_URL}/${id}`, storeData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating store:', error);
      throw error;
    }
  },

  // Xóa Store theo ID
  async deleteStore(id) {
    try {
      const response = await axios.delete(`${API_URL}/${id}`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting store:', error);
      throw error;
    }
  },
};

export default storeService;
