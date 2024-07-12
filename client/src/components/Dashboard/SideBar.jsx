import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const SideBar = () => {
    const location = useLocation();
    const isSelected = (path) => location.pathname.includes(path);

    return (
        <aside className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-primary">
            <ul className="space-y-2 font-medium">
                <Link to={`/`}>
                    <li>
                        <button className="menu-btn border border-secondary rounded-full hover:bg-secondary ml-4">
                            <FontAwesomeIcon icon={faPaw} className='mr-2' />
                            Ver Sitio
                        </button>
                    </li>
                </Link>
                <NavLink to='/admin/rescates'>
                    Rescates
                </NavLink>
                <NavLink to='/admin/adopciones'>
                    Adopciones
                </NavLink>
                <NavLink to='/admin/socios'>
                    Socios
                </NavLink>
                <NavLink to='/admin/usuarios'>
                    Usuarios
                </NavLink>
                <NavLink to='/admin/cerrar-sesion'>
                    <FontAwesomeIcon icon={faRightFromBracket} className="mr-2" />
                    Cerrar sesión
                </NavLink>
            </ul>
        </aside>
    )
};

const NavLink = ({ to, children }) => {
    const location = useLocation();
    const isSelected = location.pathname.includes(to);

    return (
        <Link to={to} >
            <li className="hover:bg-secondary">
                <button className={`menu-btn ${isSelected ? 'menu-selected' : 'hover:bg-secondary'}`}>
                    {children}
                </button>

            </li>
        </Link>
    );
};

export default SideBar;