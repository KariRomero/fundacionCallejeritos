import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';

const Donations = () =>{
    return(
        <section>
            <h1 className="title text-secondary text-center">¡Ayúdanos a Ayudar!</h1>
            <p className="paragraph mx-10 my-10">Tu contribución es fundamental para continuar nuestra misión de rescate y cuidado de los animales más necesitados. 
                Aquí tienes algunas maneras en las que puedes colaborar:</p>
            <ul className="mx-10">
                <li className="paragraph my-10">
                    <FontAwesomeIcon icon={faPaw} className='mr-2 text-secondary'/>
                    <strong>Alimento y Frazadas:</strong> Dona alimento para perros y gatos, pipetas, y antibióticos como cefalexinas. Durante el invierno, necesitamos 
                    ropas para animales y frazadas para mantener abrigados a los callejeros.
                </li>
                <li className="paragraph my-10">
                    <FontAwesomeIcon icon={faPaw} className='mr-2 text-secondary'/>
                    <strong>Recicla y Alimenta:</strong> Guarda tus bolsas vacías de KONGO. Cada 10 bolsas vacías se pueden canjear por una llena de alimento, ayudándonos 
                    a mantener a nuestros peludos bien alimentados.
                </li>
                <li className="paragraph my-10">
                    <FontAwesomeIcon icon={faPaw} className='mr-2 text-secondary'/>
                    <strong>Tarritos de Agua:</strong> Ayuda a mantener hidratados a los animales callejeros dejando tarritos de agua en lugares accesibles, 
                    especialmente en verano cuando las altas temperaturas pueden ser peligrosas.
                </li>
                <li className="paragraph-bold my-10">
                    Cada pequeña acción cuenta y juntos podemos hacer una gran diferencia. ¡Tu apoyo es esencial para darles a estos animales una 
                    segunda oportunidad!
                </li>
            </ul>
        </section>
    )
};

export default Donations;