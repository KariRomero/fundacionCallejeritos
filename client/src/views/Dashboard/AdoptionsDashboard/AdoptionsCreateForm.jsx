import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createAdoptions } from "../../../redux/adoptions/adoptionsActions";

const AdoptionsCreateForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { adoptions } = useSelector(state => state.adoptions);

    const [form, setForm] = useState({
        name: '',
        gender: 'macho',
        specialCare: false,
        age:'',
        getsAlongWithDogs:false,
        getsAlongWithCats:false,
        getsAlongWithChildren:false,
        description: '',
        image:[]
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const exist = adoptions.find(a => a.name === form.name);
        if (exist) {
            alert('Ese Callejerito ya existe');
        } else {
            dispatch(createAdoptions(form));
            setForm({
                name: '',
                gender: 'macho',
                specialCare: false,
                age:'',
                getsAlongWithDogs:false,
                getsAlongWithCats:false,
                getsAlongWithChildren:false,
                description: '',
                image:[]                
            });
            alert('Callejerito agregado');
        }
        navigate('/admin/adopciones');
    };

    return (
        <section className="flex justify-center sm:ml-64">
            <div className="w-full max-w-4xl">
                <h1 className="title">Nuevo Callejerito</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Nombre</label>
                        <input
                            placeholder='Escriba el nombre'
                            type="text"
                            value={form.name}
                            name='name'
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label>Edad</label>
                        <input
                            placeholder='Escriba la edad'
                            type="text"
                            value={form.age}
                            name='age'
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label>Género</label>
                        <select
                            value={form.gender}
                            name='gender'
                            onChange={handleChange}
                        >
                            <option value="macho">Macho</option>
                            <option value="hembra">Hembra</option>
                        </select>
                    </div>

                    <div>
                        <label>Precisa cuidados especiales</label>
                        <input
                            type="checkbox"
                            checked={form.specialCare}
                            name='specialCare'
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label>Se lleva bien con perros</label>
                        <input
                            type="checkbox"
                            checked={form.getsAlongWithDogs}
                            name='getsAlongWithDogs'
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label>Se lleva bien con gatos</label>
                        <input
                            type="checkbox"
                            checked={form.getsAlongWithCats}
                            name='getsAlongWithCats'
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label>Se lleva bien con niños</label>
                        <input
                            type="checkbox"
                            checked={form.getsAlongWithChildren}
                            name='getsAlongWithChildren'
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label>Descripción</label>
                        <input
                            placeholder='Escriba una descripción'
                            type="text"
                            value={form.description}
                            name='description'
                            onChange={handleChange}
                        />
                    </div>

                    {/* <div>
                        <label>Imagenes</label>
                        <input
                        placeholder='escriba el nombre' 
                        type="text" 
                        value={form.name} 
                        name='name' 
                        />
                    </div> */}

                    <button type="submit">Agregar</button>
                </form>
            </div>
        </section>
    );
};

export default AdoptionsCreateForm;
