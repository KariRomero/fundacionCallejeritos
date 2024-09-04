import axios from "axios";
import {
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserByIdSuccess,
    deleteUserByIdFailure
} from './usersSlice';

export const getUsers = () => (dispatch) => {
    axios.get('https://fundacioncallejeritos-production.up.railway.app/api/users')
    .then(res=>dispatch(getAllUsers(res.data)))
    .catch(e => console.log(e));
};

export const getById = (id) => (dispatch) => {
    axios.get(`https://fundacioncallejeritos-production.up.railway.app/api/users/${id}`)
    .then(res => dispatch(getUserById(res.data)))
    .catch(e => console.log(e));
};

export const updateById = (id, formData) => (dispatch) => {
    axios.put(`https://fundacioncallejeritos-production.up.railway.app/api/users/${id}`, formData)
    .then(res => dispatch(updateUserById(res.data)))
    .catch(err=>{
        console.log('Error al actualizar usuario:', err);        
    })
}

export const deleteById = (id) => (dispatch) => {
    axios.delete(`https://fundacioncallejeritos-production.up.railway.app/api/users/${id}`)
    .then(res=>{
        dispatch(deleteUserByIdSuccess(res.data))
        dispatch(getAllUsers())
    })
    .catch(err=>{
        dispatch(deleteUserByIdFailure(err.message))
    })
}

//fundacioncallejeritos-production.up.railway.app/api/users/id