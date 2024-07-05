import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faHandHoldingHeart, faPerson } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


const Options = ()=>{

    
    
    return(
        <section className="py-16">
            <h1 className='title text-center'>
                Ayudanos a cambiar su historia
            </h1>
            <div className='grid grid-cols-3'>
                <div className='border border-solid border-grey rounded-2xl mx-10 px-4 pt-4 grid justify-items-center'>
                    <FontAwesomeIcon icon={faHouse} size="2xl" className='rounded-full w-20 h-20 p-4 text-secondary bg-primary'/>
                    {/* <h1>Hogar de Tránsito</h1> */}
                    <p className='paragraph'>
                    Ser hogar de tránsito es una forma valiosa y gratificante de ayudar a los animales rescatados. Al ofrecer un 
                    lugar temporal y seguro, les brindas una segunda oportunidad mientras encuentran su hogar 
                    definitivo. Únete a nosotros en esta noble misión y experimenta la alegría de ver cómo un animal rescatado 
                    florece bajo tu cuidado. ¡Tu apoyo puede marcar la diferencia en sus vidas!
                    </p>
                    <Link>
                        <button className='menu-btn border border-secondary rounded-full hover:bg-secondary'>Hogar de tránsito</button>
                    </Link>
                </div>

                <div className='border border-solid border-grey rounded-2xl mx-10 px-4 pt-4 grid justify-items-center'>
                    <FontAwesomeIcon icon={faHandHoldingHeart} size="2xl" className='rounded-full w-20 h-20 p-4 text-secondary bg-primary'/>
                    {/* <h1>Donaciones</h1> */}
                    <p className='paragraph'>
                    Tu donación puede transformar vidas. Con tu apoyo económico, proporcionamos atención veterinaria, alimentos y 
                    refugio a los animales rescatados, dándoles una segunda oportunidad. Cada contribución, por pequeña que sea, es 
                    crucial para continuar nuestra misión de rescate y rehabilitación. ¡Haz la diferencia hoy y ayuda a salvar 
                    vidas con tu donación!
                    </p>
                    <Link to='/donaciones'>
                        <button className='menu-btn border border-secondary rounded-full hover:bg-secondary'>Donaciones</button>
                    </Link>
                </div>

                <div className='border border-solid border-grey rounded-2xl mx-10 px-4 pt-4 grid justify-items-center'>
                    <FontAwesomeIcon icon={faPerson} size="2xl" className='rounded-full w-20 h-20 p-4 text-secondary bg-primary'/>
                    {/* <h1>Voluntario</h1> */}
                    <p className='paragraph'>
                    Al adoptar, no solo estás cambiando la vida de un perro o gato, sino que también estás ganando un amigo fiel 
                    para toda la vida. Nuestros animales están llenos de cariño y esperan con ansias encontrar un hogar donde 
                    puedan sentirse seguros y queridos. Explora nuestras opciones de adopción y descubre cómo puedes hacer una 
                    diferencia significativa en la vida de un animal. ¡Adopta hoy y convierte su historia en un final feliz!
                    </p>
                    <Link to='/adopciones'>
                        <button className='menu-btn border border-secondary rounded-full hover:bg-secondary'>Adopciones</button>
                    </Link>
                </div>
            </div>

        </section>
    )
};

export default Options;