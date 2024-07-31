import React from 'react';
import { Link } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const GOOGLE_CLIENT_ID = '330217204573-1ohsjkafgv61upbu9tbgd0j269ijul10.apps.googleusercontent.com';

const LogIn = () => {
  const handleGoogleSuccess = async (response) => {
    // No necesitas manejar la autenticación aquí
    // Redirige al usuario a tu ruta de autenticación en el backend
    window.location.href = `http://localhost:3001/auth/google`;
  };

  const handleGoogleFailure = (error) => {
    console.error('Google login failed:', error);
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <section>
        <h1>Log In</h1>
        <div>
          <button onClick={handleGoogleSuccess}>Log in with Google</button>
        </div>
        <div>
          <p>No account? <Link to="/registro">Register here</Link></p>
        </div>
      </section>
    </GoogleOAuthProvider>
  );
};

export default LogIn;