import axios, { AxiosInstance } from "axios";

 const instance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:4000/',
    withCredentials: true,
});

export default instance