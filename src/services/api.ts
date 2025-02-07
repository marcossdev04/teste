import axios, { AxiosError } from 'axios';

// Debug environment variables
console.log('Environment Variables Debug:');
console.log('NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('NEXT_PUBLIC_ENVIRONMENT:', process.env.NEXT_PUBLIC_ENVIRONMENT);

// Ensure we have the proper URL format with protocol
const getBaseUrl = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  console.log('getBaseUrl - Raw API URL:', apiUrl);
  
  if (!apiUrl) {
    console.log('getBaseUrl - No API URL found');
    return '';
  }
  
  // If URL already has a protocol, use it as is
  if (apiUrl.startsWith('http://') || apiUrl.startsWith('https://')) {
    console.log('getBaseUrl - URL with protocol:', apiUrl);
    return apiUrl;
  }
  
  // Add https protocol by default
  const fullUrl = `https://${apiUrl}`;
  console.log('getBaseUrl - Added https protocol:', fullUrl);
  return fullUrl;
};

const api = axios.create({
  baseURL: getBaseUrl(),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Re-check baseURL on each request in case environment changed
    const currentBaseUrl = getBaseUrl();
    console.log('Request Interceptor - Current Base URL:', currentBaseUrl);
    config.baseURL = currentBaseUrl;
    
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Request Interceptor - Auth header set');
    }
    return config;
  },
  (error: AxiosError) => {
    console.error('Request Interceptor - Error:', error.message);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('Response Interceptor - Success:', {
      url: response.config.url,
      status: response.status,
    });
    return response;
  },
  async (error: AxiosError) => {
    console.error('Response Interceptor - Error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message,
    });

    if (error.response?.status === 401) {
      // Handle unauthorized access
      console.log('Response Interceptor - Unauthorized, redirecting to login');
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
