import { createSlice } from "@reduxjs/toolkit";

export const adoptionsSlice = createSlice({
    name: 'adoptions',
    initialState: {
        adoptions: [],
        detail: {},
        status: 'idle',
    },
    reducers: {
        getAllAdoptions: (state, action) => {
            state.adoptions = action.payload;
        },
        getAdoptionsById: (state, action) => {
            state.detail = action.payload;
        },
        postAdoptionSuccess: (state, action) => {
            state.adoptions = [...state.adoptions, action.payload];
            state.status = 'succeeded';
            state.error = null;
        },
        postAdoptionFailure: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },
        updateAdoptionById: (state, action) => {
            state.detail = action.payload
        },
        deleteAdoptionSuccess(state, action) {
            const deletedId = action.payload;
            state.adoptions = state.adoptions.filter(adop => adop.id !== deletedId);
            state.status = 'succeeded';
            state.error = null;
        },
        deleteAdoptionFailure(state, action) {
            state.status = 'failed';
            state.error = action.payload;
        },
        adoptionsAsc: (state, action) => {
            state.adoptions = action.payload
        },
        adoptionsDesc: (state, action) => {
            state.adoptions = action.payload
        },
    }
});

export const {
    getAllAdoptions,
    getAdoptionsById,
    updateAdoptionById,
    postAdoptionSuccess,
    postAdoptionFailure,
    deleteAdoptionSuccess,
    deleteAdoptionFailure,
    adoptionsAsc,
    adoptionsDesc
} = adoptionsSlice.actions;

export default adoptionsSlice.reducer;
