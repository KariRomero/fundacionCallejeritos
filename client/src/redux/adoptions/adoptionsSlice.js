import { createSlice } from "@reduxjs/toolkit";

export const adoptionsSlice = createSlice({
    name: 'adoptions',
    initialState: {
        adoptions: [],
        detail: {},
        status: 'idle',
        error: 'idle'
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
        // updateImageById: (state, action)=>{
        //     state.detail.image = [...state.detail.image, action.payload]
        // },
        uploadAdoptionImagesSuccess: (state, action) => {
            state.detail.image = action.payload;
            const index = state.adoptions.findIndex(adoption => adoption.id === action.payload.id);
            if (index !== -1) {
                state.adoptions[index] = action.payload;
            }
        },
        uploadAdoptionImagesFailure: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        }
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
    adoptionsDesc,
    uploadAdoptionImagesSuccess,
    uploadAdoptionImagesFailure
} = adoptionsSlice.actions;

export default adoptionsSlice.reducer;
