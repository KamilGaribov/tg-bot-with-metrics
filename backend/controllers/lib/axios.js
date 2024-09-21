import axios from "axios";
import dotenv from 'dotenv'
dotenv.config()

const TOKEN = process.env.TOKEN
const BASE_URL = `https://api.telegram.org/bot${TOKEN}`

const axiosInstance = () => {
    const instance = axios.create({
        baseURL: BASE_URL
    });

    return {
        get(endpoint, params) {
            return instance.get(`/${endpoint}`, { params });
        },
        post(endpoint, data) {
            return instance.post(`/${endpoint}`, data);
        }
    };
}


export default axiosInstance