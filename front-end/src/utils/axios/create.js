import axios from "axios";
const baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000/api/v1";

const createClient = axios.create({
    baseURL,
    withCredentials:true
});

export default createClient;