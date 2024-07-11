import axios from 'axios';
import { getAllAdoptions, getAdoptionsById } from './adoptionsSlice';

export const getAdoptions = () => (dispatch) => {
  // axios.get('http://localhost:3000/adoptions')
  axios.get('http://localhost:3001/api/adopciones')
    .then(res => dispatch(getAllAdoptions(res.data)))
    .catch(e => console.log(e));
};

export const getById = (id) => (dispatch) => {
  // axios.get(`http://localhost:3000/adoptions/${id}`)
  axios.get(`http://localhost:3001/api/adopciones/${id}`)
    .then(res => dispatch(getAdoptionsById(res.data)))
    .catch(e => console.log(e));
};

export const filterAdoptions = (filters) => (dispatch) => {
  const cleanedFilters = Object.fromEntries(
    Object.entries(filters).filter(([key, value]) => value !== '')
  );

  axios.get('http://localhost:3001/api/adopciones', { params: cleanedFilters })
    .then(res => dispatch(getAllAdoptions(res.data)))
    .catch(e => console.log(e));
};
