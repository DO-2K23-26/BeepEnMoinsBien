import axios from 'axios';
import { useContext } from 'react';
import { useUserContext } from './context/authcontext'; 
import { api_url } from './context/envar';


const url = useContext(api_url);

export const customAxios = axios.create({
  baseURL: url,
});

const { accessToken } = useUserContext();
const { setToken } = useUserContext();


customAxios.interceptors.request.use(
    
        async (config) => {
            const token = accessToken;
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
      const resp = await customAxios.get("auth/refresh");
      const { token } = resp.data;
      setToken(token.accessToken, token.refreshToken);
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
