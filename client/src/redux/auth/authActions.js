import axios from 'axios';
import { logInGoogle, getCurrentUser, logOutGoogle } from './authSlice';

// Inicia el proceso de autenticación con Google (redirecciona al backend)
export const startGoogleLogin = () => {
  window.location.href = 'https://fundacioncallejeritos-production.up.railway.app/auth/google';
};

// Obtiene el usuario actual autenticado
export const fetchCurrentUser = () => async (dispatch) => {
  try {
    const response = await axios.get('https://fundacioncallejeritos-production.up.railway.app/auth/current_user', { withCredentials: true });

    if (response.data) {
      dispatch(getCurrentUser(response.data));
    } else {
      dispatch(logOutGoogle());
    }
  } catch (error) {
    console.error("Fetching current user failed:", error);
    dispatch(logOutGoogle());
  }
};

// Cierra sesión
export const startGoogleLogout = () => async (dispatch) => {
  try {
    await axios.get('https://fundacioncallejeritos-production.up.railway.app/auth/logout', { withCredentials: true });
    dispatch(logOutGoogle());
  } catch (error) {
    console.error("Google logout failed:", error);
  }
};