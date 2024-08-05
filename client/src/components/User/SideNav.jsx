import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "../../redux/auth/authActions"; // Asegúrate de importar correctamente la acción
import { faRightFromBracket, faBars } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from "react";

const SideNav = () => {
    const [showMenu, setShowMenu] = useState(false);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    // console.log(user);

    useEffect(() => {
        dispatch(fetchCurrentUser());
    }, [dispatch]);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <>
            <div className="top-4 left-4 z-50 md:hidden">
                <FontAwesomeIcon icon={faBars} className="cursor-pointer" onClick={toggleMenu} />
            </div>
            <aside className={`h-screen w-64 mt-2 bg-white transition-transform transform ${showMenu ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                
                <ul className="space-y-2 font-medium">
                    {user && (
                        <>
                            <NavLink to={`/usuario/${user.id}/informacionpersonal`}>
                                Mis Datos
                            </NavLink>
                            <NavLink to={`/usuario/${user.id}/misdonaciones`}>
                                Mis Donaciones
                            </NavLink>
                            <NavLink to={`/usuario/${user.id}/misuscripcion`}>
                                Mi suscripción
                            </NavLink>
                            <NavLink to={`/usuario/${user.id}/misadopciones`}>
                                Mis adopciones
                            </NavLink>
                        </>
                    )}
                    <NavLink to=''>
                        <FontAwesomeIcon icon={faRightFromBracket} className="mr-2" />
                        Cerrar sesión
                    </NavLink>
                </ul>
            </aside>
        </>
    );
};

const NavLink = ({ to, children }) => {
    const location = useLocation();
    const isSelected = location.pathname.includes(to);

    return (
        <Link to={to}>
            <li className="hover:bg-secondary">
                <button className={`menu-btn ${isSelected ? 'menu-selected' : 'hover:bg-secondary'}`}>
                    {children}
                </button>
            </li>
        </Link>
    );
};

export default SideNav;
