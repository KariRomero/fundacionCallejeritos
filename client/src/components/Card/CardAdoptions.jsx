// import { Link } from "react-router-dom";

// const CardAdoptions = ({ id, name, images, gender, handleClick }) => {
//     return (
//         <section>
//             <Link to={`/adopcionesdetalle/${id}`}>
//                 <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col items-center text-center p-4 w-72 h-96 transition-transform transform hover:scale-105">
//                     <img 
//                         src={images} 
//                         alt={name} 
//                         className="w-full h-72 object-cover rounded-t-lg transition-transform transform hover:scale-110"
//                     />
//                     <h1 className="tracking-wider text-lg font-semibold mt-4 text-secondary">{name}</h1>         
//                     <p className="tracking-wider text-sm font-light mt-0">{gender}</p>
//                     {/* <p className="tracking-wider text-sm font-light mt-0">{age}</p>  */}
//                 </div>

//             </Link>
//         </section>
//     );
// };

// export default CardAdoptions;

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from "react-redux";
import { deleteAdoptarAction } from "../../redux/adopt/adoptActions";

const CardAdoptions = ({ id, name, images, gender, userId }) => {
    const dispatch = useDispatch();
    const adopcionId = id

    const handleClick = (id) => {
        if (userId) {
            dispatch(deleteAdoptarAction(userId, adopcionId))
                .then(() => console.log('Eliminación exitosa'))
                .catch(e => console.log('Error en eliminación:', e));
        }
    };
    return (
        <section>
            {userId ? (

                <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col items-center text-center p-4 w-72 h-96 transition-transform transform hover:scale-105">
                    <img
                        src={images}
                        alt={name}
                        className="w-full h-72 object-cover rounded-t-lg transition-transform transform hover:scale-110"
                    />
                    <h1 className="tracking-wider text-lg font-semibold mt-4 text-secondary">{name}</h1>

                    <div className="flex justify-between items-center w-full px-4">
                        <p className="tracking-wider text-sm font-light">{gender}</p>
                        <button
                            onClick={handleClick}
                            className="flex items-center justify-center px-4 rounded hover:bg-red-600 transition-colors duration-300"
                            title="Eliminar"
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>
                </div>

            ) : (
                <Link to={`/adopcionesdetalle/${id}`}>
                    <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col items-center text-center p-4 w-72 h-96 transition-transform transform hover:scale-105">
                        <img
                            src={images}
                            alt={name}
                            className="w-full h-72 object-cover rounded-t-lg transition-transform transform hover:scale-110"
                        />
                        <h1 className="tracking-wider text-lg font-semibold mt-4 text-secondary">{name}</h1>
                        <p className="tracking-wider text-sm font-light">{gender}</p>

                    </div>
                </Link>
            )}
        </section>
    );
};

export default CardAdoptions;
