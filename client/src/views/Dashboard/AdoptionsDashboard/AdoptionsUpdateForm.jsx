import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { updateById, getById, uploadAdoptionImages } from "../../../redux/adoptions/adoptionsActions";
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const AdoptionsUpdateForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { detail } = useSelector(state => state.adoptions);

    const [newImages, setNewImages] = useState([]);

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
        dispatch(getById(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (detail) {
            setForm({
                name: detail.name || '',
                gender: detail.gender || 'macho',
                specialCare: detail.specialCare || false,
                age: detail.age || '',
                getsAlongWithDogs: detail.getsAlongWithDogs || false,
                getsAlongWithCats: detail.getsAlongWithCats || false,
                getsAlongWithChildren: detail.getsAlongWithChildren || false,
                description: detail.description || '',
                image: detail.image || []
            });
        }
    }, [detail]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (form.image.length + newImages.length + files.length > 5) {
            Swal.fire({
                title: "Solo puedes subir un máximo de 5 imágenes",
                icon: "error",
                confirmButtonColor: "#f69a0b",
            });
        } else {
            setNewImages([...newImages, ...files]);
        }
    };

    const handleRemoveImage = (index) => {
        const newImageFiles = [...form.image];
        newImageFiles.splice(index, 1); // Eliminar el archivo en el índice dado
        setForm({
            ...form,
            image: newImageFiles,
        });
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     dispatch(updateById(id, form));
    //     Swal.fire({
    //         title: "Has actualizado la informacion",
    //         icon: "success",
    //         confirmButtonColor: "#f69a0b",
    //     });
    //     navigate('/admin/adopciones');
    // };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (newImages.length > 0) {
            dispatch(uploadAdoptionImages(id, newImages));
        }
        dispatch(updateById(id, form));
        Swal.fire({
            title: "Has actualizado la información",
            icon: "success",
            confirmButtonColor: "#f69a0b",
        });
        navigate('/admin/adopciones');
    };

    if (!detail) return <div>Adoption not found</div>;


    // console.log('es detalle', detail);
    // console.log('nuevas imagenes', newImages);
    // console.log(form);

    return (
        <section className="flex justify-center sm:ml-64">
            <div className="w-full max-w-4xl mt-4">
                <h1 className="title">Editar Callejerito</h1>
                <form onSubmit={handleSubmit}>
                    <div className="my-4 flex justify-between">
                        <label className="label">Nombre</label>
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
                        <label className="label">Edad</label>
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
                        <label className="label">Género</label>
                        <select
                            value={form.gender}
                            name='gender'
                            onChange={handleChange}
                            className="shadow-md label"
                        >
                            <option value="macho">Macho</option>
                            <option value="hembra">Hembra</option>
                        </select>
                    </div>

                    <div className="my-4 flex justify-between">
                        <label className="label">Precisa cuidados especiales</label>
                        <input
                            type="checkbox"
                            checked={form.specialCare}
                            name='specialCare'
                            onChange={handleChange}
                            className="shadow-sm"
                        />
                    </div>

                    <div className="my-4 flex justify-between">
                        <label className="label">Se lleva bien con perros</label>
                        <input
                            type="checkbox"
                            checked={form.getsAlongWithDogs}
                            name='getsAlongWithDogs'
                            onChange={handleChange}
                            className="shadow-sm"
                        />
                    </div>

                    <div className="my-4 flex justify-between">
                        <label className="label">Se lleva bien con gatos</label>
                        <input
                            type="checkbox"
                            checked={form.getsAlongWithCats}
                            name='getsAlongWithCats'
                            onChange={handleChange}
                            className="shadow-sm"
                        />
                    </div>

                    <div className="my-4 flex justify-between">
                        <label className="label">Se lleva bien con niños</label>
                        <input
                            type="checkbox"
                            checked={form.getsAlongWithChildren}
                            name='getsAlongWithChildren'
                            onChange={handleChange}
                            className="shadow-sm"
                        />
                    </div>

                    <div className="my-4 grid">
                        <label className="label">Descripción</label>
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
                        <label className="label">Imágenes</label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            onChange={handleImageChange}
                            multiple
                            accept="image/*"
                            className="mx-2 block w-full"
                        />
                        <div className="flex flex-wrap mt-2">
                            {form.image ?
                                form.image.map((img, index) => (
                                    <div key={index} className="relative w-24 h-24 mx-2">
                                        <img
                                            src={img}
                                            alt="Mascota"
                                            className="w-full h-full object-cover rounded-md"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage(index)}
                                            className="absolute top-0 right-0 mt-1 mr-1 text-red-500 bg-white rounded-full p-1 shadow"
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                ))
                                : <p>Las imagenes se están cargando, recargue la pagina por favor.</p>
                            }
                            {newImages.map((img, index) => (
                                <div key={index} className="relative w-24 h-24 mr-2 mb-2">
                                    <img
                                        src={URL.createObjectURL(img)}
                                        alt="Nueva mascota"
                                        className="w-full h-full object-cover rounded-md"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(index)}
                                        className="absolute top-0 right-0 mt-1 mr-1 text-red-500 bg-white rounded-full p-1 shadow"
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            ))}
                        </div>
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

