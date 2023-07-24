import axios from 'axios';
import { baseUrl, trendUrl, apiKey } from './apiPaths';
import { MovieDTO } from './movieDTO';

const API_KEY = `${apiKey}`;

//interceptors
const axiosInstance = axios.create({
    baseURL: `${baseUrl}`,
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        console.log("request will be sent");
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
        console.log("request has came");
        console.log('Response Interceptor - Response Data:', response.data);
        return response;
    },
    (error) => {
        console.error('Response Interceptor - Response Error:', error);
        return Promise.reject(error);
    }
);
//interceptors ending


export async function getTrendingMovies(): Promise<MovieDTO[]> {
    try {
        const response = await axiosInstance.get(trendUrl, {
            params: {
                api_key: API_KEY,
            },
        });
        const trendingMovies: MovieDTO[] = response.data.results;

        return trendingMovies;
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        throw error;
    }
}
