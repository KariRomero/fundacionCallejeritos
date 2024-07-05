import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { useRef } from "react";
import { Link } from 'react-router-dom';
import doggy from '/dog5.png';
import backG from '/BannerLanding.png';

const BecomeAPartner = () => {

    const contentRef = useRef(null);

    const handlerClick = () => {
        if (contentRef.current) {
            contentRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return(
        <section >                           
            {/* className="w-full h-auto mt-1 grid grid-cols-2 mx-32 bg-cover bg-center" style={{ backgroundImage: `url(${backG})` }} */}
             <div className='w-full h-auto mt-1 grid grid-cols-2 mx-32 ' >
                <div className='pt-36 text-center bg-repeat bg-center' style={{ backgroundImage: `url(${backG})` }}>
                    <h1 className="title">¡Hazte Socio y Transforma Vidas!</h1>    
                    <Link to='/hacertesocio' className='flex justify-center items-center'>                        
                        <button className="menu-btn border border-secondary rounded-full hover:bg-secondary">
                            Hacerte socio
                        </button>
                    </Link>
                    <a href='https://www.instagram.com/fundacion.callejeritos/' target='_blank' className="flex justify-center items-center mb-10 mx-10 paragraph hover:text-secondary">
                        Encontranos en Instagram <FontAwesomeIcon icon={faInstagram} size="xl" className="ml-2"/>
                    </a>
                    <button className='hover:bg-primary px-4 py-4 rounded-full' onClick={handlerClick}>
                        <FontAwesomeIcon icon={faChevronDown} size="xl"/>
                    </button>
                </div>
                <Link to='/'>
                    <img src={doggy} alt='banner' className='w-2/3'/>
                </Link>
             </div>

             <div ref={contentRef} className='py-32'>
                 <p className="paragraph mx-10 mb-10 mt-4">Convertirse en socio de nuestra fundación es una forma poderosa de apoyar de manera continua nuestra misión de rescatar y cuidar a los animales más vulnerables. Al hacerte socio, contribuyes mensualmente, permitiéndonos proporcionar atención veterinaria, alimento y un refugio seguro para los animales que rescatamos.</p>
                 <p className="paragraph mx-10 my-10">Tu compromiso mensual nos ayuda a planificar y realizar más rescates, y a ofrecerles a estos animales una segunda oportunidad de encontrar un hogar amoroso. Además, como socio, recibirás actualizaciones exclusivas sobre nuestras actividades y los avances de los perritos que has ayudado a salvar.</p>
                 <p className="paragraph mx-10 my-10">¡Únete a nuestra comunidad de socios hoy y marca una diferencia duradera en la vida de los animales necesitados!</p>
             </div>
        </section>      
    )
};

export default BecomeAPartner;
