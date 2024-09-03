import axios from 'axios';
import { logInGoogle, getCurrentUser, logOutGoogle } from './authSlice';

// Obtiene el usuario actual autenticado
const fetchCurrentUser = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local
    if (!token) {
      dispatch(logOutGoogle());
      return;
    }

    const response = await axios.get('https://fundacioncallejeritos-production.up.railway.app/autorizar/current-user', {
      headers: { Authorization: `Bearer ${token}` }, // Incluye el token JWT en los encabezados
    });

    if (response.data.user) {
      dispatch(getCurrentUser(response.data.user)); // Despacha la acción para obtener el usuario
    } else {
      dispatch(logOutGoogle());
    }
  } catch (error) {
    console.error("Fetching current user failed:", error?.response?.data || error.message);
    dispatch(logOutGoogle());
  }
};

// Cierra sesión
const startGoogleLogout = () => async (dispatch) => {
  try {
    await axios.post('https://fundacioncallejeritos-production.up.railway.app/autorizar/logout', { withCredentials: true });
    dispatch(logOutGoogle());
  } catch (error) {
    console.error("Google logout failed:", error?.response?.data || error.message);
  }
};

// Asegúrate de exportar todas las acciones necesarias
export { fetchCurrentUser, startGoogleLogout };