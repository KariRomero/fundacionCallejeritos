import axios from 'axios';
import { logInGoogle, getCurrentUser, logOutGoogle } from './authSlice';

// Inicia el proceso de autenticación con Google (redirecciona al backend)
export const startGoogleLogin = () => {
  window.location.href = 'https://fundacioncallejeritos-production.up.railway.app/auth/google';
};

// Obtiene el usuario actual autenticado
export const fetchCurrentUser = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token'); // Obtener el token de localStorage
    if (!token) {
      dispatch(logOutGoogle());
      return;
    }

    const response = await axios.get('https://fundacioncallejeritos-production.up.railway.app/auth/current_user', {
      headers: { Authorization: `Bearer ${token}` }, // Incluye el token JWT en el encabezado
    });

    if (response.data) {
      dispatch(getCurrentUser(response.data)); // Despacha la acción para obtener el usuario
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