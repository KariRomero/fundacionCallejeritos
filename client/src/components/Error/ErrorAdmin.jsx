import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';

const ErrorAdmin = () => {
    return (
        <section className="h-screen w-full flex flex-col justify-center items-center bg-primary ">
            <div className="bg-secondary rounded-full p-8 my-16">
            <FontAwesomeIcon icon={faPaw} className='text-9xl text-primary' />
            </div>
            <h1 className="paragraph">
                Debe tener permisos de administrador para acceder
            </h1>
            <Link to='/'>
                <button className="menu-btn">
                    Volver a Home
                </button>
            </Link>
        </section>
    )
}

export default ErrorAdmin
