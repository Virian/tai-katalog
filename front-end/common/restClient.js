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

  const getPhoto = (token, photoId) => {
    const authOptions = {
      method: 'post',
      url: apiPath + photo,
      headers: {
        'X-Access-Token': token,
      },
      data: {
        id: photoId
      }
    };

    return axios(authOptions);
  }

  const updateEditedPhoto = (token, photoId, exifData) => {
    const authOptions = {
      method: 'post',
      url: apiPath + updatePhoto,
      headers: {
        'X-Access-Token': token,
      },
      data: {
        id: photoId,
        data: {
          exif: exifData
        }
      }
    };

    return axios(authOptions);
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
    getPhoto,
    updateEditedPhoto,
  };
})();

export default RestClient;
