import axios, { AxiosInstance } from "axios";

 const instance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:4000/',
    // baseURL: 'https://ur-academy-api.onrender.com/',
    withCredentials: true,
});

export default instance