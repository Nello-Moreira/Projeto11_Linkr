import axios from "axios";

const axiosBase = axios.create({
    baseURL: 'https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr',
});

export default axiosBase;