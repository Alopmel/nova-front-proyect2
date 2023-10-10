import axios from "axios";

const API = 'http://localhost:4000/api'
// Le mando el usuario a la petición post
export const registerRequest = user => axios.post(`${API}/registro`, user);

export const loginRequest = user => axios.post(`${API}/login`, user);

export const verifyTokenRequest = () => axios.get(`${API}/verify`)
