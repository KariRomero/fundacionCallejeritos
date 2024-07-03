import { createSlice } from "@reduxjs/toolkit";

export const adoptionsSlice = createSlice({
    name: 'adoptions',
    initialState: {
        adoptions: [],
        detail: {}
    },
    reducers: {
        getAllAdoptions: (state, action) => {
            state.adoptions = action.payload;
        },
        getAdoptionsById: (state, action) => {
            state.detail = action.payload;
        }
    }
});

export const { getAllAdoptions, getAdoptionsById } = adoptionsSlice.actions;

export default adoptionsSlice.reducer;
