import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { startGoogleLogin, fetchCurrentUser, startGoogleLogout } from '../../redux/auth/authActions';

const GOOGLE_CLIENT_ID = '330217204573-1ohsjkafgv61upbu9tbgd0j269ijul10.apps.googleusercontent.com';

const LogInComponent = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { isLoggedIn } = useSelector((state) => state.auth);


  const handleGoogleLogin = (response) => {
    if (response.credential) {
      dispatch(startGoogleLogin(response.credential));
    } else {
      console.error('Google login failed. No credential returned.');
    }
  };

  // const handleGoogleLogin = () => {
  //   dispatch(startGoogleLogin());
  // };

  const handleLogout = () => {
    dispatch(startGoogleLogout());
  };

  return (
    <section className='bg-primary'>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        {isLoggedIn ? (
          <div className='flex flex-col'>
            <p className='flex justify-center'>Welcome, {user?.firstName}</p>
            <button onClick={handleLogout} className='menu-btn'>Logout</button>
          </div>
        ) : (
          <div className='flex justify-center'>
            {/* <button onClick={handleGoogleLogin}>Log in with Google</button> */}
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={(error) => console.error('Google login error:', error)}
              logoSrc="" 
            />
          </div>
        )}
        {/* <div className='flex justify-center'>
          <p>No account? <a href="/registro">Register here</a></p>
        </div> */}
      </GoogleOAuthProvider>
    </section>
  );
};

export default LogInComponent;
