import axios from 'axios';
import { logInGoogle, getCurrentUser, logOutGoogle } from './authSlice';

// Inicia el proceso de autenticación con Google
export const startGoogleLogin = () => async (dispatch) => {
  window.location.href = 'http://localhost:3001/auth/google';
};

// Obtiene el usuario actual autenticado
export const fetchCurrentUser = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:3001/current_user', { withCredentials: true });
    dispatch(getCurrentUser(response.data));
  } catch (error) {
    console.error("Fetching current user failed:", error);
  }
};

// Cierra sesión
export const startGoogleLogout = () => async (dispatch) => {
  try {
    await axios.get('http://localhost:3001/logout');
    dispatch(logOutGoogle());
  } catch (error) {
    console.error("Google logout failed:", error);
  }
};
