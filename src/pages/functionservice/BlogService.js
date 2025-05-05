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

const blogService = {
  async getPosts({ page = 1, limit = 10, search = '', tag = '' } = {}) {
    try {
      const params = {};
      if (search) params.search = search;
      if (tag) params.tag = tag;
      if (limit) params.limit = limit;
      if (page) params.page = page;
      const response = await api.get('/posts', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  },

  async getCategoriesByType(type) {
    try {
      const response = await api.get(`/categories/by-type/${type}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching categories by type ${type}:`, error);
      throw error;
    }
  },
  async createBlog(blogData) {
    try {
      const response = await api.post('/posts', blogData);
      return response.data;
    } catch (error) {
      console.error("Error creating blog:", error.response?.data || error.message);
      throw error;
    }
  },
  async getAllBlogs() {
    try {
      const response = await api.get('/posts');
      return response.data.posts;
    } catch (error) {
      console.error("Error fetching blogs:", error);
      throw error;
    }
  },
  async getBlogById(slug) {
    try {
      const response = await api.get(`/posts/${slug}`);
      return response.data;
      
    } catch (error) {
      console.error("Error fetching blog:", error);
      throw error;
    }
  },
  async updateBlog(id, blogData) {
    try {
      const response = await api.put(`/posts/${id}`, blogData);
      return response.data;
    } catch (error) {
      console.error("Error updating blog:", error.response?.data || error.message);
      throw error;
    }
  },
  async deleteBlog(id) {
    try {
      const response = await api.delete(`/posts/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting blog:", error);
      throw error;
    }
  }
};

export default blogService;
