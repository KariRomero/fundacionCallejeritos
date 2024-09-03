import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { startGoogleLogout } from "../../redux/auth/authActions";
import { logInGoogle, getCurrentUser } from "../../redux/auth/authSlice"; // Importa desde authSlice
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const googleClientID =
  "330217204573-1ohsjkafgv61upbu9tbgd0j269ijul10.apps.googleusercontent.com";

const LogInComponent = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { isLoggedIn } = useSelector((state) => state.auth);

  // Manejar la respuesta de autenticación de Google
  const handleGoogleLogin = async () => {
    try {
      // Llama a la URL adecuada en el backend para autenticar y obtener el token JWT
      const res = await axios.post('https://fundacioncallejeritos-production.up.railway.app/autorizar/google-login', { withCredentials: true });
      const { token } = res.data;  // Obtén el token del backend

      if (token) {
        localStorage.setItem('token', token); // Guarda el token en localStorage

        // Solicita los datos del usuario autenticado utilizando el token JWT
        const userRes = await axios.get(
          'https://fundacioncallejeritos-production.up.railway.app/autorizar/current-user',
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const user = userRes.data.user; // Obtén el usuario autenticado del backend
        dispatch(logInGoogle(user)); // Usa la acción logInGoogle para actualizar el estado en Redux
      }
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error?.response?.data || error.message);
      // En caso de error, elimina el token de localStorage
      localStorage.removeItem('token');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Verifica si el usuario ya está autenticado y obtiene sus datos
      axios
        .get("https://fundacioncallejeritos-production.up.railway.app/autorizar/current-user", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          dispatch(getCurrentUser(response.data.user)); // Despacha la acción para obtener el usuario actual
        })
        .catch((error) => {
          console.error("Error fetching current user:", error?.response?.data || error.message);
          localStorage.removeItem("token");
        });
    }
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(startGoogleLogout());
    localStorage.removeItem("token"); // Elimina el token del almacenamiento local
    window.location.reload();
  };

  return (
    <section className="flex flex-col items-center justify-center">
      <GoogleOAuthProvider clientId={googleClientID}>
        {isLoggedIn ? (
          <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-lg">
            <p className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
              <FontAwesomeIcon icon={faPaw} className="mr-2 text-secondary" />
              Welcome, {user?.firstName}
            </p>
            <button
              onClick={handleLogout}
              className="px-4 py-2 menu-btn rounded flex items-center"
            >
              <FontAwesomeIcon icon={faPaw} className="mr-2" />
              Logout
            </button>
          </div>
        ) : (
          <div className="flex justify-center p-8 bg-white rounded-lg shadow-lg">
            <GoogleLogin
              onSuccess={() => {
                window.location.href =
                  "https://fundacioncallejeritos-production.up.railway.app"; // Redirigir a Google OAuth del backend
              }}
              onError={(error) => console.error("Google login error:", error)}
              logoSrc=""
            />
          </div>
        )}
      </GoogleOAuthProvider>
    </section>
  );
};

export default LogInComponent;