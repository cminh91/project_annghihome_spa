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

const productService = {
  async createProduct(productData) {
    const {
      name,
      slug,
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
    formData.append('slug', slug);
    formData.append('description', description || '');
    formData.append('longDescription', longDescription || '');
    formData.append('price', price);
    if (salePrice) {
      formData.append('salePrice', salePrice);
    }
    formData.append('imageUrl', imageUrl || '');

    if (additionalImages && additionalImages.length > 0) {
      additionalImages.forEach((image) => {
        formData.append('additionalImages', image);
      });
    }
    formData.append('categoryId', categoryId || '');

    try {
      const response = await api.post('/products', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  },

  async getAllProducts(page = 1, limit = 10) {
    console.log('Fetching products with page:', page, 'and limit:', limit);
    try {
      const response = await api.get(`/products?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  async getProductById(id) {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      throw error;
    }
  },

  async editProduct(id, productData) {
    const {
      name,
      slug,
      description,
      longDescription,
      price,
      salePrice,
      inStock,
      featured,
      isActive,
      categoryId,
      specs,
      metaTitle,
      metaDescription,
      metaKeywords,
      images,
    } = productData;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('slug', slug);
    formData.append('description', description || '');
    formData.append('longDescription', longDescription || '');
    formData.append('price', price.toString());
    if (salePrice) formData.append('salePrice', salePrice.toString());
    formData.append('inStock', inStock ? 'true' : 'false');
    formData.append('featured', featured ? 'true' : 'false');
    formData.append('isActive', isActive ? 'true' : 'false');
    formData.append('categoryId', categoryId || '');
    formData.append('specs', specs || '');
    formData.append('metaTitle', metaTitle || '');
    formData.append('metaDescription', metaDescription || '');
    formData.append('metaKeywords', metaKeywords || '');

    if (images && images.length > 0) {
      images.forEach((img) => {
        formData.append('images', img);
      });
    }

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
      const response = await api.delete(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  },
};

export default productService;
