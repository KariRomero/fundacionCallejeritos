import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getById } from '../../../redux/user/usersActions';
import CardAdoptions from "../../../components/Card/CardAdoptions";

const UsersAdoptions = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { adopciones } = useSelector(state => state.users.user);
    const { user } = useSelector(state => state.users);
    const [adopcionesList, setAdopcionesList] = useState(adopciones);

    useEffect(() => {
        dispatch(getById(id));
    }, [dispatch, id]);

    useEffect(() => {
        setAdopcionesList(adopciones);
    }, [adopciones]);

    const handleDeleteSuccess = () => {
        dispatch(getById(id)); 
    };
    
  return (
    <section className="flex justify-center sm:ml-64 px-4">
            <div className="w-full mt-4">
                <h1 className="title">Solicitudes de adopcion</h1>
                <div className='flex justify-between items-center'>
                    {/* <select className='paragraph bg-white' value={orderBy} onChange={handleOrderChange}>
                        <option value="">Ordenar por</option>
                        <option value="asc">A-Z</option>
                        <option value="desc">Z-A</option>
                    </select> */}
                </div>
                <ul className="w-full grid grid-cols-3">
                    {Array.isArray(adopcionesList) && adopcionesList.map((adop) => (
                        <CardAdoptions 
                        id={adop.id} 
                        name={adop.name} 
                        gender={adop.gender} 
                        images={adop.image[0]}
                        userId={user.id}
                            onDeleteSuccess={handleDeleteSuccess}
                        />
                    ))}
                </ul>
            </div>
        </section>
  )
}

export default UsersAdoptions
