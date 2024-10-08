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
            <div className="w-full mt-4">
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
                            <h2 className="paragraph">{user.firstName} {user.lastName}</h2>
                            <Link to={`/admin/usuarios/user/${user.id}`}>
                                <button className='menu-btn border border-secondary rounded-full hover:bg-secondary'>
                                    <FontAwesomeIcon icon={faEye} className='mr-2' />
                                    Ver info
                                </button>
                            </Link>
                            <Link to={`/admin/usuarios/user/adoptions/${user.id}`}>
                                <button className='menu-btn border border-secondary rounded-full hover:bg-secondary'>
                                    <FontAwesomeIcon icon={faPaw} className='mr-2' />
                                    Solicitudes de adopcion
                                </button>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

export default UsersDashboard
