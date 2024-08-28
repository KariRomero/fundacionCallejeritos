import { createSlice } from "@reduxjs/toolkit";

export const adoptSlice = createSlice({
    name:'adopt',
    initialState:{
        adoptRelation:''
    },
    reducers:{
        postAdoptar:(state, action) => {
            state.adoptRelation = action.payload
        }
    }
});

export const {
    postAdoptar
} = adoptSlice.actions;

export default adoptSlice.reducer;