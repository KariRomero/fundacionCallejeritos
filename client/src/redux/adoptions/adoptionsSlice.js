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
        postAdoptions:(state,action)=>{
            state.adoptions = action.payload
        },
        updateAdoptionById: (state,action)=>{
            state.detail = action.payload
        },
        // deleteAdoptionById: (state,action)=>{
        //     state.adoptions = action.payload
        // }
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
        adoptionsAsc:(state,action)=>{
            state.adoptions = action.payload
        },
        adoptionsDesc:(state,action)=>{
            state.adoptions = action.payload
        },
    }
});

export const { 
    getAllAdoptions, 
    getAdoptionsById, 
    updateAdoptionById, 
    postAdoptions, 
    deleteAdoptionSuccess, 
    deleteAdoptionFailure,
    adoptionsAsc,
    adoptionsDesc 
} = adoptionsSlice.actions;

export default adoptionsSlice.reducer;
