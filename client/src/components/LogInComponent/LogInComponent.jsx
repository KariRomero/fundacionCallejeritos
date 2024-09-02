import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { fetchCurrentUser, logInGoogle, startGoogleLogout } from '../../redux/auth/authActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const googleClientID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const LogInComponent = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const handleGoogleLogin = async (response) => {
    if (response.credential) {
      const token = response.credential; // Obtén el token de la respuesta
  
      try {
        // Envía el token a tu backend para autenticar al usuario
        const res = await axios.post(
          'https://fundacioncallejeritos-production.up.railway.app/auth/google/callback',
          { token },
          { withCredentials: true }
        );

        const { user } = res.data; // Obtén el usuario autenticado del backend
        localStorage.setItem('token', token); // Guarda el token en localStorage
        dispatch(logInGoogle(user)); // Usa la acción logInGoogle para actualizar el estado en Redux

      } catch (error) {
        console.error('Error al iniciar sesión con Google:', error);
      }
    } else {
      console.error('Google login failed. No credential returned.');
    }
  };

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
              onSuccess={handleGoogleLogin}
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