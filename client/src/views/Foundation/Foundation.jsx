import Album from "../../components/Album/Album";
import fundacion from '/historiaFundacion.png'

const Foundation = ()=>{
    const slides = [
        "https://res.cloudinary.com/dm9glx5a7/image/upload/v1719616590/fundacionCallejeritos/historia/WhatsApp_Image_2024-06-24_at_17.30.13_leianl.jpg",
        "https://res.cloudinary.com/dm9glx5a7/image/upload/v1719616590/fundacionCallejeritos/historia/WhatsApp_Image_2024-06-24_at_17.30.13_1_ldwelp.jpg",
        "https://res.cloudinary.com/dm9glx5a7/image/upload/v1719616590/fundacionCallejeritos/historia/WhatsApp_Image_2024-06-24_at_17.29.30_tne7de.jpg"
    ]


    return(
        <section className="grid grid-cols-2 p-2">
            <div>
                <h1 className='text-secondary text-2xl font-medium tracking-wider text-center my-10'>Bienvenidos a Fundación Callejeritos</h1>
                <p className="text-base font-normal tracking-wide text-start mx-10 my-6">Desde 2021, estamos unidos en la realización de este sueño.</p>
                <p className="text-base font-normal tracking-wide text-start mx-10 my-6">Somos un equipo de 10 voluntarios comprometidos y dedicados que trabajamos 
                incansablemente para rescatar y rehabilitar animales necesitados. Desde perros abandonados hasta gatos callejeros, proporcionamos atención 
                veterinaria crucial y un refugio amoroso, preparándolos para encontrar hogares permanentes.</p>
                <p className="text-base font-normal tracking-wide text-start mx-10 my-6">También promovemos activamente el bienestar animal y la conciencia social 
                sobre la importancia de la esterilización y los hogares de tránsito.</p>
                <p className="text-base font-normal tracking-wide text-start mx-10 my-6">Nuestra misión ha sido guiada por la pasión y la solidaridad de nuestra 
                comunidad, desde nuestros humildes comienzos hasta convertirnos en un faro de esperanza para innumerables animales. Cada paso que damos está 
                guiado por el deseo de hacer una diferencia tangible en la vida de cada animal y en nuestra comunidad.</p>
                <img src={fundacion} alt="" className="h-56 ml-60"/>
            </div>

            <div>
                <Album slides={slides}/>
            </div>           
        </section>
    )
};

export default Foundation;