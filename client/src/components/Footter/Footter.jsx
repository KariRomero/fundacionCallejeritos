import Logo from "../Logo/Logo";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footter = ()=>{
    return(
        <div className="h-96 grid grid-cols-2 border border-t-grey border-b-0 border-x-0">
            <div className="h-72 m-auto">
                <Logo/>
            </div>
            <div className="mt-20">
                <h1>Adoptá un Callejerito</h1>
                <p>Inicio</p>
                <p>Callejeritos en adopción</p>
                <p>Sobre la fundación</p>
                <p>Quiero colaborar</p>
                <a href='https://www.instagram.com/fundacion.callejeritos/' target='_blank'>
                        <FontAwesomeIcon icon={faInstagram} size="xl" className='hover:text-secondary' />
                </a> 
            </div>
        </div>
    )
};

export default Footter;