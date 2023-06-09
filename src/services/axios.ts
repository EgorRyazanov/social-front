import axios from "axios";

export const API_URL = "https://stellar.burger.students.nomoredomains.monster";

const $api = axios.create({
    baseURL: API_URL,
    headers: {
        Accept: "application/json",
    },
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = localStorage.getItem("accessToken");
    return config;
});

export default $api;
