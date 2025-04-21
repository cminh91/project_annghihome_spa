import axios from 'axios';

const API_URL = 'http://localhost:4000/api/';

const productService = {
  async createProduct(productData) {
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
      const response = await axios.post(`${API_URL}products`, formData, {
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
      const response = await axios.get(`${API_URL}products`, {
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
      const response = await axios.get(`${API_URL}products/${id}`, {
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
      const response = await axios.put(`${API_URL}products/${id}`, formData, {
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
      const response = await axios.delete(`${API_URL}products/${id}`, {
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
