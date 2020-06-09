import Axios from 'axios';
import { AUTH_SUCCESS, AUTH_LOGOUT } from './actionTypes';
export function auth(email, password, isLogin) {
  return async (dispatch) => {
    const database = {
      email,
      password,
      returnSecureToken: true,
    };
    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDZDVTh2Wis8Sg0j8Fs79OzoFnZBkt4-Xg';
    if (isLogin) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDZDVTh2Wis8Sg0j8Fs79OzoFnZBkt4-Xg';
    }
    const responce = await Axios.post(url, database);
    const data = responce.data;
    const expirationDate = new Date(
      new Date().getTime() + data.expiresIn * 1000
    );
    localStorage.setItem('token', data.idToken);
    localStorage.setItem('userId', data.localId);
    localStorage.setItem('expirationDate', expirationDate);
    dispatch(authSuccess(data.idToken));
    dispatch(autoLogout(data.expiresIn));
    console.log('token', data.idToken);
  };
}
export function authSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    token,
  };
}
export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('expirationDate');
  return {
    type: AUTH_LOGOUT,
  };
}
export function autoLogout(time) {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, time * 1000);
  };
}
export function autoLogin() {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token));
        dispatch(
          autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000)
        );
      }
    }
  };
}
