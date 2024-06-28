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
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque, cupiditate iure fugit saepe facere beatae vel accusamus soluta alias impedit ipsa earum iste deleniti aliquam dolore possimus illo at officiis!
                    </p>
                    <button className='menu-btn border border-secondary rounded-full hover:bg-secondary'>Hogar de tránsito</button>
                </div>

                <div className='border border-solid border-grey rounded-2xl mx-10 px-4 pt-4 grid justify-items-center'>
                    <FontAwesomeIcon icon={faHandHoldingHeart} size="2xl" className='rounded-full w-20 h-20 p-4 text-secondary bg-primary'/>
                    {/* <h1>Donaciones</h1> */}
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque, cupiditate iure fugit saepe facere beatae vel accusamus soluta alias impedit ipsa earum iste deleniti aliquam dolore possimus illo at officiis!
                    </p>
                    <button className='menu-btn border border-secondary rounded-full hover:bg-secondary'>Donaciones</button>
                </div>

                <div className='border border-solid border-grey rounded-2xl mx-10 px-4 pt-4 grid justify-items-center'>
                    <FontAwesomeIcon icon={faPerson} size="2xl" className='rounded-full w-20 h-20 p-4 text-secondary bg-primary'/>
                    {/* <h1>Voluntario</h1> */}
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque, cupiditate iure fugit saepe facere beatae vel accusamus soluta alias impedit ipsa earum iste deleniti aliquam dolore possimus illo at officiis!
                    </p>
                    <button className='menu-btn border border-secondary rounded-full hover:bg-secondary'>Voluntariado</button>
                </div>
            </div>

        </section>
    )
};

export default Options;