import axios from 'axios';
import {
  getAllRescues,
  getRescuesById,
  updateRescueById,
  postRescueSuccess,
  postRescueFaillure,
  deleteRescueSuccess,
  deleteRescueFailure,
  rescuesAsc,
  rescuesDesc,
  uploadRescueImagesFailure,
  uploadRescueImagesSuccess
} from './rescuesSlice';


export const getRescues = () => (dispatch) => {
  // axios.get('http://localhost:3000/rescues')
  axios.get('http://localhost:3001/api/casos')
    .then(res => dispatch(getAllRescues(res.data)))
    .catch(e => console.log(e));
};

export const getById = (id) => (dispatch) => {
  // axios.get(`http://localhost:3000/rescues/${id}`)
  axios.get(`http://localhost:3001/api/casos/${id}`)
    .then(res => dispatch(getRescuesById(res.data)))
    .catch(e => console.log(e));
};

export const createRescues = (formData) => (dispatch) => {
  axios.post('http://localhost:3001/api/casos', formData)
    .then(res => dispatch(postRescueSuccess(res.data)))
    .catch(err => {
      console.error('Error al crear caso:', err);
      dispatch(postRescueFaillure(err.message));
      alert('Hubo un error al crear el caso');
    });
};

export const updateById = (id, formData) => (dispatch) => {
  // axios.get(`http://localhost:3000/adoptions/${id}`)
  axios.put(`http://localhost:3001/api/casos/${id}`, formData)
    .then(res => dispatch(updateRescueById(res.data)))
    .catch(e => console.log(e));
};

export const deleteRescueById = (id) => (dispatch) => {
  axios.delete(`http://localhost:3001/api/casos/${id}`)
  .then(res=>{
    dispatch(deleteRescueSuccess(res.data));
    dispatch(getRescues());
  })
  .catch(err=>{
    dispatch(deleteRescueFailure(err.message));
  })
};

export const orderRescuesAsc = () => (dispatch) => {
  axios.get('http://localhost:3001/api/casos?order=asc')
    .then(res => dispatch(rescuesAsc(res.data)))
    .catch(err => {
      console.error('Error ordenar rescates asc', err)
    })
};

export const orderRescuesDesc = () => (dispatch) => {
  axios.get('http://localhost:3001/api/casos?order=desc')
    .then(res => dispatch(rescuesDesc(res.data)))
    .catch(err => {
      console.error('Error ordenar rescates desc', err)
    })
};

export const uploadRescueImages = (id, imageFiles) => async dispatch => {
  try {
    const formData = new FormData();
    Array.from(imageFiles).forEach(file => {
      formData.append('imageFiles', file);
    });

    const response = await axios.post(`http://localhost:3001/api/casos/${id}/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    dispatch(uploadRescueImagesSuccess(response.data));
    
  } catch (error) {
    console.error('Error al subir imágenes:', error);
    dispatch(uploadRescueImagesFailure(error.message));
    
  }
};
