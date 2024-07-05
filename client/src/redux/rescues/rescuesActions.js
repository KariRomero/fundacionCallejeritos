import axios from 'axios';
import { getAllRescues, getRescuesById } from './rescuesSlice';


export const getRescues = () => (dispatch) => {
  axios.get('http://localhost:3000/rescues')
  // axios.get('http://localhost:3001/casos')
    .then(res => dispatch(getAllRescues(res.data)))
    .catch(e => console.log(e));
};

export const getById = (id) => (dispatch) => {
  axios.get(`http://localhost:3000/rescues/${id}`)
  // axios.get(`http://localhost:3001/casos/${id}`)
    .then(res => dispatch(getRescuesById(res.data)))
    .catch(e => console.log(e));
};
