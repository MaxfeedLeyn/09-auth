import axios from 'axios';

const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";

export const nextServer = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});