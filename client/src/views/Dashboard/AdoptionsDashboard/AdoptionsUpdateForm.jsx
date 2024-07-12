import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { updateById } from "../../../redux/adoptions/adoptionsActions";
import Swal from 'sweetalert2';

const AdoptionsUpdateForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams(); // Obtenemos el id de los parámetros de la URL
    const { adoptions } = useSelector(state => state.adoptions);

    const adoptionToEdit = adoptions.find(adoption => adoption.id === parseInt(id));

    const [form, setForm] = useState({
        name: '',
        gender: 'macho',
        specialCare: false,
        age: '',
        getsAlongWithDogs: false,
        getsAlongWithCats: false,
        getsAlongWithChildren: false,
        description: '',
        image: []
    });

    useEffect(() => {
        if (adoptionToEdit) {
            setForm(adoptionToEdit);
        }
    }, [adoptionToEdit]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateById(id, form));
        Swal.fire({
            title: "Has actualizado la informacion",
            icon: "success",
            confirmButtonColor: "#f69a0b",
        });
        navigate('/admin/adopciones');
    };

    if (!adoptionToEdit) return <div>Adoption not found</div>;

    return (
        <section className="flex justify-center sm:ml-64">
            <div className="w-full max-w-4xl mt-4">
                <h1 className="title">Editar Callejerito</h1>
                <form onSubmit={handleSubmit}>
                    <div className="my-4 flex justify-between">
                        <label className="paragraph">Nombre</label>
                        <input
                            placeholder='Escriba el nombre'
                            type="text"
                            value={form.name}
                            name='name'
                            onChange={handleChange}
                            className="shadow-md"
                        />
                    </div>

                    <div className="my-4 flex justify-between">
                        <label className="paragraph">Edad</label>
                        <input
                            placeholder='Escriba la edad'
                            type="text"
                            value={form.age}
                            name='age'
                            onChange={handleChange}
                            className="shadow-md"
                        />
                    </div>

                    <div className="my-4 flex justify-between">
                        <label className="paragraph">Género</label>
                        <select
                            value={form.gender}
                            name='gender'
                            onChange={handleChange}
                            className="shadow-md paragraph"
                        >
                            <option value="macho">Macho</option>
                            <option value="hembra">Hembra</option>
                        </select>
                    </div>

                    <div className="my-4 flex justify-between">
                        <label className="paragraph">Precisa cuidados especiales</label>
                        <input
                            type="checkbox"
                            checked={form.specialCare}
                            name='specialCare'
                            onChange={handleChange}
                            className="shadow-sm"
                        />
                    </div>

                    <div className="my-4 flex justify-between">
                        <label className="paragraph">Se lleva bien con perros</label>
                        <input
                            type="checkbox"
                            checked={form.getsAlongWithDogs}
                            name='getsAlongWithDogs'
                            onChange={handleChange}
                            className="shadow-sm"
                        />
                    </div>

                    <div className="my-4 flex justify-between">
                        <label className="paragraph">Se lleva bien con gatos</label>
                        <input
                            type="checkbox"
                            checked={form.getsAlongWithCats}
                            name='getsAlongWithCats'
                            onChange={handleChange}
                            className="shadow-sm"
                        />
                    </div>

                    <div className="my-4 flex justify-between">
                        <label className="paragraph">Se lleva bien con niños</label>
                        <input
                            type="checkbox"
                            checked={form.getsAlongWithChildren}
                            name='getsAlongWithChildren'
                            onChange={handleChange}
                            className="shadow-sm"
                        />
                    </div>

                    <div className="my-4 grid">
                        <label className="paragraph">Descripción</label>
                        <textarea
                            name="description"
                            rows="4"
                            cols='100'
                            value={form.description}
                            onChange={handleChange}
                            className="shadow-md"
                        ></textarea>
                    </div>

                    <div className="my-4">
                        <button className="font-medium text-base tracking-wider">Actualizar Imagenes</button>
                    </div>

                    <Link to='/admin/adopciones'>
                        <button className="menu-btn border border-secondary rounded-full hover:bg-secondary">Volver atrás</button>
                    </Link>
                    <button type="submit" className="menu-btn border border-secondary rounded-full hover:bg-secondary">Actualizar Callejerito</button>
                </form>
            </div>
        </section>
    );
};

export default AdoptionsUpdateForm;
