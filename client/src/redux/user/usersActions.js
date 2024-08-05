import axios from "axios";
import {
    getAllUsers,
    getUserById,
    updateUserById
} from './usersSlice';

export const getUsers = () => (dispatch) => {
    axios.get('http://localhost:3001/api/users')
    .then(res=>dispatch(getAllUsers(res.data)))
    .catch(e => console.log(e));
};

export const getById = (id) => (dispatch) => {
    axios.get(`http://localhost:3001/api/users/${id}`)
    .then(res => dispatch(getUserById(res.data)))
    .catch(e => console.log(e));
};

export const updateById = (id, formData) => (dispatch) => {
    axios.put(`http://localhost:3001/api/users/${id}`, formData)
    .then(res => dispatch(updateUserById(res.data)))
    .catch(err=>{
        console.log('Error al actualizar usuario:', err);        
    })
}