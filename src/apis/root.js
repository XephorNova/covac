import axios from "axios";

const api = axios.create({
    baseURL: "https://cdn-api.co-vin.in/api"
});

export default api;
