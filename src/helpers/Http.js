import axios from 'axios';
import { getToken, logout } from './Auth';
import { baseApi, LOGIN_ROUTE } from '../utils/routeNames';
// import { authLogout } from '../modules/auth/store/actions';
import { toast } from 'react-toastify';

const Http = axios.create({});
Http.defaults.baseURL = baseApi;
Http.defaults.headers.common.Accept = 'application/json';
Http.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`;

Http.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response.status === 401) {
      logout();
      window.location.replace(LOGIN_ROUTE);
    }

    if (error.response.status === 422) {
      let { errors } = error.response.data;
      let errorKeys = Object.keys(errors);
      errorKeys.forEach(item => {
        errors[item] = errors[item][0];
      });
    } else if (error.response.status === 500) {
      toast.error('Internal Server Error occured');
    }

    return Promise.reject({
      ...error.response.data,
      status: error.response.status
    });
  }
);

export default Http;
