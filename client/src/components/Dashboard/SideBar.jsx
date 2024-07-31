// import { Link, useLocation } from "react-router-dom";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPaw, faRightFromBracket, faBars } from '@fortawesome/free-solid-svg-icons';
// import { useState } from "react";

// const SideBar = () => {

//     const [showMenu, setShowMenu] = useState(false);

//     const toggleMenu = () => {
//         setShowMenu(!showMenu);
//     };

//     return (
//         <aside className="fixed top-0 left-0 z-40 w-64 h-screen bg-primary">

//             <FontAwesomeIcon icon={faBars} className="cursor-pointer" onClick={toggleMenu} />

//             {showMenu && (
//                 <ul className="space-y-2 font-medium">
//                     <Link to={`/`}>
//                         <li>
//                             <button className="menu-btn border border-secondary rounded-full hover:bg-secondary ml-4">
//                                 <FontAwesomeIcon icon={faPaw} className='mr-2' />
//                                 Ver Sitio
//                             </button>
//                         </li>
//                     </Link>
//                     <NavLink to='/admin/rescates'>
//                         Rescates
//                     </NavLink>
//                     <NavLink to='/admin/adopciones'>
//                         Adopciones
//                     </NavLink>
//                     <NavLink to='/admin/socios'>
//                         Socios
//                     </NavLink>
//                     <NavLink to='/admin/usuarios'>
//                         Usuarios
//                     </NavLink>
//                     <NavLink to='/admin/cerrar-sesion'>
//                         <FontAwesomeIcon icon={faRightFromBracket} className="mr-2" />
//                         Cerrar sesión
//                     </NavLink>
//                 </ul>
//             )}
//         </aside>
//     )
// };

// const NavLink = ({ to, children }) => {
//     const location = useLocation();
//     const isSelected = location.pathname.includes(to);

//     return (
//         <Link to={to} >
//             <li className="hover:bg-secondary">
//                 <button className={`menu-btn ${isSelected ? 'menu-selected' : 'hover:bg-secondary'}`}>
//                     {children}
//                 </button>

//             </li>
//         </Link>
//     );
// };

// export default SideBar;

import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw, faRightFromBracket, faBars } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";

const SideBar = () => {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <>
            <div className="fixed top-4 left-4 z-50 md:hidden">
                <FontAwesomeIcon icon={faBars} className="cursor-pointer" onClick={toggleMenu} />
            </div>
            <aside className={`fixed top-0 left-0 z-40 h-screen w-64 bg-primary transition-transform transform ${showMenu ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                <div className="p-4 md:hidden">
                    <FontAwesomeIcon icon={faBars} className="cursor-pointer" onClick={toggleMenu} />
                </div>
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
        </>
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
