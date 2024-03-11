import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:1945'
});

axios.interceptors.request.use(request => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  });