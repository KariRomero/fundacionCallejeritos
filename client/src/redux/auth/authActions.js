import axios from 'axios';
import { logInGoogle, getCurrentUser, logOutGoogle } from './authSlice';

// Inicia el proceso de autenticación con Google
export const startGoogleLogin = () => async (dispatch) => {
  // Usa una ruta relativa para la autenticación cuando se utiliza un proxy inverso
  window.location.href = '/auth/google';
};

// Obtiene el usuario actual autenticado
export const fetchCurrentUser = () => async (dispatch) => {
  try {
    const response = await axios.get('/auth/current_user', { withCredentials: true }); // Usa la ruta relativa

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
    const response = await axios.get('/auth/logout', { withCredentials: true });  // Usa la ruta relativa
    console.log('Respuesta de logout:', response);
    dispatch(logOutGoogle());
  } catch (error) {
    console.error("Google logout failed:", error);
  }
};