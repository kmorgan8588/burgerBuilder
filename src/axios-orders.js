import axios from 'axios';

const instance = axios.create({
    baseURL: "https://burgerbuilder-dddaa.firebaseio.com/"
});

export default instance;
