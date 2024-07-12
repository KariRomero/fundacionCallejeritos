import axios from 'axios';
import { getAllRescues, getRescuesById, updateRescueById, postRescues, deleteRescueSuccess, deleteRescueFailure } from './rescuesSlice';


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
      .then(res => dispatch(postRescues(res.data)))
      .catch(err => {
          console.error('Error al crear caso:', err);
          alert('Hubo un error al crear el caso');
      });
};

export const updateById = (id) => (dispatch) => {
  // axios.get(`http://localhost:3000/adoptions/${id}`)
  axios.put(`http://localhost:3001/api/casos/${id}`)
    .then(res => dispatch(updateRescueById(res.data)))
    .catch(e => console.log(e));
};

// export const deleteById = (id) => (dispatch) => {
//   // axios.get(`http://localhost:3000/adoptions/${id}`)
//   axios.delete(`http://localhost:3001/api/casos/${id}`)
//     .then(res => dispatch(deleteRescueById(res.data)))
//     .catch(e => console.log(e));
// };

export const deleteRescueById = (id) => async dispatch => {
  try {
      const response = await axios.delete(`http://localhost:3001/api/casos/${id}`);
      dispatch(deleteRescueSuccess(id));
  } catch (error) {
      dispatch(deleteRescueFailure(error.message));
  }
};
