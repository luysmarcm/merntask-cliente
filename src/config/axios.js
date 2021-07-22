import axios from 'axios';
import Url from '../url';

const clienteAxios = axios.create({
    baseURL : Url
});

export default clienteAxios;