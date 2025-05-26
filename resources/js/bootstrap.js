//import 'bootstrap';
import axios from 'axios';
window.axios = axios;

// Configure default headers
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.baseURL = '/api';

// Add a request interceptor to include the Bearer token
window.axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});
