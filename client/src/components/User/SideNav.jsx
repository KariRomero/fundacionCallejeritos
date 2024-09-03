// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCurrentUser, startGoogleLogout } from "../../redux/auth/authActions"; // Asegúrate de importar correctamente la acción
// import { faRightFromBracket, faBars } from '@fortawesome/free-solid-svg-icons';
// import { useState, useEffect } from "react";
// import { GoogleOAuthProvider } from '@react-oauth/google';

// const GOOGLE_CLIENT_ID = '330217204573-1ohsjkafgv61upbu9tbgd0j269ijul10.apps.googleusercontent.com';

// const SideNav = () => {
//     const [showMenu, setShowMenu] = useState(false);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const { user } = useSelector((state) => state.auth);

//     useEffect(() => {
//         dispatch(fetchCurrentUser());
//     }, [dispatch]);

//     const toggleMenu = () => {
//         setShowMenu(!showMenu);
//     };

//     const handleLogout = () => {
//         dispatch(startGoogleLogout());
//         localStorage.removeItem("token"); 
//         navigate('/')
//         window.location.reload();
//       };

//     return (
//         <>
//             <div className="top-4 left-4 z-50 md:hidden ">
//                 <FontAwesomeIcon icon={faBars} className="cursor-pointer" onClick={toggleMenu} />
//                 <ul className="flex">
//                     {user && (
//                         <>
//                             <Link to={`/usuario/${user.id}/misdonaciones`}>
//                                 <button className="border border-secondary rounded-full bg-secondary px-10 py-2 flex items-center mt-10 mx-2">
//                                     Donar
//                                 </button>
//                             </Link>
//                             <NavLink to={`/usuario/${user.id}/informacionpersonal`}>
//                                 Mis Datos
//                             </NavLink>
//                             {/* <NavLink to={`/usuario/${user.id}/misdonaciones`}>
//                                 Mis Donaciones
//                             </NavLink> */}
//                             <NavLink to={`/usuario/${user.id}/misadopciones`}>
//                                 Mis adopciones
//                             </NavLink>
//                         </>
//                     )}
//                     <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
//                         <li className="hover:bg-secondary">
//                             <button onClick={handleLogout} className='menu-btn menu-selected hover:bg-secondary'>
//                                 <FontAwesomeIcon icon={faRightFromBracket} className="mr-2" />
//                                 Cerrar sesión
//                             </button>
//                         </li>
//                     </GoogleOAuthProvider>
//                 </ul>
//             </div>
//             <aside className={`top-38 left-0 z-40  w-64 mt-2 bg-primary transition-transform transform ${showMenu ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>

//                 <ul className="space-y-2 font-medium">
//                     {user && (
//                         <>
//                             <Link to={`/usuario/${user.id}/misdonaciones`}>
//                                 <button className="border border-secondary rounded-full bg-secondary px-10 py-2 flex items-center my-6 mx-2">
//                                     Donar
//                                 </button>
//                             </Link>
//                             <NavLink to={`/usuario/${user.id}/informacionpersonal`}>
//                                 Mis Datos
//                             </NavLink>
//                             {/* <NavLink to={`/usuario/${user.id}/misdonaciones`}>
//                                 Mis Donaciones
//                             </NavLink> */}
//                             <NavLink to={`/usuario/${user.id}/misadopciones`}>
//                                 Mis adopciones
//                             </NavLink>
//                         </>
//                     )}
//                     <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
//                         <li className="hover:bg-secondary">
//                             <button onClick={handleLogout} className='menu-btn menu-selected hover:bg-secondary'>
//                                 <FontAwesomeIcon icon={faRightFromBracket} className="mr-2" />
//                                 Cerrar sesión
//                             </button>
//                         </li>
//                     </GoogleOAuthProvider>
//                 </ul>
//             </aside>
//         </>
//     );
// };

// const NavLink = ({ to, children }) => {
//     const location = useLocation();
//     const isSelected = location.pathname.includes(to);

//     return (
//         <Link to={to}>
//             <li className="hover:bg-secondary">
//                 <button className={`menu-btn ${isSelected ? 'menu-selected' : 'hover:bg-secondary'}`}>
//                     {children}
//                 </button>
//             </li>
//         </Link>
//     );
// };

// export default SideNav;

import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser, startGoogleLogout } from "../../redux/auth/authActions";
import { faRightFromBracket, faBars } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from "react";
import { GoogleOAuthProvider } from '@react-oauth/google';

const GOOGLE_CLIENT_ID = '330217204573-1ohsjkafgv61upbu9tbgd0j269ijul10.apps.googleusercontent.com';

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
            {/* Botón de menú para dispositivos móviles */}
            <div className="top-4 left-4 z-50 md:hidden">
                <FontAwesomeIcon icon={faBars} className="cursor-pointer" onClick={toggleMenu} />
            </div>

            {/* Barra lateral sin posición fija y con altura completa */}
            <aside className={`h-screen w-64 bg-primary transition-transform transform ${showMenu ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                <ul className="space-y-2 font-medium p-4">
                    {user && (
                        <>
                            <Link to={`/usuario/${user.id}/misdonaciones`}>
                                <button className="border border-secondary rounded-full bg-secondary px-10 py-2 flex items-center my-6 mx-2">
                                    Donar
                                </button>
                            </Link>
                            <NavLink to={`/usuario/${user.id}/informacionpersonal`}>
                                Mis Datos
                            </NavLink>
                            <NavLink to={`/usuario/${user.id}/misadopciones`}>
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
