import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { createRescues, getRescues } from "../../../redux/rescues/rescuesActions";
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const RescuesCreateForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { rescues } = useSelector(state => state.rescues);
    const [navigateToRescues, setNavigateToRescues] = useState(false);

    const [form, setForm] = useState({
        name: '',
        gender: 'macho',
        age: 'adulto',
        description: '',
        imageFiles: []
    });

    // const [errors, setErrors] = useState({
    //     name: '',
    //     gender: '',
    //     age: '',        
    //     description: '',
    //     imageFiles: ''
    // });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value,
        });
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
        const exist = rescues.find(a => a.name === form.name);
        if (exist) {
            Swal.fire({
                title: "Ese Callejerito ya existe",
                icon: "success",
                confirmButtonColor: "#f69a0b",
            });
            setNavigateToRescues(true);
        } else {
            const formData = new FormData();
            for (const key in form) {
                if (key === 'imageFiles') {
                    form.imageFiles.forEach(file => formData.append('imageFiles', file));
                } else {
                    formData.append(key, form[key]);
                }
            }
            dispatch(createRescues(formData));
            setForm({
                name: '',
                gender: 'macho',
                age: 'adulto',
                description: '',
                imageFiles: []
            });
            Swal.fire({
                title: "Nuevo rescate",
                text: "Has agregado un nuevo Callejerito",
                icon: "success",
                confirmButtonColor: "#f69a0b",
            });
        }
        setNavigateToRescues(true);
    };

    useEffect(() => {
        if (navigateToRescues) {
            navigate('/admin/rescates');
            dispatch(getRescues());
        }
    }, [navigateToRescues, navigate, dispatch]);

    return (
        <section className="flex justify-center sm:ml-64">
            <div className="w-full max-w-4xl mt-10">
                <h1 className="title ml-8">Nuevo Callejerito</h1>
                <form onSubmit={handleSubmit} className="mx-8">
                    <div className="my-4 flex justify-between">
                        <label className="label">Nombre</label>
                        <input
                            placeholder='Escriba el nombre'
                            type="text"
                            value={form.name}
                            name='name'
                            onChange={handleChange}
                            className="shadow-sm"
                        />
                    </div>

                    <div className="my-4 flex justify-between">
                        <label className="label">Edad</label>
                        <select
                            value={form.age}
                            name='age'
                            onChange={handleChange}
                            className="shadow-sm label"
                        >
                            <option value="cachorro">Cachorro</option>
                            <option value="adulto">Adulto</option>
                            <option value="anciano">Anciano</option>
                        </select>

                    </div>

                    <div className="my-4 flex justify-between">
                        <label className="label">Género</label>
                        <select
                            value={form.gender}
                            name='gender'
                            onChange={handleChange}
                            className="shadow-sm label"
                        >
                            <option value="macho">Macho</option>
                            <option value="hembra">Hembra</option>
                        </select>
                    </div>

                    <div className="my-4 grid">
                        <label className="label">Descripción</label>
                        <textarea
                            name="description"
                            rows="4"
                            cols='100'
                            onChange={handleChange}
                            className="shadow-md"></textarea>
                    </div>

                    <div className="my-4">
                        <label className="label">Imágenes</label>
                        <div>
                            <input
                                type="file"
                                multiple
                                onChange={handleImageChange}
                                className="shadow-md"
                            />
                            <div className="flex flex-wrap mt-2">
                                {form.imageFiles.map((file, index) => (
                                    <div
                                        key={index}
                                        className="relative w-24 h-24 mr-2 mb-2"
                                    >
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt="Mascota"
                                            className="w-full h-full object-cover rounded-md"
                                        />
                                        <button
                                            type="button"
                                            className="absolute top-0 right-0 mt-1 mr-1 text-red-500 bg-white rounded-full p-1 shadow"
                                            onClick={() => handleRemoveImage(index)}
                                        >
                                            <FontAwesomeIcon icon={faTrash} className='px-2' />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            {/* {form.imageFiles.map((file, index) => (
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
                            ))} */}
                            {/* {errors.imageFiles && <p className="text-red">{errors.imageFiles}</p>} */}
                        </div>
                    </div>

                    <Link to='/admin/rescates'>
                        <button className="menu-btn border border-secondary rounded-full hover:bg-secondary">Volver atrás</button>
                    </Link>
                    <button type="submit" className="menu-btn border border-secondary rounded-full hover:bg-secondary">Agregar</button>
                </form>
            </div>
        </section>
    )
};

export default RescuesCreateForm;