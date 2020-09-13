import axios from 'axios';

const http = axios.create({
  baseURL: 'https://frontend-api-test-nultien.azurewebsites.net',

  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
  },
});

export default http;
