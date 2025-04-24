import axios from 'axios';

const API_URL = process.env.REACT_APP_API_BASE_URL; // Đọc từ biến môi trường

// Tạo instance axios với baseURL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

const productService = {
  async createProduct(productData) {
    const {
      name,
      description,
      longDescription,
      price,
      salePrice,
      imageUrl,
      additionalImages,
      categoryId
    } = productData;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('longDescription', longDescription || '');
    formData.append('price', price.toString());
    if (salePrice) formData.append('salePrice', salePrice.toString());
    formData.append('imageUrl', imageUrl || '');
    if (additionalImages && additionalImages.length > 0) {
      additionalImages.forEach((img) => {
        formData.append('additionalImages', img);
      });
    }
    formData.append('categoryId', categoryId || '');

    try {
      const response = await api.post('/products', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  },

  async getAllProducts() {
    try {
      const response = await api.get('/products', {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  async getProductById(id) {
    try {
      const response = await api.get(`/products/${id}`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      throw error;
    }
  },

  async editProduct(id, productData) {
    const {
      name,
      description,
      longDescription,
      price,
      salePrice,
      imageUrl,
      additionalImages,
      categoryId
    } = productData;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('longDescription', longDescription || '');
    formData.append('price', price.toString());
    if (salePrice) formData.append('salePrice', salePrice.toString());
    formData.append('imageUrl', imageUrl || '');
    if (additionalImages && additionalImages.length > 0) {
      additionalImages.forEach((img) => {
        formData.append('additionalImages', img);
      });
    }
    formData.append('categoryId', categoryId || '');

    try {
      const response = await api.put(`/products/${id}`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error editing product:", error);
      throw error;
    }
  },

  async deleteProduct(id) {
    try {
      const response = await api.delete(`/products/${id}`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  },
};

export default productService;
