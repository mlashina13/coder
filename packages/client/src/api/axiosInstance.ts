import axios from 'axios';

const { SERVER_HOST } = process.env;

const serverUrl = SERVER_HOST ?? 'localhost';

export const axiosInstance = axios.create({
  baseURL: `http://${serverUrl}:3001/api`,
  withCredentials: true,
});
