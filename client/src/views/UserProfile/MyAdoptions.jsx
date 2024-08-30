import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getById } from "../../redux/user/usersActions";
import { deleteAdoptarAction } from "../../redux/adopt/adoptActions";
import CardAdoptions from "../../components/Card/CardAdoptions";

const MyAdoptions = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { adopciones } = useSelector(state=>state.users.user);
    const { user } = useSelector(state=>state.users);
    // console.log(adopciones);
    

    useEffect(()=>{
        dispatch(getById(id));
    },[dispatch,id]);


    // const handleClick = (adopcionId) => {
    //     if (user && id) {
    //         dispatch(deleteAdoptarAction(user.id, adopcionId))
    //             .then(() => console.log('Eliminación exitosa'))
    //             .catch(e => console.log('Error en eliminación:', e));
    //     } 
    // };
    
    

    return(
        <section className="flex h-screen justify-center px-4">
            <div className="w-full mt-4">
                {/* <div className='flex justify-between items-center'>
                    <select className='paragraph bg-white' value={orderBy} onChange={handleOrderChange}>
                        <option value="">Ordenar por</option>
                        <option value="asc">A-Z</option>
                        <option value="desc">Z-A</option>
                    </select>
                </div> */}
                <ul className="w-full grid grid-cols-3">
                    {Array.isArray(adopciones) && adopciones.map((adop) => (
                        <CardAdoptions 
                        key={adop.id}
                        id={adop.id} 
                        name={adop.name} 
                        gender={adop.gender} 
                        images={adop.image[0]}
                        userId={user.id}
                        />
                    ))}
                </ul>
            </div>
        </section>
    )
};

export default MyAdoptions;