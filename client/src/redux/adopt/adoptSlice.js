import { createSlice } from "@reduxjs/toolkit";

export const adoptSlice = createSlice({
  name: 'adopt',
  initialState: {
    adoptRelation: ''
  },
  reducers: {
    postAdoptar: (state, action) => {
      state.adoptRelation = action.payload;
    },
    deleteAdoptar: (state, action) => {
        // Filtra las adopciones para eliminar la que coincide con el ID dado
        state.adoptRelation = state.adoptRelation.filter(adopt => 
          !(adopt.id === action.payload.adopcionId && adopt.userId === action.payload.userId)
        );
      }
  }
});

export const {
  postAdoptar,
  deleteAdoptar
} = adoptSlice.actions;

export default adoptSlice.reducer;
