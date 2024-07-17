import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { createAdoptions, getAdoptions } from "../../../redux/adoptions/adoptionsActions";
import validateAdoptionsCreateForm from "./validateAdoptionsCreateForm";
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

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
        imageFiles: []
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
        imageFiles: ''
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
    
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (form.imageFiles.length + files.length > 5) {
            Swal.fire({
                title: "Solo puedes subir un máximo de 5 imágenes",
                icon: "error",
                confirmButtonColor: "#f69a0b",
            });
        }
        setForm({
            ...form,
            imageFiles: [...form.imageFiles, ...files],
        });
    };

    const handleRemoveImage = (index) => {
        const newImageFiles = [...form.imageFiles];
        newImageFiles.splice(index, 1); // Eliminar el archivo en el índice dado
        setForm({
            ...form,
            imageFiles: newImageFiles,
        });
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
            setNavigateToAdoptions(true);
        } else {
            const formData = new FormData();
            for (const key in form) {
                if (key === 'imageFiles') {
                    form.imageFiles.forEach(file => formData.append('imageFiles', file));
                } else {
                    formData.append(key, form[key]);
                }
            }
            dispatch(createAdoptions(formData));
            setForm({
                name: '',
                gender: 'macho',
                specialCare: false,
                age: '',
                getsAlongWithDogs: false,
                getsAlongWithCats: false,
                getsAlongWithChildren: false,
                description: '',
                imageFiles: []
            });
            Swal.fire({
                title: "Nueva adopción",
                text: "Has agregado un nuevo Callejerito",
                icon: "success",
                confirmButtonColor: "#f69a0b",
            });
        }
        setNavigateToAdoptions(true);
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
                <h1 className="title ml-8">Nuevo Callejerito</h1>
                <form onSubmit={handleSubmit} className="mx-8">
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
                        <label className="paragraph">Imágenes</label>
                        <div>
                            <input
                                type="file"
                                multiple
                                onChange={handleImageChange}
                                className="shadow-md"
                            />
                            {form.imageFiles.map((file, index) => (
                                <div 
                                key={index} 
                                className="flex justify-between items-center my-2"
                                >
                                    <p>{file.name}</p> 
                                    <button
                                        type="button"
                                        className="hover:text-red"
                                        onClick={() => handleRemoveImage(index)}
                                    >
                                        <FontAwesomeIcon icon={faTrash} className='px-2' />
                                    </button>
                                </div>
                            ))}
                            {/* {errors.imageFiles && <p className="text-red">{errors.imageFiles}</p>} */}
                        </div>
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
