import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        user: {},
        error:'idle',
        status:'idle'
    },
    reducers: {
        getAllUsers: (state,action) => {
            state.users = action.payload;
        },
        getUserById: (state,action) => {
            state.user = action.payload;
        },
        updateUserById: (state,action) => {
            state.user = action.payload
        },
        deleteUserByIdSuccess: (state,action) => {
            const deletedId = action.payload;
            state.users = state.users.filter(u => u.id !== deletedId);
            state.status = 'succeeded';
            state.error = null;
        },
        deleteUserByIdFailure(state, action) {
            state.status = 'failed';
            state.error = action.payload;
        }
    }
});

export const {
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserByIdSuccess,
    deleteUserByIdFailure
} = usersSlice.actions

export default usersSlice.reducer;