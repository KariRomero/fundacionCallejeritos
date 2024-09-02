import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { startGoogleLogout } from '../../redux/auth/authActions';
import { logInGoogle } from '../../redux/auth/authSlice';  // Importa desde authSlice
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const googleClientID = "330217204573-1ohsjkafgv61upbu9tbgd0j269ijul10.apps.googleusercontent.com";

const LogInComponent = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { isLoggedIn } = useSelector((state) => state.auth);

  // Manejar la respuesta de autenticación de Google
  const handleGoogleLogin = async () => {
    try {
      // Llama al backend para autenticar y obtener el token
      const res = await axios.get('https://fundacioncallejeritos-production.up.railway.app/auth/google/callback', { withCredentials: true });
      const { token } = res.data;  // Obtén el token del backend

      if (token) {
        localStorage.setItem('token', token); // Guarda el token en localStorage
        const userRes = await axios.get(
          'https://fundacioncallejeritos-production.up.railway.app/auth/current_user',
          { headers: { Authorization: `Bearer ${token}` } }
        );
  
        const user = userRes.data.user; // Obtén el usuario autenticado del backend
        dispatch(logInGoogle(user)); // Usa la acción logInGoogle para actualizar el estado en Redux
      }
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error?.response?.data || error.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      handleGoogleLogin(); // Intenta iniciar sesión si hay un token
    }
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(startGoogleLogout());
    localStorage.removeItem('token'); // Elimina el token del almacenamiento local
    window.location.reload();
  };

  return (
    <section className="flex flex-col items-center justify-center">
      <GoogleOAuthProvider clientId={googleClientID}>
        {isLoggedIn ? (
          <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-lg">
            <p className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
              <FontAwesomeIcon icon={faPaw} className="mr-2 text-secondary" />
              Welcome, {user?.firstName}
            </p>
            <button
              onClick={handleLogout}
              className="px-4 py-2 menu-btn rounded flex items-center"
            >
              <FontAwesomeIcon icon={faPaw} className="mr-2" />
              Logout
            </button>
          </div>
        ) : (
          <div className="flex justify-center p-8 bg-white rounded-lg shadow-lg">
            <GoogleLogin
              onSuccess={() => {
                window.location.href = 'https://fundacioncallejeritos-production.up.railway.app/auth/google'; // Redirigir a Google OAuth
              }}
              onError={(error) => console.error('Google login error:', error)}
              logoSrc=""
            />
          </div>
        )}
      </GoogleOAuthProvider>
    </section>
  );
};

export default LogInComponent; 