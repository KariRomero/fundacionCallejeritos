import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { Link } from 'react-router-dom';
import { getAdoptions } from '../../redux/adoptions/adoptionsActions';
import Album from '../../components/Album/Album';

const BecomeAPartner = () => {

    const dispatch = useDispatch();
    const { adoptions } = useSelector((state) => state.adoptions);

    useEffect(()=>{
        dispatch(getAdoptions())
    },[dispatch]);

    const allImages = adoptions.reduce((acc, adoption) => {
        return acc.concat(adoption.image);
    }, []);

    return(
        <section className='grid grid-cols-2 p-2'>
            <div>               
                <div className='text-center'>
                    <h1 className="title text-secondary">¡Hazte Socio y Transforma Vidas!</h1>    
                    <Link to='/hacertesocio'>
                            <FontAwesomeIcon icon={faPaw} className='px-2 text-secondary '/>
                            <button className="menu-btn border border-secondary rounded-full hover:bg-secondary ">
                                Hacerte socio
                            </button>
                            <FontAwesomeIcon icon={faPaw} className='px-2 text-secondary '/>
                    </Link>
                </div>
                <p className="paragraph mx-10 mb-10 mt-4">Convertirse en socio de nuestra fundación es una forma poderosa de apoyar de manera continua nuestra misión de rescatar y cuidar a los animales más vulnerables. Al hacerte socio, contribuyes mensualmente, permitiéndonos proporcionar atención veterinaria, alimento y un refugio seguro para los animales que rescatamos.</p>
                <p className="paragraph mx-10 my-10">Tu compromiso mensual nos ayuda a planificar y realizar más rescates, y a ofrecerles a estos animales una segunda oportunidad de encontrar un hogar amoroso. Además, como socio, recibirás actualizaciones exclusivas sobre nuestras actividades y los avances de los perritos y gatitos que has ayudado a salvar.</p>
                <p className="paragraph mx-10 my-10">¡Únete a nuestra comunidad de socios hoy y marca una diferencia duradera en la vida de los animales necesitados!</p>

                
                <a href='https://www.instagram.com/fundacion.callejeritos/' target='_blank' className="flex items-center mb-10 mx-10 paragraph hover:text-secondary">
                        Encontranos en Instagram <FontAwesomeIcon icon={faInstagram} size="xl" className="ml-2"/>
                </a> 
            </div>
            <div className='bg-white shadow-md rounded-lg p-4'>
                <Album slides={allImages}/>
            </div>
        </section>
    )
};

export default BecomeAPartner;