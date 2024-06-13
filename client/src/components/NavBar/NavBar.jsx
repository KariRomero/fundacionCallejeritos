import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import Logo2 from "../Logo2/Logo2";
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
    const location = useLocation();

    const isSelected = (path) => location.pathname === path;

    return (
        <nav className="w-full h-40 flex items-center justify-around shadow-md">
            <Link to='/' className='h-full'>
                <Logo2 />
            </Link>
            
            <Link to='/fundacion'>
                <button className={`menu-btn ${isSelected('/fundacion') ? 'menu-selected' : 'hover:menu-btn-hover'}`}>
                    Fundación
                </button>
            </Link>
          
            <Link to='/adopciones'>
                <button className={`menu-btn ${isSelected('/adopciones') ? 'menu-selected' : 'hover:menu-btn-hover'}`}>
                    Adopciones
                </button>
            </Link>
         
            <Link to='/hogardetransito'>
                <button className={`menu-btn ${isSelected('/hogardetransito') ? 'menu-selected' : 'hover:menu-btn-hover'}`}>
                    Hogar de tránsito
                </button>
            </Link>
         
            <Link to='/voluntariado'>
                <button className={`menu-btn ${isSelected('/voluntariado') ? 'menu-selected' : 'hover:menu-btn-hover'}`}>
                    Voluntariado
                </button>
            </Link>
         
            <Link to='/donaciones'>
                <button className={`menu-btn ${isSelected('/donaciones') ? 'menu-selected' : 'hover:menu-btn-hover'}`}>
                    Donaciones
                </button>
            </Link>
          
            <Link to='/suscripcion'>
                <button className={`menu-btn ${isSelected('/suscripcion') ? 'menu-selected' : 'hover:menu-btn-hover'}`}>
                    Suscripción
                </button>
            </Link>
         
            <Link to='/iniciarsesion'>
                <button className="menu-btn border border-secondary rounded-full hover:bg-secondary">
                    <FontAwesomeIcon icon={faPaw} className='mr-2'/>
                    Iniciar sesión
                </button>
            </Link>
        </nav>
    );
};

export default NavBar;
