import axios from 'axios';

// const { SERVER_HOST } = process.env;

// const serverUrl = SERVER_HOST ?? 'localhost';

const baseURL = 'https://coder-32.ya-praktikum.tech/api';

export const axiosInstance = axios.create({
  // baseURL: `http://${serverUrl}:3001/api`,
  baseURL,
  withCredentials: true,
});
