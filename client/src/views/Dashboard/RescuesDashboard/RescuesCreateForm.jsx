import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createRescues } from "../../../redux/rescues/rescuesActions";

const RescuesCreateForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { rescues } = useSelector(state => state.rescues);

    const [form, setForm] = useState({
        name: '',
        gender: 'macho',
        age: 'adulto',
        description: '',
        image: []
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
        const exist = rescues.find(a => a.name === form.name);
        if (exist) {
            alert('Ese Callejerito ya existe');
        } else {
            dispatch(createRescues(form));
            setForm({
                name: '',
                gender: 'macho',
                age: 'adulto',
                description: '',
                image: []
            });
            alert('Callejerito agregado');
        }
        navigate('/admin/rescates');
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
                        <select
                            value={form.age}
                            name='age'
                            onChange={handleChange}
                        >
                            <option value="cachorro">Cachorro</option>
                            <option value="adulto">Adulto</option>
                            <option value="anciano">Anciano</option>
                        </select>

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
    )
};

export default RescuesCreateForm;