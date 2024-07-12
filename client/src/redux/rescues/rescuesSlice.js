import { createSlice } from "@reduxjs/toolkit";

export const rescuesSlice = createSlice({
    name: 'rescues',
    initialState: {
        rescues: [],
        detail: {},
        status: 'idle',
    },
    reducers: {
        getAllRescues: (state, action) => {
            state.rescues = action.payload;
        },
        getRescuesById: (state, action) => {
            state.detail = action.payload;
        },
        postRescues:(state,action)=>{
            state.rescues = action.payload
        },
        updateRescueById: (state,action)=>{
            state.detail = action.payload
        },
        // deleteRescueById: (state,action)=>{
        //     state.rescues = action.payload
        // }
        deleteRescueSuccess(state, action) {
            const deletedId = action.payload;
            state.rescues = state.rescues.filter(resc => resc.id !== deletedId);
            state.status = 'succeeded';
            state.error = null;
        },
        deleteRescueFailure(state, action) {
            state.status = 'failed';
            state.error = action.payload;
        },
        rescuesAsc:(state,action)=>{
            state.rescues = action.payload
        },
        rescuesDesc:(state,action)=>{
            state.rescues = action.payload
        }
    }
});

export const { 
    getAllRescues, 
    getRescuesById, 
    updateRescueById, 
    postRescues, 
    deleteRescueSuccess, 
    deleteRescueFailure,
    rescuesAsc,
    rescuesDesc  
} = rescuesSlice.actions;

export default rescuesSlice.reducer;
