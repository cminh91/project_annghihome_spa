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

    const productDataToSend = {
      name: name.trim(),
      slug: slug?.trim() || '',
      description: description?.trim() || '',
      longDescription: longDescription?.trim() || '',
      price: Number(price),
      salePrice: salePrice ? Number(salePrice) : null,
      imageUrl: imageUrl || '',
      additionalImages: additionalImages || [],
      categoryId: categoryId || ''
    };

    try {
      const response = await api.post('/products', productDataToSend, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  },

  async getAllProducts(page = 1, limit = 10, searchTerm = '', sortBy = 'createdAt', sortOrder = 'DESC') {
    try {
      let apiUrl = `/products?sortBy=${sortBy}&sortOrder=${sortOrder}&page=${page}&limit=${limit}`;
      if (searchTerm) {
        apiUrl += `&searchTerm=${searchTerm}`;
      }
      const response = await api.get(apiUrl);
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      if (error.response && error.response.data && error.response.data.message) {
        console.error("Error message from backend:", error.response.data.message);
      } else {
        console.error("Error response data:", error.response?.data);
      }
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
      imageUrl,
      additionalImages,
      categoryId,
      inStock,
      featured,
      isActive,
      specs,
      metaTitle,
      metaDescription,
      metaKeywords,
      images
    } = productData;

    const productDataToSend = {
      name: name.trim(),
      slug: slug?.trim() || '',
      description: description?.trim() || '',
      longDescription: longDescription?.trim() || '',
      price: Number(price),
      salePrice: salePrice ? Number(salePrice) : null,
      inStock: Boolean(inStock),
      featured: Boolean(featured),
      isActive: Boolean(isActive),
      categoryId: categoryId || '',
      specs: specs || '',
      metaTitle: metaTitle || '',
      metaDescription: metaDescription || '',
      metaKeywords: metaKeywords || '',
      images: images || [],
      imageUrl: imageUrl || '',
      additionalImages: additionalImages || []
    };

    try {
      const response = await api.put(`/products/${id}`, productDataToSend, {
        withCredentials: true,
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

async function getCategoriesByType(type) {
  try {
    const response = await api.get(`/categories/by-type/${type}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching categories by type ${type}:`, error);
    throw error;
  }
}

productService.getCategoriesByType = getCategoriesByType;

export default productService;