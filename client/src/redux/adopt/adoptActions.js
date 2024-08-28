import axios from "axios";
import { postAdoptar } from "./adoptSlice";

export const createAdoptar = (userId, adopcionId) => (dispatch) => {
    axios.post('http://localhost:3001/api/adoptar', { userId, adopcionId })
        .then(res => dispatch(postAdoptar(res.data)))
        .catch(e => console.log(e));
}
