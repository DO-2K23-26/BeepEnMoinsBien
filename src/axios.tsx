import axios from 'axios';

export const customAxios = axios.create({
  baseURL: "",
});


customAxios.interceptors.request.use(
    
        async (config) => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
);

// Function to refresh the token
const refreshToken = async () => {
    try {
      let url = '';
        if (process.env.NODE_ENV === 'development') {
            url = 'http://localhost:9644';
        } else {
            url = 'https://api.beep.gay';
        }
      const resp = await axios.post(url + "/auth/refresh", { refreshToken: localStorage.getItem('refreshToken') });
      console.log("rep", resp.data.accessToken);
      const token = resp.data;
      console.log("Token refreshed");
      localStorage.setItem('accessToken', token.accessToken);
      localStorage.setItem('refreshToken', token.refreshToken);
      return token;
    } catch (error) {
      console.error("Error refreshing token:", error);
      throw error;
    }
};

// Response interceptor to handle token refresh
customAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const token = await refreshToken();
        axios.defaults.headers.common["Authorization"] = `Bearer ${token.accessToken}`;
        return customAxios(originalRequest);
      }
      return Promise.reject(error);
    }
);
