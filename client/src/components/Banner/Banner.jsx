import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import doggy from '/dog6.png';
import backG from '/BannerLanding.png';


const Banner = ()=>{
    return(
        <div className="bg-secondary w-full h-auto mt-1 grid grid-cols-2 mx-32 bg-cover bg-center" style={{ backgroundImage: `url(${backG})` }}>
            <div>
                <img src={doggy} alt='banner' className='h-full' />
            </div>
            <div className='mt-36 ' >
                <h1 className='text-3xl font-medium tracking-wider'>Cada rescate cuenta</h1>
                <h2 className='text-3xl font-medium tracking-wider'>Cada donación ayuda</h2>
                <Link to='/donaciones'>
                    <button className='font-medium text-base tracking-wider px-5 py-2.5 me-2 mb-4 mt-4 rounded-full bg-secondary'>Donaciones</button>
                </Link>
                <Link to='/fundacion'>
                    <button className='font-medium text-base tracking-wider px-5 py-2.5 me-2 mb-4 mt-4 border border-secondary rounded-full'>Nuestra historia</button>
                </Link>
                <a href='https://www.instagram.com/fundacion.callejeritos/' target='_blank'>
                    <FontAwesomeIcon icon={faInstagram} size="xl" className='hover:text-secondary' />
                </a>                
            </div>
        </div>
    )
};

export default Banner;