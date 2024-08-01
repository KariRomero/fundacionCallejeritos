// src/components/UserProfile.js
// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { setUser, clearUser } from '../../redux/auth/authSlice';

const UserProfile = () => {
  // const dispatch = useDispatch();
  // const { user, isAuthenticated } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const res = await fetch('http://localhost:3001/current_user', {
  //         method: 'GET',
  //         credentials: 'include',
  //       });
  //       if (res.ok) {
  //         const userData = await res.json();
  //         dispatch(setUser(userData));
  //       } else {
  //         dispatch(clearUser());
  //       }
  //     } catch (error) {
  //       console.error('Failed to fetch user:', error);
  //       dispatch(clearUser());
  //     }
  //   };

  //   fetchUser();
  // }, [dispatch]);

  // const handleLogout = async () => {
  //   try {
  //     const res = await fetch('http://localhost:3001/logout', {
  //       method: 'GET',
  //       credentials: 'include',
  //     });
  //     if (res.ok) {
  //       dispatch(clearUser());
  //       window.location.href = '/';
  //     }
  //   } catch (error) {
  //     console.error('Logout failed:', error);
  //   }
  // };

  return (
    <header>
      {/* {isAuthenticated ? (
        <div>
          <img src={user.image[0]} alt="User profile" />
          <p>{user.firstName} {user.lastName}</p>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      ) : (
        <a href="/login">Log in with Google</a>
      )} */}
    </header>
  );
};

export default UserProfile;