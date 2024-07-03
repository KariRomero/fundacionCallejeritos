import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import CardsRescue from "../../components/Cards/CardsRescue";
import Carousel from '../../components/Carousel/Carousel';

const Rescues = ()=>{
    return(
        <section>
            {/* <h1 className='text-2xl font-medium tracking-wider text-center mb-4'>Historias de Rescate</h1> */}
            <h1 className='text-secondary text-2xl font-medium tracking-wider text-center mb-4'>Finales felices</h1>
            <p className="text-base font-normal tracking-wide text-start ml-10 my-1">En esta sección, te invitamos a conocer los relatos conmovedores de algunos de los perritos que hemos rescatado.</p>
            <p className="text-base font-normal tracking-wide text-start ml-10 my-1">Cada historia es un testimonio de resiliencia y amor, y una muestra del impacto positivo que tu apoyo puede lograr.</p>
            <p className="text-base font-normal tracking-wide text-start ml-10 my-1">Desde situaciones de abandono hasta recuperaciones difíciles, estos casos ejemplifican nuestra misión y la diferencia que podemos hacer juntos.</p>
            <p className="text-base font-normal tracking-wide text-start ml-10 my-1">¡Descubre cómo transformamos vidas y únete a nosotros en este noble esfuerzo!
            <FontAwesomeIcon icon={faPaw} className='pl-2'/>    
            </p>                 
            <CardsRescue/>
            <Carousel/>
        </section>
    )
};

export default Rescues;