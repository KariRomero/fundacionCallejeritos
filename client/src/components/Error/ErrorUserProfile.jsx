import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';

const ErrorUserProfile = () => {
  return (
    <section className="w-full flex flex-col justify-center items-center bg-white ">
            <div className="bg-secondary rounded-full p-8 my-16">
            <FontAwesomeIcon icon={faPaw} className='text-9xl text-primary' />
            </div>
            <h1 className="paragraph">
                Debe iniciar sesion
            </h1>
            <Link to='/iniciarsesion'>
                <button className="menu-btn">
                    Iniciar sesion
                </button>
            </Link>
        </section>
  )
}

export default ErrorUserProfile
