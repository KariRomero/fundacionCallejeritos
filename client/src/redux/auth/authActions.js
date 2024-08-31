import axios from 'axios';
import { logInGoogle, getCurrentUser, logOutGoogle } from './authSlice';

// Inicia el proceso de autenticación con Google
// En tu archivo authActions.js
export const startGoogleLogin = (token) => async (dispatch) => {
  try {
    const response = await axios.post('https://fundacioncallejeritos-production.up.railway.app/auth/google', {
      token,  // Envía el token en el cuerpo de la solicitud
    }, { withCredentials: true });

    if (response.data) {
      dispatch(logInGoogle(response.data)); // Maneja la respuesta del backend y actualiza el estado
    } else {
      dispatch(logOutGoogle());
    }
  } catch (error) {
    console.error('Error en la autenticación con Google:', error);
    dispatch(logOutGoogle());
  }
};

// Obtiene el usuario actual autenticado


// export const fetchCurrentUser = () => async (dispatch) => {
//   try {
//     const response = await axios.get('https://fundacioncallejeritos-production.up.railway.app/current_user', { withCredentials: true });

//     if (response.data) {
//       dispatch(getCurrentUser(response.data)); // Aquí se despacha la acción para actualizar el estado
//     } else {
//       dispatch(logOutGoogle()); // Si no hay datos de usuario, se despacha la acción para marcar como no autenticado
//     }
//   } catch (error) {
//     console.error("Fetching current user failed:", error);
//     dispatch(logOutGoogle()); // Si ocurre un error, se despacha la acción para marcar como no autenticado
//   }
// };

export const fetchCurrentUser = () => async (dispatch) => {
  try {
    const response = await axios.get('https://fundacioncallejeritos-production.up.railway.app/current_user', { 
      withCredentials: true 
    });

    console.log("Response Headers:", response.headers);
    console.log("Response Data:", response.data);

    // Verifica que los datos del usuario existan y contengan un ID (o alguna otra verificación relevante)
    if (response.data && response.data.id) {
      dispatch(getCurrentUser(response.data));
    } else {
      dispatch(logOutGoogle());
      console.error("No user data returned or user is not authenticated.");
    }
  } catch (error) {
    console.error("Fetching current user failed:", error.message);
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
    const response = await axios.get('https://fundacioncallejeritos-production.up.railway.app/logout', { withCredentials: true });
    console.log('Respuesta de logout:', response);
    dispatch(logOutGoogle());
  } catch (error) {
    console.error("Google logout failed:", error);
  }
};
