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
  adoptionsDesc,
  uploadAdoptionImagesSuccess,
  uploadAdoptionImagesFailure
} from './adoptionsSlice';

export const getAdoptions = () => (dispatch) => {
  // axios.get('http://localhost:3000/adoptions')
  axios.get('https://fundacioncallejeritos-production.up.railway.app/api/adopciones')
    .then(res => dispatch(getAllAdoptions(res.data)))
    .catch(e => console.log(e));
};

export const getById = (id) => (dispatch) => {
  // axios.get(`http://localhost:3000/adoptions/${id}`)
  axios.get(`https://fundacioncallejeritos-production.up.railway.app/api/adopciones/${id}`)
    .then(res => dispatch(getAdoptionsById(res.data)))
    .catch(e => console.log(e));
};

export const createAdoptions = (formData) => (dispatch) => {
  axios.post('https://fundacioncallejeritos-production.up.railway.app/api/adopciones', formData)
    .then(res => dispatch(postAdoptionSuccess(res.data)))
    .catch(err => {
      console.error('Error al crear adopción:', err);
      dispatch(postAdoptionFailure(err.message));
      alert('Hubo un error al crear la adopción');
    });
};

export const updateById = (id, formData) => (dispatch) => {
  axios.put(`https://fundacioncallejeritos-production.up.railway.app/api/adopciones/${id}`, formData)
    .then(res => {
      dispatch(updateAdoptionById(res.data));
    })
    .catch(err => {
      console.error('Error al actualizar adopción:', err);
      dispatch(postAdoptionFailure(err.message));
    });
};

export const deleteAdoptionById = (id) => (dispatch) => {
  axios.delete(`https://fundacioncallejeritos-production.up.railway.app/api/adopciones/${id}`)
    .then(res => {
      dispatch(deleteAdoptionSuccess(res.data));
      dispatch(getAdoptions());
    })
    .catch(err => {
      dispatch(deleteAdoptionFailure(err.message));
    })
};

export const filterAdoptions = (filters) => (dispatch) => {
  const cleanedFilters = Object.fromEntries(
    Object.entries(filters).filter(([key, value]) => value !== '')
  );

  axios.get('https://fundacioncallejeritos-production.up.railway.app/api/adopciones', { params: cleanedFilters })
    .then(res => dispatch(getAllAdoptions(res.data)))
    .catch(e => console.log(e));
};

export const orderAdoptionsAsc = () => (dispatch) => {
  axios.get('https://fundacioncallejeritos-production.up.railway.app/api/adopciones?order=asc')
    .then(res => dispatch(adoptionsAsc(res.data)))
    .catch(err => {
      console.error('Error ordenar adopciones asc', err);
    });
};

export const orderAdoptionsDesc = () => (dispatch) => {
  axios.get('https://fundacioncallejeritos-production.up.railway.app/api/adopciones?order=desc')
    .then(res => dispatch(adoptionsDesc(res.data)))
    .catch(err => {
      console.error('Error ordenar adopciones desc', err);
    });
};

export const uploadAdoptionImages = (id, imageFiles) => async dispatch => {
  try {
    const formData = new FormData();
    Array.from(imageFiles).forEach(file => {
      formData.append('imageFiles', file);
    });

    const response = await axios.post(`https://fundacioncallejeritos-production.up.railway.app/api/adopciones/${id}/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    dispatch(uploadAdoptionImagesSuccess(response.data));

  } catch (error) {
    console.error('Error al subir imágenes:', error);
    dispatch(uploadAdoptionImagesFailure(error.message));

  }
};