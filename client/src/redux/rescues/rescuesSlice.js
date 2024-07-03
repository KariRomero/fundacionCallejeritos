import { createSlice } from "@reduxjs/toolkit";

export const rescuesSlice = createSlice({
    name: 'rescues',
    initialState: {
        rescues: [],
        detail: {}
    },
    reducers: {
        getAllRescues: (state, action) => {
            state.rescues = action.payload;
        },
        getRescuesById: (state, action) => {
            state.detail = action.payload;
        }
    }
});

export const { getAllRescues, getRescuesById } = rescuesSlice.actions;

export default rescuesSlice.reducer;
