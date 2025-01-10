import {useUserStore} from "./stores/user.js";
import axios from "axios";
import router from "./router.js";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
  withCredentials: true,
  withXSRFToken: true
})

axiosClient.interceptors.request.use((config) => {
  const userStore = useUserStore();
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${userStore.token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response.status === 401) {
    router.push({name: 'Login'})
  }
  throw error;
})

export default axiosClient