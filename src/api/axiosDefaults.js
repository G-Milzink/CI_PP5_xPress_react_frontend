import axios from "axios";

axios.defaults.baseURL = 'https://xpress-api-cc62aa415d83.herokuapp.com/';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();