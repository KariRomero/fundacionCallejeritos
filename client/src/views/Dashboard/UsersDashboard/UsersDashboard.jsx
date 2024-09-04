import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw, faEye } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { faPlus, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUsers } from '../../../redux/user/usersActions';

const UsersDashboard = () => {
    const dispatch = useDispatch();
    const { users } = useSelector(state => state.users);
    // const [orderBy, setOrderBy] = useState('');

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);


    return (
        <section className="flex justify-center sm:ml-64 ">
            <div className="w-full mt-10">
                <h1 className="title">Usuarios</h1>
                <div className='flex justify-between items-center'>
                    {/* <select className='paragraph bg-white' value={orderBy} onChange={handleOrderChange}>
                        <option value="">Ordenar por</option>
                        <option value="asc">A-Z</option>
                        <option value="desc">Z-A</option>
                    </select> */}
                </div>
                <ul className="w-full">
                    {Array.isArray(users) && users.map((user) => (
                        <li key={user.id} className="flex justify-between items-center border border-l-0 border-r-0 border-t-0 border-b-secondary p-4">
                            <div className='flex items-center'>
                                <img src={user.image} alt='foto perfil' className='w-16 h-1w-16 rounded-full mx-4' />
                                <h2 className="font-normal tracking-wide text-sm">{user.firstName} {user.lastName}</h2>
                            </div>
                            <div>
                                <Link to={`/admin/usuarios/user/${user.id}`}>
                                    <button className='font-medium text-base tracking-wider p-2 mx-2'>
                                        <FontAwesomeIcon icon={faEye}/>                                        
                                    </button>
                                </Link>
                                <Link to={`/admin/usuarios/user/adoptions/${user.id}`}>
                                    <button className='font-medium text-base tracking-wider p-2 border border-secondary rounded-full hover:bg-secondary'>
                                        <FontAwesomeIcon icon={faPaw} className='mr-2'/>
                                        Solicitudes
                                    </button>
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

export default UsersDashboard
