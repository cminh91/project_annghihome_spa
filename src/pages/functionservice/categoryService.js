
import axios from 'axios';

const API_URL = 'http://localhost:4000/api/';

const categoryService = {
  async createCategory(categoryData) {
    const {
      name,
      slug,
      description,
      type,
      isActive,
      order,
      parentId,
      contents,
      images, // array of File
    } = categoryData;
  
    const formData = new FormData();
    formData.append('name', name);
    formData.append('slug', slug);
    formData.append('description', description || '');
    formData.append('type', type);
    formData.append('isActive', isActive ? 'true' : 'false');
    formData.append('order', order?.toString() || '0');
    formData.append('parentId', parentId || '');
  
    // Nội dung bài viết
    contents.forEach((content, i) => {
      formData.append(`contents[${i}]`, content);
    });
  
    // Hình ảnh
    images.forEach((file, i) => {
      formData.append(`images`, file); // same field name for multiple files
    });
  
    try {
      const response = await axios.post(`${API_URL}categories`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating category:", error);
      throw error;
    }
  }
  ,
  async getAllCategories() {
    try {
      const response = await axios.get(`${API_URL}categories`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;  // Return the list of all categories
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },
  async getCategoryById(id) {
    try {
      const response = await axios.get(`${API_URL}categories/${id}`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      return response.data;  // Return the category found by ID
    } catch (error) {
      console.error("Error fetching category by ID:", error);
      throw error;
    }
  },
  async editCategory(id, categoryData) {
    const {
      name,
      slug,
      description,
      type,
      isActive,
      order,
      parentId,
      contents,
      images, // array of File
    } = categoryData;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('slug', slug);
    formData.append('description', description || '');
    formData.append('type', type);
    formData.append('isActive', isActive ? 'true' : 'false');
    formData.append('order', order?.toString() || '0');
    formData.append('parentId', parentId || '');

    // Nội dung bài viết
    contents.forEach((content, i) => {
      formData.append(`contents[${i}]`, content);
    });

    // Hình ảnh
    images.forEach((file, i) => {
      formData.append(`images`, file); // same field name for multiple files
    });

    try {
      const response = await axios.put(`${API_URL}categories/${id}`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error editing category:", error);
      throw error;
    }
  },
  async deleteCategory(id) {
    try {
      const response = await axios.delete(`${API_URL}categories/${id}`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      return response.data; // Return the response data after deletion
    } catch (error) {
      console.error("Error deleting category:", error);
      throw error;
    }
  }
  
}
export default categoryService;
