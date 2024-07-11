// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPaw } from '@fortawesome/free-solid-svg-icons';
// import Logo from '../Logo/Logo';
// import { Link, useLocation } from 'react-router-dom';

// const NavBar = () => {
//     const location = useLocation();

//     const isSelected = (path) => location.pathname === path;

//     return (
//         <nav className="w-full h-40 flex items-center justify-around">
//             <Link to='/' className='h-full'>
//                 <Logo/>
//             </Link>
            
//             <Link to='/fundacion'>
//                 <button className={`menu-btn ${isSelected('/fundacion') ? 'menu-selected' : 'hover:menu-btn-hover'}`}>
//                     Fundación
//                 </button>
//             </Link>
          
//             <Link to='/rescates'>
//                 <button className={`menu-btn ${isSelected('/rescates') ? 'menu-selected' : 'hover:menu-btn-hover'}`}>
//                     Rescates
//                 </button>
//             </Link>
            
//             <Link to='/adopciones'>
//                 <button className={`menu-btn ${isSelected('/adopciones') ? 'menu-selected' : 'hover:menu-btn-hover'}`}>
//                     Adopciones
//                 </button>
//             </Link>
         
//             <Link to='/hogardetransito'>
//                 <button className={`menu-btn ${isSelected('/hogardetransito') ? 'menu-selected' : 'hover:menu-btn-hover'}`}>
//                     Hogar de tránsito
//                 </button>
//             </Link>
         
//             <Link to='/hacertesocio'>
//                 <button className={`menu-btn ${isSelected('/hacertesocio') ? 'menu-selected' : 'hover:menu-btn-hover'}`}>
//                     Hacerte socio
//                 </button>
//             </Link>
         
//             <Link to='/donaciones'>
//                 <button className={`menu-btn ${isSelected('/donaciones') ? 'menu-selected' : 'hover:menu-btn-hover'}`}>
//                     Donaciones
//                 </button>
//             </Link>           
         
//             <Link to='/iniciarsesion'>
//                 <button className="menu-btn border border-secondary rounded-full hover:bg-secondary">
//                     <FontAwesomeIcon icon={faPaw} className='mr-2'/>
//                     Iniciar sesión
//                 </button>
//             </Link>
//         </nav>
//     );
// };

// export default NavBar;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw, faBars } from '@fortawesome/free-solid-svg-icons';
import Logo from '../Logo/Logo';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const NavBar = () => {
    const location = useLocation();
    const [showMenu, setShowMenu] = useState(false);

    const isSelected = (path) => location.pathname === path;

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <nav className="w-full h-40 flex items-center justify-between px-4 sm:px-8 bg-white shadow-md">
            {/* Logo */}
            <Link to='/' className='h-40'>
                <Logo />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center justify-around space-x-4">
                <NavLink to='/fundacion' isSelected={isSelected}>
                    Fundación
                </NavLink>
                <NavLink to='/rescates' isSelected={isSelected}>
                    Rescates
                </NavLink>
                <NavLink to='/adopciones' isSelected={isSelected}>
                    Adopciones
                </NavLink>
                <NavLink to='/hogardetransito' isSelected={isSelected}>
                    Hogar de tránsito
                </NavLink>
                <NavLink to='/hacertesocio' isSelected={isSelected}>
                    Hacerte socio
                </NavLink>
                <NavLink to='/donaciones' isSelected={isSelected}>
                    Donaciones
                </NavLink>
                <Link to='/iniciarsesion' className="border border-secondary rounded-full hover:bg-secondary px-4 py-2 flex items-center">
                <FontAwesomeIcon icon={faPaw} className='mr-2'/>
                Iniciar sesión
            </Link>
            </div>

            {/* Mobile Menu */}
            <div className="sm:hidden flex items-center space-x-4">
                <FontAwesomeIcon icon={faBars} className="cursor-pointer" onClick={toggleMenu} />

                {showMenu && (
                    <div className="absolute top-16 right-0 w-48 bg-white shadow-md py-2 rounded-md flex flex-col space-y-2">
                        <NavLinkMobile to='/fundacion' isSelected={isSelected} toggleMenu={toggleMenu}>
                            Fundación
                        </NavLinkMobile>
                        <NavLinkMobile to='/rescates' isSelected={isSelected} toggleMenu={toggleMenu}>
                            Rescates
                        </NavLinkMobile>
                        <NavLinkMobile to='/adopciones' isSelected={isSelected} toggleMenu={toggleMenu}>
                            Adopciones
                        </NavLinkMobile>
                        <NavLinkMobile to='/hogardetransito' isSelected={isSelected} toggleMenu={toggleMenu}>
                            Hogar de tránsito
                        </NavLinkMobile>
                        <NavLinkMobile to='/hacertesocio' isSelected={isSelected} toggleMenu={toggleMenu}>
                            Hacerte socio
                        </NavLinkMobile>
                        <NavLinkMobile to='/donaciones' isSelected={isSelected} toggleMenu={toggleMenu}>
                            Donaciones
                        </NavLinkMobile>
                        <Link to='/iniciarsesion' className="border border-secondary rounded-full hover:bg-secondary px-4 py-2 flex items-center">
                <FontAwesomeIcon icon={faPaw} className='mr-2'/>
                Iniciar sesión
            </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

const NavLink = ({ to, isSelected, children }) => (
    <Link to={to}>
        <button className={`menu-btn ${isSelected(to) ? 'menu-selected' : 'hover:menu-btn-hover'}`}>
            {children}
        </button>
    </Link>
);

const NavLinkMobile = ({ to, isSelected, toggleMenu, children }) => (
    <Link to={to}>
        <button onClick={toggleMenu} className={`text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white ${isSelected(to) && 'font-bold'}`}>
            {children}
        </button>
    </Link>
);

export default NavBar;
