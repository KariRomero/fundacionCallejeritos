import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { startGoogleLogin, fetchCurrentUser, startGoogleLogout } from '../../redux/auth/authActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';

// const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_ID = '330217204573-1ohsjkafgv61upbu9tbgd0j269ijul10.apps.googleusercontent.com';

const LogInComponent = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { isLoggedIn } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   if(user)dispatch(fetchCurrentUser());
  // }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  // const handleGoogleLogin = (response) => {
  //   if (response.credential) {
  //     dispatch(startGoogleLogin(response.credential));
  //   } else {
  //     console.error('Google login failed. No credential returned.');
  //   }
  // };
  const handleGoogleLogin = (response) => {
    if (response.credential) {
      const token = response.credential; // Obtén el token de la respuesta
      dispatch(startGoogleLogin(token)); // Envía el token a tu acción de login
    } else {
      console.error('Google login failed. No credential returned.');
    }
  };
  

  const handleLogout = () => {
    dispatch(startGoogleLogout());
    window.location.reload();
  };

  return (
    <section className="flex flex-col items-center justify-center">
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
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
