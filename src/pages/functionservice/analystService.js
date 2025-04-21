import axios from 'axios';

const API_URL = 'http://localhost:4000/api/analytics';

const analyticsService = {
  getAnalytics: async (startDate, endDate) => {
    try {
      let url = API_URL;
      const params = [];

      if (startDate) params.push(`startDate=${startDate}`);
      if (endDate) params.push(`endDate=${endDate}`);

      if (params.length > 0) {
        url += '?' + params.join('&');
      }

      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi gọi API Analytics:", error);
      throw error;
    }
  },
};

export default analyticsService;
