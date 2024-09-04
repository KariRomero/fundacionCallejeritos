import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCurrentUser } from '../../redux/auth/authActions';
import { getById, updateById } from '../../redux/user/usersActions';
import Swal from 'sweetalert2';

const UserInfo = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getById(id))
    }, [dispatch, id])

    const { user } = useSelector(state => state.users);

    const birthDate = user.birthDate === 'Invalid date' ? '' : user.birthDate;


    const [form, setForm] = useState({
        birthDate: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        postalCode: '',
        phone: '',
        mobile: '',
        dni: '',
        email: '',
        image: ''
    })


    useEffect(() => {
        if (user) {
            setForm({
                birthDate,
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                address: user.address || '',
                city: user.city || '',
                state: user.state || '',
                postalCode: user.postalCode || '',
                phone: user.phone || '',
                mobile: user.mobile || '',
                dni: user.dni || '',
                email: user.email || '',
                image: user.image || ''
            })
        }
    }, [user])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateById(id, form));
        Swal.fire({
            title: "Has actualizado la información",
            icon: "success",
            confirmButtonColor: "#f69a0b",
        });
        navigate(`/usuario/${id}/informacionpersonal`)
    };

    return (
        <section className='w-full h-screen mt-12 grid grid-cols-1'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 mx-auto gap-2 justify-center'>
                <img src={user.image} alt='Foto de perfil' className="w-40 object-cover rounded-t-lg transition-transform transform hover:scale-110" />
                <div>
                    <h1 className='title'> {user.firstName} {user.lastName}</h1>
                    <span className='paragraph'>{user.email}</span>
                </div>
            </div>
            <div>
                <form onSubmit={handleSubmit} className='w-full sm:w-1/2 md:w-1/2 mx-auto '>
                    <div className="my-2 flex justify-between items-center">
                        <div className='grid grid-cols-1'>
                            <label className='label'>Teléfono:</label>
                            <input
                                placeholder='Escriba su teléfono'
                                type="text"
                                className='rounded-full shadow-md p-2'
                                value={form.phone}
                                name='phone'
                                onChange={handleChange}
                            />
                        </div>
                        <div className='grid grid-cols-1'>
                            <label className='label'>Celular:</label>
                            <input
                                placeholder='Su celular sin 0 y sin 15'
                                type="text"
                                className='rounded-full shadow-md p-2'
                                value={form.mobile}
                                name='mobile'
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="my-2 flex justify-between items-center">
                        <div className='grid grid-cols-1'>
                            <label className='label'>Provincia:</label>
                            <input
                                placeholder='Escriba su provincia'
                                type="text"
                                className='rounded-full shadow-md p-2'
                                value={form.state}
                                name='state'
                                onChange={handleChange}
                            />
                        </div>
                        <div className='grid grid-cols-1'>
                            <label className='label'>Ciudad:</label>
                            <input
                                placeholder='Escriba su ciudad'
                                type="text"
                                className='rounded-full shadow-md p-2'
                                value={form.city}
                                name='city'
                                onChange={handleChange}
                            />
                        </div>

                    </div>

                    <div className="my-2 flex justify-between items-center">
                        <div className='grid grid-cols-1'>
                            <label className='label'>Direccion:</label>
                            <input
                                placeholder='Avenida Ramirez 1234'
                                type="text"
                                className='rounded-full shadow-md p-2'
                                value={form.address}
                                name='address'
                                onChange={handleChange}
                            />
                        </div>
                        <div className='grid grid-cols-1'>
                            <label className='label'>C.P:</label>
                            <input
                                placeholder='3100'
                                type="text"
                                className='rounded-full shadow-md p-2'
                                value={form.postalCode}
                                name='postalCode'
                                onChange={handleChange}
                            />
                        </div>
                    </div>


                    <div className="my-2 flex justify-between items-center">
                        <div className='grid grid-cols-1'>
                            <label className='label'>DNI:</label>
                            <input
                                placeholder='Escriba su dni'
                                type="text"
                                className='rounded-full shadow-md p-2'
                                value={form.dni}
                                name='dni'
                                onChange={handleChange}
                            />
                        </div>
                        <div className='grid grid-cols-1'>
                            <label className='label'>Fecha de nacimiento:</label>
                            <input
                                placeholder='DD/MM/YYYY'
                                type="text"
                                className='rounded-full shadow-md p-2'
                                value={form.birthDate}
                                name='birthDate'
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <button type="submit" className="menu-btn border border-secondary rounded-full hover:bg-secondary">Guardar</button>
                </form>
            </div>
        </section>
    )
};

export default UserInfo;