import axios from 'axios';
import {
  postAdoptionSuccess,
  postAdoptionFailure,
  getAllAdoptions,
  getAdoptionsById,
  updateAdoptionById,
  deleteAdoptionSuccess,
  deleteAdoptionFailure,
  adoptionsAsc,
  adoptionsDesc
} from './adoptionsSlice';

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

export const createAdoptions = (formData) => (dispatch) => {
  axios.post('http://localhost:3001/api/adopciones', formData)
    .then(res => dispatch(postAdoptionSuccess(res.data)))
    .catch(err => {
      console.error('Error al crear adopción:', err);
      dispatch(postAdoptionFailure(err.message));
      alert('Hubo un error al crear la adopción');
    });
};

export const updateById = (id, formData) => (dispatch) => {
  axios.put(`http://localhost:3001/api/adopciones/${id}`, formData)
    .then(res => {
      dispatch(updateAdoptionById(res.data));
    })
    .catch(err => {
      console.error('Error al actualizar adopción:', err);
      dispatch(postAdoptionFailure(err.message));
    });
};

export const deleteAdoptionById = (id) => async dispatch => {
  try {
    const response = await axios.delete(`http://localhost:3001/api/adopciones/${id}`);
    dispatch(deleteAdoptionSuccess(id));
  } catch (error) {
    dispatch(deleteAdoptionFailure(error.message));
  }
};

export const filterAdoptions = (filters) => (dispatch) => {
  const cleanedFilters = Object.fromEntries(
    Object.entries(filters).filter(([key, value]) => value !== '')
  );

  axios.get('http://localhost:3001/api/adopciones', { params: cleanedFilters })
    .then(res => dispatch(getAllAdoptions(res.data)))
    .catch(e => console.log(e));
};

export const orderAdoptionsAsc = () => (dispatch) => {
  axios.get('http://localhost:3001/api/adopciones?order=asc')
    .then(res => dispatch(adoptionsAsc(res.data)))
    .catch(err => {
      console.error('Error ordenar adopciones asc', err);
    });
};

export const orderAdoptionsDesc = () => (dispatch) => {
  axios.get('http://localhost:3001/api/adopciones?order=desc')
    .then(res => dispatch(adoptionsDesc(res.data)))
    .catch(err => {
      console.error('Error ordenar adopciones desc', err);
    });
};
