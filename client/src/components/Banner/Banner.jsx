import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import doggy from '/dog6.png';
import backG from '/BannerLanding.png';

const Banner = () => {
    return (
        <section className="w-full h-auto mt-1 grid grid-cols-1 mx-0 md:mx-32 bg-cover bg-center md:grid-cols-2" style={{ backgroundImage: `url(${backG})` }}>
            <div className="sm:justify-end">
                <img src={doggy} alt='banner' className='h-full' />
            </div>
            <div className='flex flex-col justify-center items-center md:items-start mt-12 px-4'>                
                <h1 className='text-3xl font-medium tracking-wider'>Cada rescate cuenta</h1>
                <h2 className='text-3xl font-medium tracking-wider'>Cada donación ayuda</h2>                
                <div className="flex flex-col items-center sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <Link to='/hacertesocio'>
                        <button className='font-medium text-base tracking-wider px-5 py-2.5 me-2 mb-4 mt-4 rounded-full bg-secondary'>
                            Hacerte socio
                        </button>
                    </Link>
                    <Link to='/fundacion'>
                        <button className='font-medium text-base tracking-wider px-5 py-2.5 me-2 mb-4 mt-4 border border-secondary rounded-full'>
                            Nuestra historia
                        </button>
                    </Link>
                    <a href='https://www.instagram.com/fundacion.callejeritos/' target='_blank' rel='noopener noreferrer' className='mt-4'>
                        <FontAwesomeIcon icon={faInstagram} size="2x" className='hover:text-secondary' />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Banner;
