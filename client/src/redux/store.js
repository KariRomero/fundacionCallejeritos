import { configureStore } from '@reduxjs/toolkit';
import adoptions from './adoptions/adoptionsSlice';
import rescues from './rescues/rescuesSlice';

export default configureStore({
    reducer:{
        adoptions: adoptions,
        rescues: rescues
    }
});
