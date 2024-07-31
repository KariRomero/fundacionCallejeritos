import { configureStore } from '@reduxjs/toolkit';
import adoptions from './adoptions/adoptionsSlice';
import rescues from './rescues/rescuesSlice';
import authReducer from './auth/authSlice'
export default configureStore({
    reducer:{
        adoptions: adoptions,
        rescues: rescues,
        auth:authReducer,
    }
});
