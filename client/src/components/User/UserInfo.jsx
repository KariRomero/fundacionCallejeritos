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
    // const { user } = useSelector((state) => state.auth)
    const { user } = useSelector(state => state.users);
    

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

    // useEffect(() => {
    //     dispatch(fetchCurrentUser());
    // }, [dispatch]);
    

    useEffect(() => {
        if (user) {
            setForm({
                birthDate: user.birthDate || '',
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
        <section className='w-full h-screen mt-12'>
            <form onSubmit={handleSubmit} className='w-1/2 mx-auto '>
                <div className="my-2 flex justify-between items-center">
                    <div className='grid grid-cols-1'>
                        <label className='label'>Nombre:</label>
                        <input
                            type="text"
                            className='rounded-full shadow-md p-2'
                            value={form.firstName}
                            name='firstName'
                            onChange={handleChange}
                        />
                    </div>
                    <div className='grid grid-cols-1'>
                        <label className='label'>Apellido:</label>
                        <input
                            type="text"
                            className='rounded-full shadow-md p-2'
                            value={form.lastName}
                            name='lastName'
                            onChange={handleChange}
                        />
                    </div>
                </div>

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
                        <label className='label'>E-mail:</label>
                        <input
                            placeholder='Su celular sin 0 y sin 15'
                            type="text"
                            className='rounded-full shadow-md p-2'
                            value={form.email}
                            name='email'
                            onChange={handleChange}
                        />
                    </div>                    
                </div>

                <div className='grid grid-cols-1'>
                        <label className='label'>Fecha de nacimiento:</label>
                        <input
                            placeholder='YYYY/MM/DD'
                            type="text"
                            className='rounded-full shadow-md p-2'
                            value={form.birthDate}
                            name='birthDate'
                            onChange={handleChange}
                        />
                    </div>

                <button type="submit" className="menu-btn border border-secondary rounded-full hover:bg-secondary">Guardar</button>
            </form>
        </section>
    )
};

export default UserInfo;