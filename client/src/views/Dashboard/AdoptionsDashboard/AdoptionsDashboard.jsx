import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAdoptions, deleteAdoptionById } from '../../../redux/adoptions/adoptionsActions';

const AdoptionsDashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { adoptions } = useSelector(state => state.adoptions);

    useEffect(() => {
        dispatch(getAdoptions());
    }, [dispatch]);

    const handleClick = (id) => {
        dispatch(deleteAdoptionById(id))
    }

    return (
        <section className="flex justify-center sm:ml-64">
            <div className="w-full max-w-4xl">
                <h1 className="title">Callejeritos en adopción</h1>
                <div className='flex justify-between items-center'>
                    <select className='paragraph bg-white'>
                        <option value="">Ordenar por</option>
                        <option value="">A-Z</option>
                        <option value="">Z-A</option>
                    </select>
                    <Link to='/admin/adopciones/create'>
                        <button className="menu-btn flex items-center">
                            <FontAwesomeIcon icon={faPlus} className="mr-2" />
                            Agregar Callejerito
                        </button>
                    </Link>
                </div>
                <ul className="w-full">
                    {Array.isArray(adoptions) && adoptions.map((adop) => (
                        <li key={adop.id} className="flex justify-between border border-l-0 border-r-0 border-t-secondary border-b-secondary p-4 hover:bg-secondary">
                            <h2 className="paragraph">{adop.name}</h2>
                            <div>
                                <Link to={`/admin/adopciones/update/${adop.id}`}>
                                    <button>
                                        <FontAwesomeIcon icon={faPenToSquare} className='px-2' />
                                    </button>
                                </Link>
                                <button onClick={() => handleClick(adop.id)}>
                                    <FontAwesomeIcon icon={faTrash} className='px-2' />
                                </button>
                            </div>
                        </li>
                    ))}

                </ul>
            </div>
        </section>
    );
};

export default AdoptionsDashboard;