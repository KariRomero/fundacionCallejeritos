import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faHandHoldingHeart, faPerson } from '@fortawesome/free-solid-svg-icons';


const Options = ()=>{

    
    
    return(
        <section className="py-16">
            <h1 className='text-2xl font-medium tracking-wider text-center mb-4'>
                Ayudanos a cambiar su historia
            </h1>
            <div className='grid grid-cols-3'>
                <div className='border border-solid border-grey rounded-2xl mx-10 px-4 pt-4 grid justify-items-center'>
                    <FontAwesomeIcon icon={faHouse} size="2xl" className='rounded-full w-20 h-20 p-4 text-secondary bg-primary'/>
                    {/* <h1>Hogar de Tránsito</h1> */}
                    <p>
                    Ser hogar de tránsito es una forma valiosa y gratificante de ayudar a los animales rescatados. Al ofrecer un 
                    lugar temporal y seguro, les brindas una segunda oportunidad mientras encuentran su hogar 
                    definitivo. Únete a nosotros en esta noble misión y experimenta la alegría de ver cómo un animal rescatado 
                    florece bajo tu cuidado. ¡Tu apoyo puede marcar la diferencia en sus vidas!
                    </p>
                    <button className='menu-btn border border-secondary rounded-full hover:bg-secondary'>Hogar de tránsito</button>
                </div>

                <div className='border border-solid border-grey rounded-2xl mx-10 px-4 pt-4 grid justify-items-center'>
                    <FontAwesomeIcon icon={faHandHoldingHeart} size="2xl" className='rounded-full w-20 h-20 p-4 text-secondary bg-primary'/>
                    {/* <h1>Donaciones</h1> */}
                    <p>
                    Tu donación puede transformar vidas. Con tu apoyo económico, proporcionamos atención veterinaria, alimentos y 
                    refugio a los animales rescatados, dándoles una segunda oportunidad. Cada contribución, por pequeña que sea, es 
                    crucial para continuar nuestra misión de rescate y rehabilitación. ¡Haz la diferencia hoy y ayuda a salvar 
                    vidas con tu donación!
                    </p>
                    <button className='menu-btn border border-secondary rounded-full hover:bg-secondary'>Donaciones</button>
                </div>

                <div className='border border-solid border-grey rounded-2xl mx-10 px-4 pt-4 grid justify-items-center'>
                    <FontAwesomeIcon icon={faPerson} size="2xl" className='rounded-full w-20 h-20 p-4 text-secondary bg-primary'/>
                    {/* <h1>Voluntario</h1> */}
                    <p>
                    Únete a nuestro equipo de voluntarios y marca una diferencia tangible en la vida de los animales rescatados. 
                    Tu tiempo y dedicación son esenciales para brindarles los cuidados y el amor que necesitan. Desde ayudar en las 
                    tareas diarias hasta participar en eventos de adopción, cada esfuerzo cuenta. ¡Sé parte de nuestra misión y 
                    experimenta la gratificación de ver cómo tu ayuda contribuye a salvar y transformar vidas!
                    </p>
                    <button className='menu-btn border border-secondary rounded-full hover:bg-secondary'>Voluntariado</button>
                </div>
            </div>

        </section>
    )
};

export default Options;