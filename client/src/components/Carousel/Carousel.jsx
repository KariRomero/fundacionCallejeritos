import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAdoptions } from '../../redux/adoptions/adoptionsActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import CardAdoptions from "../Card/CardAdoptions";

const Carousel = ({ cards }) => {

    const dispatch = useDispatch();
    const { adoptions } = useSelector((state) => state.adoptions);

    useEffect(() => {
        dispatch(getAdoptions())
    }, [dispatch]);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [cardsToShow, setCardsToShow] = useState(4); // Inicialmente mostrará 4 tarjetas

    useEffect(() => {
        // Ajustar cardsToShow para mostrar una sola card en dispositivos pequeños
        const resizeHandler = () => {
            if (window.innerWidth < 640) {
                setCardsToShow(1);
            } else {
                setCardsToShow(4);
            }
        };

        // Ejecutar una vez al cargar y luego cada vez que cambie el tamaño de la ventana
        resizeHandler();
        window.addEventListener('resize', resizeHandler);

        return () => {
            window.removeEventListener('resize', resizeHandler);
        };
    }, []);

    const next = () => {
        setCurrentIndex((prevIndex) =>
            (prevIndex + cardsToShow) % adoptions.length
        );
    };

    const prev = () => {
        setCurrentIndex((prevIndex) =>
            (prevIndex - cardsToShow + adoptions.length) % adoptions.length
        );
    };
 

    return (
        <section className="relative w-full py-10 mb-10">
            <Link to='/adopciones'>
                <h1 className="title text-secondary text-center">Tu Futuro Mejor Amigo Te Espera</h1>
            </Link>
            {adoptions && adoptions.length > 0 ? (
                <>
                    <button
                        onClick={prev}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 hover:bg-primary px-4 py-2 rounded-full z-10"
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <div className='flex justify-around'>
                        {adoptions.map((card) => (
                            <CardAdoptions
                                key={card.id}
                                id={card.id}
                                name={card.name}
                                images={card.image[0]}
                                gender={card.gender}
                                age={card.age}
                            />
                        ))}

                    </div>
                    <button
                        onClick={next}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 hover:bg-primary px-4 py-2 rounded-full z-10"
                    >
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </>
            ) : (
                <p>No hay adopciones disponibles en este momento.</p>
            )}
        </section>
    );
};

export default Carousel;
