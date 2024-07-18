import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Album = ({ slides }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const next = () => {
        setCurrentIndex((prevIndex) =>
            (prevIndex + 1) % slides.length
        );
    };

    const prev = () => {
        setCurrentIndex((prevIndex) =>
            (prevIndex - 1 + slides.length) % slides.length
        );
    };

    return (
        <section className="relative w-full h-full flex justify-center">
            {slides && slides.length > 0 ? (
                <div className="relative flex items-center">
                    <button
                        onClick={prev}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 hover:bg-primary px-4 py-2 rounded-full z-10"
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <div className="relative w-full flex justify-center items-center h-[500px]">
                        <img src={slides[currentIndex]} alt={`slide-${currentIndex}`} className="max-w-full max-h-full object-contain" />
                    </div>
                    <button
                        onClick={next}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 hover:bg-primary px-4 py-2 rounded-full z-10"
                    >
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </div>
            ) : (
                <p>No hay adopciones disponibles en este momento.</p>
            )}
        </section>
    );
};

export default Album;

