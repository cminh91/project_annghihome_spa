import axios from 'axios';

<<<<<<< HEAD
const API_URL = process.env.REACT_APP_API_BASE_URL; // Đọc từ biến môi trường

// Tạo instance axios với baseURL
=======
const API_URL = process.env.REACT_APP_API_BASE_URL;

// Create axios instance with default headers
>>>>>>> 59c4cef98ebb6fc0a6d548ca4f10f9f53900d236
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
<<<<<<< HEAD
    'Accept': 'application/json',
  },
=======
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
>>>>>>> 59c4cef98ebb6fc0a6d548ca4f10f9f53900d236
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

<<<<<<< HEAD
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
=======
    const productDataToSend = {
      name: name.trim(),
      slug: slug.trim(),
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
>>>>>>> 59c4cef98ebb6fc0a6d548ca4f10f9f53900d236
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  },

  async getAllProducts(page = 1, limit = 10, searchTerm = '', sortBy = 'createdAt', sortOrder = 'DESC') {
    console.log('Fetching products with page:', page, 'limit:', limit, 'searchTerm:', searchTerm, 'sortBy:', sortBy, 'sortOrder:', sortOrder);
    try {
<<<<<<< HEAD
      const response = await api.get('/products', {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
=======
      let apiUrl = `/products?sortBy=${sortBy}&sortOrder=${sortOrder}&page=${page}&limit=${limit}`;

      if (searchTerm) { // Only add searchTerm if it's not empty
        apiUrl += `&searchTerm=${searchTerm}`;
      }
      const response = await api.get(apiUrl);
      return response.data; // API is expected to return { products: [...], total: ... }
>>>>>>> 59c4cef98ebb6fc0a6d548ca4f10f9f53900d236
    } catch (error) {
      console.error("Error fetching products:", error);
      if (error.response && error.response.data && error.response.data.message) {
        console.error("Error message from backend:", error.response.data.message);
      } else {
        console.error("Error response data:", error.response.data);
      }
      throw error;
    }
  },

  async getProductById(id) {
    try {
<<<<<<< HEAD
      const response = await api.get(`/products/${id}`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
=======
      const response = await api.get(`/products/${id}`);
>>>>>>> 59c4cef98ebb6fc0a6d548ca4f10f9f53900d236
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

<<<<<<< HEAD
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
=======
    const productDataToSend = {
      name: name.trim(),
      slug: slug.trim(),
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
      images: images || []
    };

    try {
      const response = await api.put(`/products/${id}`, productDataToSend, {
>>>>>>> 59c4cef98ebb6fc0a6d548ca4f10f9f53900d236
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
<<<<<<< HEAD
      const response = await api.delete(`/products/${id}`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
=======
      const response = await api.delete(`/products/${id}`);
>>>>>>> 59c4cef98ebb6fc0a6d548ca4f10f9f53900d236
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
