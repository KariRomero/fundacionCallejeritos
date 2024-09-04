import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw, faBars } from '@fortawesome/free-solid-svg-icons';
import Logo from '../Logo/Logo';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const NavBar = () => {
    const location = useLocation();
    const [showMenu, setShowMenu] = useState(false);

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const { user } = useSelector((state) => state.auth)

    const isSelected = (path) => location.pathname === path;

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <nav className="w-full h-40 flex items-center justify-between px-4 xl:px-8 bg-white shadow-md">

            <Link to='/' className='h-40'>
                <Logo />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden xl:flex items-center justify-around space-x-12">
                <NavLink to='/fundacion' isSelected={isSelected} toggleMenu={toggleMenu}>
                    Fundación
                </NavLink>
                <NavLink to='/rescates' isSelected={isSelected} toggleMenu={toggleMenu}>
                    Rescates
                </NavLink>
                <NavLink to='/adopciones' isSelected={isSelected} toggleMenu={toggleMenu}>
                    Adopciones
                </NavLink>
                <NavLink to='/donaciones' isSelected={isSelected} toggleMenu={toggleMenu}>
                    Donaciones
                </NavLink>
                {isLoggedIn ? (
                    <Link to={`/usuario/${user.id}/informacionpersonal`} className="border border-secondary rounded-full w-16 h-16">
                        <img src={user.image} alt='Foto perfil' className='rounded-full' />
                    </Link>

                ) : (
                    <Link to='/iniciarsesion' className="border border-secondary rounded-full hover:bg-secondary px-4 py-2 flex items-center">
                        <FontAwesomeIcon icon={faPaw} className='mr-2' />
                        Iniciar sesión
                    </Link>
                )}
            </div>

            {/* Mobile Menu */}
            <div className="xl:hidden flex space-x-4">
                <FontAwesomeIcon icon={faBars} className="text-xl pl-14" onClick={toggleMenu} />

                {showMenu && (
                    <div className="absolute top-28 right-0 w-full bg-white shadow-md p-6 rounded-md flex flex-col space-y-2 z-50">
                        <NavLinkMobile to='/fundacion' isSelected={isSelected} toggleMenu={toggleMenu}>
                            Fundación
                        </NavLinkMobile>
                        <NavLinkMobile to='/rescates' isSelected={isSelected} toggleMenu={toggleMenu}>
                            Rescates
                        </NavLinkMobile>
                        <NavLinkMobile to='/adopciones' isSelected={isSelected} toggleMenu={toggleMenu}>
                            Adopciones
                        </NavLinkMobile>
                        <NavLinkMobile to='/donaciones' isSelected={isSelected} toggleMenu={toggleMenu}>
                            Donaciones
                        </NavLinkMobile>
                        {isLoggedIn ? (
                            <button className="border border-secondary rounded-full w-16 h-16"
                                onClick={() => {
                                    toggleMenu();
                                    setShowMenu(false);
                                }}
                            >
                                <Link to={`/usuario/${user.id}/informacionpersonal`} >
                                    <img src={user.image} alt='Foto perfil' className='rounded-full' />
                                </Link>
                            </button>
                        ) : (
                            <Link to='/iniciarsesion' >
                                <button className="border border-secondary rounded-full hover:bg-secondary px-4 py-2 flex items-center"
                                    onClick={() => {
                                        toggleMenu();
                                        setShowMenu(false);
                                    }}
                                >
                                    <FontAwesomeIcon icon={faPaw} className='mr-2' />
                                    Iniciar sesión
                                </button>
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </nav >
    );
};

const NavLink = ({ to, isSelected, children, }) => (
    <Link to={to}>
        <button className={`menu-btn ${isSelected(to) ? 'menu-selected' : 'hover:menu-btn-hover'}`} >
            {children}
        </button>
    </Link>
);

const NavLinkMobile = ({ to, isSelected, toggleMenu, children }) => (
    <Link to={to}>
        <button onClick={toggleMenu} className={`menu-btn ${isSelected(to) ? 'menu-selected' : 'hove:menu-btn-hover'}`} >
            {children}
        </button>
    </Link>
);

export default NavBar;
