import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import Swal from 'sweetalert2';
import { getById, updateById } from '../../../redux/user/usersActions';

const UsersInfo = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useSelector(state => state.users);

    // Maneja la fecha de nacimiento para evitar "Invalid date"
    const birthDate = user.birthDate === 'Invalid date' ? '' : user.birthDate;

    const [form, setForm] = useState({
        role: false,
    });

    useEffect(() => {
        dispatch(getById(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (user) {
            setForm({
                role: user.role || false
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { checked } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            role: checked,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateById(id, form));
        Swal.fire({
            title: "Cambios guardados",
            icon: "success",
            confirmButtonColor: "#f69a0b",
        });
        navigate('/admin/usuarios');
    };

    return (
        <section className='w-full'>
            <div className='w-1/2 m-auto'>
                <div className="my-4 flex justify-between">
                    <label className='label'>Nombre:</label>
                    <span>{user.firstName}</span>
                </div>

                <div className="my-4 flex justify-between">
                    <label className='label'>Apellido:</label>
                    <span>{user.lastName}</span>
                </div>

                <div className="my-4 flex justify-between">
                    <label className='label'>Fecha de nacimiento:</label>
                    <span>{birthDate}</span>
                </div>

                <div className="my-4 flex justify-between">
                    <label className='label'>Direccion:</label>
                    <span>{user.address}</span>
                </div>

                <div className="my-4 flex justify-between">
                    <label className='label'>Ciudad:</label>
                    <span>{user.city}</span>
                </div>

                <div className="my-4 flex justify-between">
                    <label className='label'>Provincia:</label>
                    <span>{user.state}</span>
                </div>

                <div className="my-4 flex justify-between">
                    <label className='label'>C.P:</label>
                    <span>{user.postalCode}</span>
                </div>

                <div className="my-4 flex justify-between">
                    <label className='label'>Teléfono:</label>
                    <span>{user.phone}</span>
                </div>

                <div className="my-4 flex justify-between">
                    <label className='label'>Celular:</label>
                    <span>{user.mobile}</span>
                </div>

                <div className="my-4 flex justify-between">
                    <label className='label'>DNI:</label>
                    <span>{user.dni}</span>
                </div>

                <div className="my-4 flex justify-between">
                    <label className='label'>E-mail:</label>
                    <span>{user.email}</span>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="my-4 flex justify-between">
                        <label className='label'>Es Administrador?</label>
                        <input
                            type="checkbox"
                            checked={form.role}
                            name='role'
                            onChange={handleChange}
                            className="shadow-sm"
                        />
                    </div>
                    <Link to='/admin/usuarios'>
                        <button className="menu-btn border border-secondary rounded-full hover:bg-secondary">
                            Atrás
                        </button>
                    </Link>
                    <button type="submit" className="menu-btn border border-secondary rounded-full hover:bg-secondary">
                        Guardar
                    </button>
                </form>
            </div>
        </section>
    );
};

export default UsersInfo;
