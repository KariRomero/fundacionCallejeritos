import { createSlice } from "@reduxjs/toolkit";

export const adoptSlice = createSlice({
  name: 'adopt',
  initialState: {
    adoptRelation: []
  },
  reducers: {
    postAdoptar: (state, action) => {
      state.adoptRelation = action.payload;
    },
    deleteAdoptar: (state, action) => {
      if (Array.isArray(state.adoptRelation)) {
          state.adoptRelation = state.adoptRelation.filter(adopt => 
            !(adopt.id === action.payload.adopcionId && adopt.userId === action.payload.userId)
          );
      } else {
          console.error('Error: state.adoptRelation no es un array');
      }
  }
  
  }
});

export const {
  postAdoptar,
  deleteAdoptar
} = adoptSlice.actions;

export default adoptSlice.reducer;
