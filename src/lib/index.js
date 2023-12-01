import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL
})

axiosInstance.interceptors.request.use(
    (config) => {
      const token = sessionStorage.getItem('token');
      if (token) {
        // console.log('bearer applied')
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );


export default axiosInstance