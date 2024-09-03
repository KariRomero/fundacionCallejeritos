import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { startGoogleLogout, fetchCurrentUser } from "../../redux/auth/authActions";
import { logInGoogle } from "../../redux/auth/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const googleClientID = "330217204573-1ohsjkafgv61upbu9tbgd0j269ijul10.apps.googleusercontent.com";

const LogInComponent = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { isLoggedIn } = useSelector((state) => state.auth);

  // Manejar la respuesta de autenticación de Google
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const idToken = credentialResponse.credential; // Obtener el idToken proporcionado por Google
      console.log("ID Token:", idToken);  // Verifica que el token se capture correctamente
  
      // Verifica que el idToken esté presente
      if (!idToken) {
        console.error('No se pudo obtener el idToken de Google.');
        return;
      }
  
      // Envía el idToken al backend para autenticar y obtener el token JWT
      const res = await axios.post(
        'https://fundacioncallejeritos-production.up.railway.app/autorizar/google-login',
        { idToken },  // Asegúrate de enviar el idToken en el cuerpo de la solicitud
        { 
          headers: { 'Content-Type': 'application/json' },  // Encabezados correctos
          withCredentials: true  // Asegúrate de que withCredentials sea true para enviar cookies
        }
      );
  
      const { token } = res.data;  // Obtén el token del backend (JWT)
  
      if (token) {
        localStorage.setItem('token', token); // Guarda el token en localStorage
        dispatch(fetchCurrentUser()); // Despacha la acción para obtener el usuario actual
        window.location.href = '/'; // Redirige al home de la aplicación
      }
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error?.response?.data || error.message);
      localStorage.removeItem('token');
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchCurrentUser()); // Verifica si el usuario ya está autenticado y obtiene sus datos
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
              onSuccess={handleGoogleLogin} // Capturar el `idToken` proporcionado por Google
              onError={(error) => console.error("Google login error:", error)}
            />
          </div>
        )}
      </GoogleOAuthProvider>
    </section>
  );
};

export default LogInComponent;