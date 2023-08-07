import axios from 'axios';
import { baseUrl} from './apiPaths';

//interceptors
const axiosInstance = axios.create({
    baseURL: `${baseUrl}`,
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        console.log("// Request will be sent");
        console.log('Request Interceptor - Request Config:', config);
        return config;
    },
    (error) => {
        console.error('Request Interceptor - Request Error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        console.log("// Request has came");
        console.log('Response Interceptor - Response Data:', response.data);
        return response;
    },
    (error) => {
        console.error('Response Interceptor - Response Error:', error);
        return Promise.reject(error);
    }
);
//interceptors ending

export default axiosInstance;