import axios from "axios";
import { postAdoptar, deleteAdoptar } from "./adoptSlice";

export const createAdoptar = (userId, adopcionId) => (dispatch) => {
    axios.post('http://localhost:3001/api/adoptar', { userId, adopcionId })
        .then(res => dispatch(postAdoptar(res.data)))
        .catch(e => console.log(e));
}

export const deleteAdoptarAction = (userId, adopcionId) => (dispatch) => {
    console.log('userId:', userId);
    console.log('adopcionId:', adopcionId);
    return axios.delete('http://localhost:3001/api/adoptar/delete', { 
        data: { userId, adopcionId }  
    })
    .then(res => {
        dispatch(deleteAdoptar({ userId, adopcionId }));
        console.log('Eliminación exitosa');
    })
    .catch(e => console.log('Error en eliminación:', e));
}







