
import axiosInstance from "./axiosInstance";


const apiService = async (httpMethod, url, reqBody, reqConfig = {}) => {
  try {
    const response = await axiosInstance({
      method: httpMethod,
      url,
      data: reqBody,
      ...reqConfig
    });

    return response;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
};

export default apiService;
