import axios from 'axios';
import FormData from 'form-data';

import { URLS } from '../config';

const RestClient = (() => {
  const apiPath = 'http://localhost:4000';
  const {
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

  const getPhotos = (token) => {
    return doPostAuth(photos, token)
  }

  const postUploadPhoto = (token, file) => {
    let formData = new FormData();
    formData.append('file', file);

    const authOptions = {
      method: 'post',
      url: apiPath + uploadPhoto,
      headers: {
        'X-Access-Token': token,
      },
      data: formData
    };

    return axios(authOptions);
  }

  const postGetSpecificPhotos = (token, filterOptions, sortingOptions) => {
    const authOptions = {
      method: 'post',
      url: apiPath + photos,
      headers: {
        'X-Access-Token': token,
      },
      data: {
        options: {
          where: filterOptions,
          sort: sortingOptions
        }
      }
    };
    return axios(authOptions);
  }

  return {
    postLogin,
    postRegister,
    getPhotos,
    postUploadPhoto,
    postGetSpecificPhotos,
  };
})();

export default RestClient;
