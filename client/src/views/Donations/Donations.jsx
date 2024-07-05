import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { Link } from 'react-router-dom';
import { getAdoptions } from '../../redux/adoptions/adoptionsActions';
import fundacion from '/historiaFundacion.png';
import doggy from '/dog5.png';
import Album from '../../components/Album/Album';

const Donations = () =>{

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
                <div className="flex items-center justify-between mx-10">
                    <h1 className="title text-secondary text-center">¡Ayúdanos a Ayudarlos!</h1>
                    <Link to='/hacertesocio'>
                        <button className="menu-btn border border-secondary rounded-full hover:bg-secondary">Hacerte socio</button>
                    </Link>
                </div>
                <p className="paragraph mx-10 my-10">Tu contribución es fundamental para continuar nuestra misión de rescate y cuidado de los animales más necesitados. 
                    Aquí tienes algunas maneras en las que puedes colaborar:</p>
                <ul className="mx-10">
                    <li className="paragraph my-10">
                        <FontAwesomeIcon icon={faPaw} className='mr-2 text-secondary'/>
                        <strong>Alimento y Frazadas:</strong> Dona alimento para perros y gatos, pipetas, y antibióticos como cefalexinas. Durante el invierno, necesitamos 
                        ropas para animales y frazadas para mantener abrigados a los callejeros.
                    </li>
                    <li className="paragraph my-10">
                        <FontAwesomeIcon icon={faPaw} className='mr-2 text-secondary'/>
                        <strong>Recicla y Alimenta:</strong> Guarda tus bolsas vacías de KONGO. Cada 10 bolsas vacías se pueden canjear por una llena de alimento, ayudándonos 
                        a mantener a nuestros peludos bien alimentados.
                    </li>
                    <li className="paragraph my-10">
                        <FontAwesomeIcon icon={faPaw} className='mr-2 text-secondary'/>
                        <strong>Tarritos de Agua:</strong> Ayuda a mantener hidratados a los animales callejeros dejando tarritos de agua en lugares accesibles, 
                        especialmente en verano cuando las altas temperaturas pueden ser peligrosas.
                    </li>
                    <li className="paragraph-bold my-10">
                        Cada pequeña acción cuenta y juntos podemos hacer una gran diferencia. ¡Tu apoyo es esencial para darles a estos animales una 
                        segunda oportunidad!
                    </li>
                </ul>
                <a href='https://www.instagram.com/fundacion.callejeritos/' target='_blank' className="flex items-center mb-10 mx-10 paragraph hover:text-secondary">
                        Encontranos en Instagram <FontAwesomeIcon icon={faInstagram} size="xl" className="ml-2"/>
                </a> 
                <div className='flex justify-center'>
                    <img src={fundacion} alt="" className="h-32"/>
                    <img src={fundacion} alt="" className="h-32"/>
                    <img src={fundacion} alt="" className="h-32"/>
                    <img src={fundacion} alt="" className="h-32"/>
                    <img src={fundacion} alt="" className="h-32"/>
                </div>
            </div>
            <div className='bg-white shadow-md rounded-lg p-4'>
                <Album slides={allImages}/>
            </div>
            {/* <Link to='/hacertesocio'>
                <div className='h-full flex justify-center items-center'>
                    
                        <img src={doggy} alt='banner' className='w-2/3' />
                    
                </div>
            </Link> */}
        </section>
    )
};

export default Donations;