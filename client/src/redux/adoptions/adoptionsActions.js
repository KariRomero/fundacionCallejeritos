import axios from 'axios';
import { getAllAdoptions, getAdoptionsById } from './adoptionsSlice';

export const getAdoptions = () => (dispatch) => {
  axios.get('http://localhost:3000/adoptions')
    .then(res => dispatch(getAllAdoptions(res.data)))
    .catch(e => console.log(e));
};

export const getById = (id) => (dispatch) => {
  axios.get(`http://localhost:3000/adoptions/${id}`)
    .then(res => dispatch(getAdoptionsById(res.data)))
    .catch(e => console.log(e));
};
