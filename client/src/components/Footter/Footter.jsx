import Logo from "../Logo/Logo";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Link } from "react-router-dom";


const Footter = ()=>{
    return(
        <div className="grid grid-cols-2 border border-t-grey border-b-0 border-x-0">
            <div className="h-36 md:h-72 m-auto">
                <Link to='/'>
                    <Logo/>
                </Link>
            </div>
            <div className="mt-24 pb-16 mr-2">
                <h1 className='text-secondary text-base font-medium tracking-wider'>Adoptá un Callejerito</h1>
                <Link to='/'>
                    <p className="text-base font-normal tracking-wide my-2 hover:text-secondary">Inicio</p>
                </Link>
                <Link to='/fundacion'>
                    <p className="text-base font-normal tracking-wide my-2 hover:text-secondary">Sobre la fundación</p>
                </Link>
                <Link to='/adopciones'>
                    <p className="text-base font-normal tracking-wide my-2 hover:text-secondary">Callejeritos en adopción</p>
                </Link>
                <Link to=''>
                    <p className="text-base font-normal tracking-wide my-2 hover:text-secondary">Quiero colaborar</p>
                </Link>   
                <p className="text-base font-normal tracking-wide my-2 hover:text-secondary">E-mail: fundacion@fundacion.com</p>         
                <Link to='/admin'>
                    <p className="text-base font-normal tracking-wide my-2 hover:text-secondary">Administrador</p>
                </Link>   
                <a href='https://www.instagram.com/fundacion.callejeritos/' target='_blank' className="hover:text-secondary">
                    En Instagram<FontAwesomeIcon icon={faInstagram} size="xl" className=' ml-2' />
                </a> 
            </div>
        </div>
    )
};

export default Footter;