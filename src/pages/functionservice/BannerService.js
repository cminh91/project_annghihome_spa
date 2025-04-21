import axios from 'axios';

const API_URL = 'http://localhost:4000/api/';

const bannerService = {
    async createBanner(bannerData) {
        const {
          title,
          subtitle,
          url,
          link,
          isActive,
          order,
          buttonText,
          mobileUrl,
          description,
        } = bannerData;
    
        const formData = new FormData();
        formData.append('title', title);
        formData.append('subtitle', subtitle || '');
        formData.append('url', url);
        formData.append('link', link || '');
        formData.append('isActive', isActive ? 'true' : 'false');
        formData.append('order', order?.toString() || '0');
        formData.append('buttonText', buttonText || '');
        formData.append('mobileUrl', mobileUrl || '');
        formData.append('description', description || '');
    
        try {
          const response = await axios.post(`${API_URL}sliders`, formData, {
            withCredentials: true,
            headers: {
              'Content-Type': 'multipart/form-data',
              'Accept': 'application/json',
            },
          });
          return response.data;
        } catch (error) {
          console.error("Error creating banner:", error);
          throw error;
        }
      },
    
  async getAllBanners() {
    try {
      const response = await axios.get(`${API_URL}sliders`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching banners:", error);
      throw error;
    }
  },

  async getBannerById(id) {
    try {
      const response = await axios.get(`${API_URL}sliders/${id}`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching banner by ID:", error);
      throw error;
    }
  },

  async editBanner(id, bannerData) {
    const {
      title,
      subtitle,
      url,
      link,
      isActive,
      order,
      buttonText,
      mobileUrl,
      description,
    } = bannerData;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('subtitle', subtitle || '');
    formData.append('url', url);
    formData.append('link', link || '');
    formData.append('isActive', isActive ? 'true' : 'false');
    formData.append('order', order?.toString() || '0');
    formData.append('buttonText', buttonText || '');
    formData.append('mobileUrl', mobileUrl || '');
    formData.append('description', description || '');

    try {
        const response = await axios.put(`${API_URL}sliders/${id}`, formData, {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
          },
        });
        return response.data;
      } catch (error) {
        console.error("Error editing banner:", error.response || error.message);
        throw error;
      }
      
  },

  async deleteBanner(id) {
    try {
      const response = await axios.delete(`${API_URL}sliders/${id}`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting banner:", error);
      throw error;
    }
  },
};

export default bannerService;
