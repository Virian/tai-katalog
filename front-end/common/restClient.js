import axios from 'axios';
import FormData from 'form-data';

import { URLS } from '../config';

const RestClient = (() => {
  const apiPath = 'http://localhost:4000';
  const {
    testPath,
    photos,
    login,
    register,
    uploadPhoto,
    removePhoto,
    photo,
    updatePhoto
  } = URLS;

  const doGet = (url, params) => {
    return axios.get(apiPath + url, {
      params: params
    })
  };

  const doPost = (url, data) => {
    return axios.post(apiPath + url, data);
  };

  const doPostAuth = (url, token) => {
    const authOptions = {
      method: 'post',
      url: apiPath + url,
      headers: {
        'X-Access-Token': token,
      }
    };

    return axios(authOptions);
  }

  const postLogin = (email, password) => {
    return doPost(login, { email, password });
  }

  const postRegister = (email, password, confirmPassword) => {
    return doPost(register, { email, password, confirmPassword });
  }

  return {
    postLogin,
    postRegister,
  };
})();

export default RestClient;
