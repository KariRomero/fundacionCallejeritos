// src/components/LogIn.js
import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

const GOOGLE_CLIENT_ID = '330217204573-1ohsjkafgv61upbu9tbgd0j269ijul10.apps.googleusercontent.com';

const LogIn = () => {
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3001/auth/google';
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <section>
        <h1>Log In</h1>
        <div>
          <button onClick={handleGoogleLogin}>Log in with Google</button>
        </div>
        <div>
          <p>No account? <a href="/registro">Register here</a></p>
        </div>
      </section>
    </GoogleOAuthProvider>
  );
};

export default LogIn;