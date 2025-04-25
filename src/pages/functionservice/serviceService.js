import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api'; // Use REACT_APP_API_BASE_URL

// Create axios instance with default headers and base URL
const api = axios.create({
  baseURL: API_BASE_URL,
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


const serviceService = {
  // Lấy tất cả dịch vụ (có phân trang, tìm kiếm, sắp xếp)
  getAllServices: async (page = 1, limit = 6, searchTerm = '', sortBy = 'createdAt', sortOrder = 'DESC') => {
    try {
      const response = await api.get(`/services`, { // Use 'api' instance
        params: {
          page,
          limit,
          searchTerm,
          sortBy,
          sortOrder,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching services:', error);
      throw error;
    }
  },

  // Lấy dịch vụ theo ID
  getServiceById: async (id) => {
    try {
      const response = await api.get(`/services/${id}`); // Use 'api' instance
      return response.data;
    } catch (error) {
      console.error(`Error fetching service with ID ${id}:`, error);
      throw error;
    }
  },

  // Tạo dịch vụ mới
  createService: async (serviceData) => {
    try {
      const response = await api.post(`/services`, serviceData, { // Use 'api' instance
         withCredentials: true, // Add withCredentials if needed
      });
      return response.data;
    } catch (error) {
      console.error('Error creating service:', error);
      throw error;
    }
  },

  // Cập nhật dịch vụ
  editService: async (id, serviceData) => {
    try {
      const response = await api.put(`/services/${id}`, serviceData, { // Use 'api' instance
        withCredentials: true, // Add withCredentials if needed
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating service with ID ${id}:`, error);
      throw error;
    }
  },

  // Xóa mềm dịch vụ
  deleteService: async (id) => {
    try {
      const response = await api.delete(`/services/${id}`); // Use 'api' instance
      return response.data;
    } catch (error) {
      console.error(`Error deleting service with ID ${id}:`, error);
      throw error;
    }
  },

  // Lấy danh sách dịch vụ trong thùng rác
  getTrashedServices: async (page = 1, limit = 6, searchTerm = '') => {
    try {
      const response = await api.get(`/services/trash`, { // Use 'api' instance
        params: {
          page,
          limit,
          searchTerm,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching trashed services:', error);
      throw error;
    }
  },

  // Khôi phục dịch vụ từ thùng rác
  restoreService: async (id) => {
    try {
      const response = await api.post(`/services/restore/${id}`); // Use 'api' instance
      return response.data;
    } catch (error) {
      console.error(`Error restoring service with ID ${id}:`, error);
      throw error;
    }
  },

  // Xóa vĩnh viễn dịch vụ
  forceDeleteService: async (id) => {
    try {
      const response = await api.delete(`/services/force-delete/${id}`); // Use 'api' instance
      return response.data;
    } catch (error) {
      console.error(`Error force deleting service with ID ${id}:`, error);
      throw error;
    }
  },

   // Lấy danh mục theo loại (ví dụ: 'service')
   getCategoriesByType: async (type) => {
    try {
      const response = await api.get(`/categories/by-type/${type}`); // Use 'api' instance and correct endpoint
      return response.data;
    } catch (error) {
      console.error(`Error fetching categories of type ${type}:`, error);
      throw error;
    }
  },
};

export default serviceService;