import axios from 'axios';
import { logInGoogle, getCurrentUser, logOutGoogle } from './authSlice';

// Inicia el proceso de autenticación con Google
export const startGoogleLogin = () => async (dispatch) => {
  window.location.href = 'https://fundacioncallejeritos-production.up.railway.app/auth/google';  // Usa la ruta completa
};

// Obtiene el usuario actual autenticado
export const fetchCurrentUser = () => async (dispatch) => {
  try {
    const response = await axios.get('https://fundacioncallejeritos-production.up.railway.app/auth/current_user', { withCredentials: true }); // Usa la ruta completa

    console.log("Response Headers:", response.headers);
    console.log("Response Data:", response.data);

    if (response.data) {
      dispatch(getCurrentUser(response.data));
    } else {
      dispatch(logOutGoogle());
    }
  } catch (error) {
    console.error("Fetching current user failed:", error);
    if (error.response) {
      console.error("Error Response Data:", error.response.data);
      console.error("Error Status:", error.response.status);
      console.error("Error Headers:", error.response.headers);
    }
    dispatch(logOutGoogle());
  }
};

// Cierra sesión
export const startGoogleLogout = () => async (dispatch) => {
  try {
    const response = await axios.get('https://fundacioncallejeritos-production.up.railway.app/auth/logout', { withCredentials: true });  // Usa la ruta completa
    console.log('Respuesta de logout:', response);
    dispatch(logOutGoogle());
  } catch (error) {
    console.error("Google logout failed:", error);
  }
};