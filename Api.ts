import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.jussimarleal.com.br/apievento/public',
});

export default api;

