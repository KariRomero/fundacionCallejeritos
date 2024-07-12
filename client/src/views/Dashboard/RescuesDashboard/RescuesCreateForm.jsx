import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
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
            <div className="w-full max-w-4xl mt-4">
                <h1 className="title">Nuevo Callejerito</h1>
                <form onSubmit={handleSubmit}>
                    <div className="my-4 flex justify-between">
                        <label className="paragraph">Nombre</label>
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
                        <label className="paragraph">Edad</label>
                        <select
                            value={form.age}
                            name='age'
                            onChange={handleChange}
                            className="shadow-sm paragraph"
                        >
                            <option value="cachorro">Cachorro</option>
                            <option value="adulto">Adulto</option>
                            <option value="anciano">Anciano</option>
                        </select>

                    </div>

                    <div className="my-4 flex justify-between">
                        <label className="paragraph">Género</label>
                        <select
                            value={form.gender}
                            name='gender'
                            onChange={handleChange}
                            className="shadow-sm paragraph"
                        >
                            <option value="macho">Macho</option>
                            <option value="hembra">Hembra</option>
                        </select>
                    </div>

                    <div className="my-4 grid">
                        <label className="paragraph">Descripción</label>
                        <textarea name="description" rows="4" cols='100' onChange={handleChange} className="shadow-md"></textarea>
                        {/* <input
                            placeholder='Escriba una descripción'
                            type="text"
                            value={form.description}
                            name='description'
                            onChange={handleChange}
                        /> */}
                    </div>

                    <div>
                        <button className="font-medium text-base tracking-wider ">Agregar Imagenes</button>
                        {/* <label>Imagenes</label>
                        <input
                        placeholder='escriba el nombre' 
                        type="text" 
                        value={form.name} 
                        name='name' 
                        /> */}
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