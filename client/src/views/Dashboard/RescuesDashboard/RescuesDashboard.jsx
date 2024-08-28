import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import { faPlus, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRescues, deleteRescueById, orderRescuesAsc, orderRescuesDesc } from '../../../redux/rescues/rescuesActions';

const RescuesDashboard = () => {
    const dispatch = useDispatch();
    const { rescues } = useSelector(state => state.rescues);
    const [orderBy, setOrderBy] = useState('');

    useEffect(() => {
        dispatch(getRescues());
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
                dispatch(deleteRescueById(id));
            }
        });        
    };

    const handleOrderChange = (e) => {
        const order = e.target.value;
        setOrderBy(order);
        if (order === 'asc') {
            dispatch(orderRescuesAsc());
        } else if (order === 'desc') {
            dispatch(orderRescuesDesc());
        }
    };

    console.log(rescues);

    return (
        <section className="flex justify-center sm:ml-64">
            <div className="w-full mt-4">
                <h1 className="title">Casos de Callejeritos</h1>
                <div className='flex justify-between items-center'>
                    <select className='paragraph bg-white' value={orderBy} onChange={handleOrderChange}>
                        <option value="">Ordenar por</option>
                        <option value="asc">A-Z</option>
                        <option value="desc">Z-A</option>
                    </select>
                    <Link to='/admin/rescates/create'>
                        <button className="menu-btn flex items-center">
                            <FontAwesomeIcon icon={faPlus} className="mr-2" />
                            Agregar caso
                        </button>
                    </Link>
                </div>
                <ul className="w-full">
                    {Array.isArray(rescues) && rescues.map((resc) => (
                        <li key={resc.id} className="flex justify-between border border-l-0 border-r-0 border-t-secondary border-b-secondary p-4 hover:bg-secondary">
                            <h2 className="paragraph pl-16">{resc.name}</h2>
                            <div className='pr-20'>
                                <Link to={`/admin/rescates/update/${resc.id}`}>
                                    <button>
                                        <FontAwesomeIcon icon={faPenToSquare} className='px-2' />
                                    </button>
                                </Link>
                                <button onClick={() => handleClick(resc.id)}>
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

export default RescuesDashboard;