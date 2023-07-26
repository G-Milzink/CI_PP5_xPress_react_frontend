import axios from "axios";

axios.defaults.baseURL = 'https://xpress-drf-api-96b1c58706ca.herokuapp.com/';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();