// Con esta clase lo que hago es enviar a toda petición al backend el token del usuario

import axios from 'axios';

const setAuthToken = token => {
    if (token) {
        //Apply to every request
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        //Delete auth header
        delete axios.defaults.headers.common['Authorization'];
    }
}

export default setAuthToken;