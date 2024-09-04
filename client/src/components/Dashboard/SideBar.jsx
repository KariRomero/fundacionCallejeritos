import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw, faRightFromBracket, faBars } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { startGoogleLogout } from "../../redux/auth/authActions";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID

const SideBar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const handleLogout = () => {
        dispatch(startGoogleLogout());
        localStorage.removeItem("token"); // Elimina el token del almacenamiento local
        navigate('/')
        window.location.reload();
    };

    return (
        <>
            <div className="fixed top-4 left-4 z-50 md:hidden">
                <FontAwesomeIcon icon={faBars} className="cursor-pointer text-2xl" onClick={toggleMenu} />
            </div>
            <aside className={`fixed top-0 left-0 z-40 h-screen w-64 bg-primary transition-transform transform ${showMenu ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                <div className="p-4 md:hidden">
                    <FontAwesomeIcon icon={faBars} className="text-2xl cursor-pointer" onClick={toggleMenu} />
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
                    <NavLink to='/admin/rescates' toggleMenu={toggleMenu}>
                        Rescates
                    </NavLink>
                    <NavLink to='/admin/adopciones' toggleMenu={toggleMenu}>
                        Adopciones
                    </NavLink>
                    <NavLink to='/admin/usuarios' toggleMenu={toggleMenu}>
                        Usuarios
                    </NavLink>
                    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                        <li className="hover:bg-secondary">
                            <button onClick={handleLogout} className='menu-btn hover:bg-secondary'>
                                <FontAwesomeIcon icon={faRightFromBracket} className="mr-2" />
                                Cerrar sesión
                            </button>
                        </li>
                    </GoogleOAuthProvider>
                </ul>
            </aside>
        </>
    )
};

const NavLink = ({ to, children, toggleMenu }) => {
    const location = useLocation();
    const isSelected = location.pathname.includes(to);

    return (
        <button className={`menu-btn ${isSelected ? 'menu-selected' : 'hover:bg-secondary'}`} onClick={toggleMenu}>
            <Link to={to} >
                <li className="hover:bg-secondary">
                    {children}
                </li>
            </Link>
        </button>
    );
};

export default SideBar;
