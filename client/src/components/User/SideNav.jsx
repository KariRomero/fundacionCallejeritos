import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser, startGoogleLogout } from "../../redux/auth/authActions";
import { faRightFromBracket, faPaw } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from "react";
import { GoogleOAuthProvider } from '@react-oauth/google';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID

const SideNav = () => {
    const [showMenu, setShowMenu] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(fetchCurrentUser());
    }, [dispatch]);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const handleLogout = () => {
        dispatch(startGoogleLogout());
        localStorage.removeItem("token");
        navigate('/');
        window.location.reload();
    };


    return (
        <>
            <div className="top-4 md:hidden flex justify-center mt-2">
                <button
                    className="w-full border border-secondary rounded-full hover:bg-secondary px-4 py-2 flex justify-center items-center"
                    onClick={toggleMenu}
                >
                    <FontAwesomeIcon icon={faPaw} className='mr-2' />
                    Mi Perfil
                </button>
            </div>

            {/* Side */}
            <aside className={`absolute h-screen w-64 bg-primary z-40 transition-transform transform ${showMenu ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
                <ul className="space-y-2 font-medium p-4">
                    {user && (
                        <>
                            <Link to={`/usuario/${user.id}/misdonaciones`}>
                                <button className="border border-secondary rounded-full bg-secondary px-10 py-2 flex items-center my-6 mx-2">
                                    Donar
                                </button>
                            </Link>
                            <NavLink to={`/usuario/${user.id}/informacionpersonal`} toggleMenu={toggleMenu}>
                                Mis Datos
                            </NavLink>
                            <NavLink to={`/usuario/${user.id}/misadopciones`} toggleMenu={toggleMenu}>
                                Mis Adopciones
                            </NavLink>
                        </>
                    )}
                    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                        <li className="hover:bg-secondary">
                            <button onClick={handleLogout} className='menu-btn menu-selected hover:bg-secondary'>
                                <FontAwesomeIcon icon={faRightFromBracket} className="mr-2" />
                                Cerrar sesión
                            </button>
                        </li>
                    </GoogleOAuthProvider>
                </ul>
            </aside>
        </>
    );
};

const NavLink = ({ to, children, toggleMenu }) => {
    const location = useLocation();
    const isSelected = location.pathname.includes(to);

    return (
        <Link to={to}>
            <li className="hover:bg-secondary">
                <button className={`menu-btn ${isSelected ? 'menu-selected' : 'hover:bg-secondary'}`} onClick={toggleMenu}>
                    {children}
                </button>
            </li>
        </Link>
    );
};

export default SideNav;
