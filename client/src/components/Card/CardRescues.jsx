import { Link } from "react-router-dom";

const CardRescues = ({ id, name, images }) => {
    return (
        <section>
            <Link to={`/rescatesdetalle/${id}`}>
                <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col items-center text-center p-4 w-72 h-96 transition-transform transform hover:scale-105">
                    <img 
                        src={images} 
                        alt={name} 
                        className="w-full h-72 object-cover rounded-t-lg transition-transform transform hover:scale-110"
                    />
                    <h1 className="tracking-wider text-lg font-semibold mt-4 text-secondary">{name}</h1>               
                </div>
            </Link>
        </section>
    );
};

export default CardRescues;
