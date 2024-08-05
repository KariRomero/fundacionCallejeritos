import { configureStore } from '@reduxjs/toolkit';
import adoptions from './adoptions/adoptionsSlice';
import rescues from './rescues/rescuesSlice';
import auth from './auth/authSlice';
import users from './user/usersSlice';


export default configureStore({
    reducer:{
        adoptions: adoptions,
        rescues: rescues,
        auth: auth,
        users: users
    }
});
