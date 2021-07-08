import Axios from 'axios';

const axios = Axios.create({
    baseURL: "http://localhost:9000"
});

export default axios;