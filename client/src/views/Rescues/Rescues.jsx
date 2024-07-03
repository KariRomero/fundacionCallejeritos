import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import CardsRescue from "../../components/Cards/CardsRescue";
import Carousel from '../../components/Carousel/Carousel';

const Rescues = ()=>{
    return(
        <section>
            <h1 className='title text-secondary text-center'>Finales felices</h1>
            <p className="paragraph mx-10 my-10">En esta sección, te invitamos a conocer los relatos conmovedores de algunos de los perritos que hemos rescatado. Cada historia es un testimonio de resiliencia y amor, y una muestra del impacto positivo que tu apoyo puede lograr.
            Desde situaciones de abandono hasta recuperaciones difíciles, estos casos ejemplifican nuestra misión y la diferencia que podemos hacer juntos.
            </p>
            <p className="paragraph mx-10 my-10">¡Descubre cómo transformamos vidas y únete a nosotros en este noble esfuerzo!
            <FontAwesomeIcon icon={faPaw} className='pl-2'/>    
            </p>                 
            <CardsRescue/>
            <Carousel/>
        </section>
    )
};

export default Rescues;