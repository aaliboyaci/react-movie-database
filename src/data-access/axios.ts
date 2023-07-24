import axios from 'axios';

const API_KEY = '6ef10486c5df46ca61884c8b042d53bd';
export const axiosInstance = axios.create({
  baseURL: `https://api.themoviedb.org/3/`,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    console.log("daha request gönderilmedi")
    // Do something before request is sent
    const params = config.params;
    config.params = { ...params, api_key: API_KEY };
    console.log(config.params);
    console.log(config.url);
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);


export const API_PATHS = {
  DISCOVER: 'discover/movie',
  TRENDING: 'trending/movie/week',
};

