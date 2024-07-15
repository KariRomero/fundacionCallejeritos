import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { createAdoptions, getAdoptions } from "../../../redux/adoptions/adoptionsActions";
import validateAdoptionsCreateForm from "./validateAdoptionsCreateForm";
import Swal from 'sweetalert2';

const AdoptionsCreateForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { adoptions } = useSelector(state => state.adoptions);
    const [navigateToAdoptions, setNavigateToAdoptions] = useState(false);

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

    const [errors, setErrors] = useState({
        name: '',
        gender: '',
        specialCare: '',
        age: '',
        getsAlongWithDogs: '',
        getsAlongWithCats: '',
        getsAlongWithChildren: '',
        description: '',
        image: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setForm({
            ...form,
            [name]: newValue,
        });
        setErrors(validateAdoptionsCreateForm({
            ...form,
            [name]: newValue,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const exist = adoptions.find(a => a.name === form.name);
        if (exist) {
            Swal.fire({
                title: "Ese Callejerito ya existe",
                icon: "success",
                confirmButtonColor: "#f69a0b",
            });
        } else {
            dispatch(createAdoptions(form));
            setForm({
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
            Swal.fire({
                title: "Nueva adopción",
                text: "Has agregado un nuevo Callejerito",
                icon: "success",
                confirmButtonColor: "#f69a0b",
            });
            setNavigateToAdoptions(true);
        }
    };

    useEffect(() => {
        if (navigateToAdoptions) {
            navigate('/admin/adopciones');
            dispatch(getAdoptions());
        }
    }, [navigateToAdoptions, navigate, dispatch]);

    const emptyErrors = Object.keys(errors).length === 0;

    return (
        <section className="flex justify-center sm:ml-64">
            <div className="w-full max-w-4xl mt-4">
                <h1 className="title">Nuevo Callejerito</h1>
                <form onSubmit={handleSubmit}>
                    <div className="my-4 flex justify-between">
                        <label className="paragraph">Nombre</label>
                        <div className="grid">
                            <input
                                placeholder="Escriba el nombre"
                                type="text"
                                value={form.name}
                                name="name"
                                onChange={handleChange}
                                className="shadow-md"
                            />
                            {errors.name && <p className="text-red">{errors.name}</p>}
                        </div>
                    </div>

                    <div className="my-4 flex justify-between">
                        <label className="paragraph">Edad</label>
                        <div className="grid">
                            <input
                                placeholder="Escriba la edad"
                                type="text"
                                value={form.age}
                                name="age"
                                onChange={handleChange}
                                className="shadow-md"
                            />
                            {errors.age && <p className="text-red">{errors.age}</p>}
                        </div>
                    </div>

                    <div className="my-4 flex justify-between">
                        <label className="paragraph">Género</label>
                        <select
                            value={form.gender}
                            name="gender"
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
                            name="specialCare"
                            onChange={handleChange}
                            className="shadow-sm"
                        />
                    </div>

                    <div className="my-4 flex justify-between">
                        <label className="paragraph">Se lleva bien con perros</label>
                        <input
                            type="checkbox"
                            checked={form.getsAlongWithDogs}
                            name="getsAlongWithDogs"
                            onChange={handleChange}
                            className="shadow-sm"
                        />
                    </div>

                    <div className="my-4 flex justify-between">
                        <label className="paragraph">Se lleva bien con gatos</label>
                        <input
                            type="checkbox"
                            checked={form.getsAlongWithCats}
                            name="getsAlongWithCats"
                            onChange={handleChange}
                            className="shadow-sm"
                        />
                    </div>

                    <div className="my-4 flex justify-between">
                        <label className="paragraph">Se lleva bien con niños</label>
                        <input
                            type="checkbox"
                            checked={form.getsAlongWithChildren}
                            name="getsAlongWithChildren"
                            onChange={handleChange}
                            className="shadow-sm"
                        />
                    </div>

                    <div className="my-4 grid">
                        <label className="paragraph">Descripción</label>
                        <div>
                            <textarea
                                name="description"
                                rows="4"
                                cols="100"
                                onChange={handleChange}
                                className="shadow-md"
                            />
                            {errors.description && <p className="text-red">{errors.description}</p>}
                        </div>
                    </div>

                    <div className="my-4">
                        <button className="font-medium text-base tracking-wider">
                            Agregar Imágenes
                        </button>
                    </div>

                    <Link to="/admin/adopciones">
                        <button className="menu-btn border border-secondary rounded-full hover:bg-secondary">
                            Volver atrás
                        </button>
                    </Link>
                    <button type="submit" className="menu-btn border border-secondary rounded-full hover:bg-secondary">
                        Agregar Callejerito
                    </button>
                    {/* {
                        emptyErrors && 

                            <button type="submit" className="menu-btn border border-secondary rounded-full hover:bg-secondary">
                                Agregar Callejerito
                            </button>
                        
                    } */}
                </form>
            </div>
        </section>
    );
};

export default AdoptionsCreateForm;
