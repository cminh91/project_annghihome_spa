import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL;

// Create axios instance with default headers
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

const categoryService = {
  async createCategory(categoryData) {
    try {
      if (!categoryData.name || !categoryData.slug || !categoryData.type) {
        throw new Error('Tên danh mục, slug và type là bắt buộc');
      }
      const response = await api.post('/categories', {
        name: categoryData.name.trim(),
        slug: categoryData.slug.trim(),
        type: categoryData.type.trim(),
        description: categoryData.description?.trim() || '',
        isActive: Boolean(categoryData.isActive),
        sortOrder: Number(categoryData.sortOrder) || 0,
        level: Number(categoryData.level) || 0
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 409) {
        // Handle duplicate name error
        throw new Error('Tên danh mục đã tồn tại!');
      }
      console.error("Chi tiết lỗi:", error.response?.data || error.message);
      throw error;
    }
  },

  async editCategory(id, categoryData) {
    try {
      if (!categoryData.name || !categoryData.slug || !categoryData.type) {
        throw new Error('Tên danh mục, slug và type là bắt buộc');
      }

      const response = await api.put(`/categories/${id}`, {
        name: categoryData.name.trim(),
        slug: categoryData.slug.trim(),
        type: categoryData.type.trim(),
        description: categoryData.description?.trim() || '',
        isActive: Boolean(categoryData.isActive),
        sortOrder: Number(categoryData.sortOrder) || 0,
        level: Number(categoryData.level) || 0
      });
      return response.data;
    } catch (error) {
      console.error("Error editing category:", error.response?.data || error.message);
      throw error;
    }
  },

  async getAllCategories() {
    try {
      const response = await api.get('/categories');
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },

  async getCategoryById(id) {
    try {
      const response = await api.get(`/categories/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching category by ID:", error);
      throw error;
    }
  },

  async deleteCategory(id) {
    try {
      const response = await api.delete(`/categories/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting category:", error);
      throw error;
    }
  },

  // Lấy danh mục theo type (ví dụ: PRODUCT)
  async getCategoriesByType(type) {
    try {
      const response = await api.get(`/categories/by-type/${type}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching categories by type:", error);
      throw error;
    }
  }

}
export default categoryService;
