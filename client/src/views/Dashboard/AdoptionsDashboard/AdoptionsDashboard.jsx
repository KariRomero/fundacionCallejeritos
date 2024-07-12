import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import { faPlus, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAdoptions, deleteAdoptionById, orderAdoptionsAsc, orderAdoptionsDesc } from '../../../redux/adoptions/adoptionsActions';

const AdoptionsDashboard = () => {
    const dispatch = useDispatch();
    const { adoptions } = useSelector(state => state.adoptions);
    const [orderBy, setOrderBy] = useState('');

    useEffect(() => {
        dispatch(getAdoptions());
    }, [dispatch]);

    const handleClick = (id) => {
        Swal.fire({
            title: "Seguro quieres eliminar el Callejerito ?",
            text: "Esta acción no se revertirá",
            icon: "warning",
            // showCancelButton: true,
            confirmButtonColor: "#b91c1c",
            // cancelButtonColor: "#d33",
            confirmButtonText: "Eliminar"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Eliminado!",
                    text: "Callejerito ha sido eliminado",
                    icon: "success",
                    confirmButtonColor: "#f69a0b",
                });
                dispatch(deleteAdoptionById(id));
            }
        });
    };

    const handleOrderChange = (e) => {
        const order = e.target.value;
        setOrderBy(order);
        if (order === 'asc') {
            dispatch(orderAdoptionsAsc());
        } else if (order === 'desc') {
            dispatch(orderAdoptionsDesc());
        }
    };

    return (
        <section className="flex justify-center sm:ml-64">
            <div className="w-full max-w-4xl mt-4">
                <h1 className="title">Callejeritos en adopción</h1>
                <div className='flex justify-between items-center'>
                    <select className='paragraph bg-white' value={orderBy} onChange={handleOrderChange}>
                        <option value="">Ordenar por</option>
                        <option value="asc">A-Z</option>
                        <option value="desc">Z-A</option>
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
