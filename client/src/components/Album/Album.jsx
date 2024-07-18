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
        <section className="relative w-full h-full py-10 mb-10 ">
            {slides && slides.length > 0 ? (
                <div>
                    <button
                        onClick={prev}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 hover:bg-primary px-4 py-2 rounded-full z-10"
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <div className="flex justify-center">
                        <img src={slides[currentIndex]} alt={`slide-${currentIndex}`} className="w-3/4 object-cover" />
                    </div>
                    <button
                        onClick={next}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 hover:bg-primary px-4 py-2 rounded-full z-10"
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
