import axios from 'axios';
import { logInGoogle, getCurrentUser, logOutGoogle } from './authSlice';

// Inicia el proceso de autenticación con Google
export const startGoogleLogin = () => async (dispatch) => {
  window.location.href = 'https://fundacioncallejeritos-production.up.railway.app/auth/google';
};

// Obtiene el usuario actual autenticado


export const fetchCurrentUser = () => async (dispatch) => {
  try {
    const response = await axios.get('https://fundacioncallejeritos-production.up.railway.app/current_user', { withCredentials: true });

    if (response.data) {
      dispatch(getCurrentUser(response.data)); // Aquí se despacha la acción para actualizar el estado
    } else {
      dispatch(logOutGoogle()); // Si no hay datos de usuario, se despacha la acción para marcar como no autenticado
    }
  } catch (error) {
    console.error("Fetching current user failed:", error);
    dispatch(logOutGoogle()); // Si ocurre un error, se despacha la acción para marcar como no autenticado
  }
};
// Cierra sesión
export const startGoogleLogout = () => async (dispatch) => {
  try {
    const response = await axios.get('https://fundacioncallejeritos-production.up.railway.app/logout', { withCredentials: true });
    console.log('Respuesta de logout:', response);
    dispatch(logOutGoogle());
  } catch (error) {
    console.error("Google logout failed:", error);
  }
};
