import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw, faRightFromBracket, faBars } from '@fortawesome/free-solid-svg-icons';

const SideBar = ()=>{
    return(
        <aside className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-primary">
            <ul className="space-y-2 font-medium">
                <Link to={`/`}>
                    <li>
                        <button className="menu-btn border border-secondary rounded-full hover:bg-secondary ml-4">
                            <FontAwesomeIcon icon={faPaw} className='mr-2'/>
                            Ver Sitio
                        </button>
                    </li>
                </Link>
                <Link to='/admin/rescates'>
                    <li className="hover:bg-secondary">
                        <button className="menu-btn">Rescates</button>
                    </li>
                </Link>
                <Link to='/admin/adopciones'>
                    <li className="hover:bg-secondary">
                        <button className="menu-btn">Adopciones</button>
                    </li>
                </Link>
                <Link to=''>
                    <li className="hover:bg-secondary">
                        <button className="menu-btn">Socios</button>
                    </li>
                </Link>
                <Link to=''>
                    <li className="hover:bg-secondary">
                        <button className="menu-btn">Usuarios</button>
                    </li>                
                </Link>
                <Link to=''>
                    <li className="hover:bg-secondary">
                        <button className="menu-btn">
                            <FontAwesomeIcon icon={faRightFromBracket} className="mr-2"/>
                            Cerrar sesión
                        </button>
                    </li>                
                </Link>
            </ul>
        </aside>
    )
};

export default SideBar;