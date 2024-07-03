import Album from "../../components/Album/Album";
import fundacion from '/historiaFundacion.png'
import Carousel from "../../components/Carousel/Carousel";

const Foundation = ()=>{
    const slides = [
        "https://res.cloudinary.com/dm9glx5a7/image/upload/v1719616590/fundacionCallejeritos/historia/WhatsApp_Image_2024-06-24_at_17.30.13_leianl.jpg",
        "https://res.cloudinary.com/dm9glx5a7/image/upload/v1719616590/fundacionCallejeritos/historia/WhatsApp_Image_2024-06-24_at_17.30.13_1_ldwelp.jpg",
        "https://res.cloudinary.com/dm9glx5a7/image/upload/v1719616590/fundacionCallejeritos/historia/WhatsApp_Image_2024-06-24_at_17.29.30_tne7de.jpg"
    ]

    return(
        <section>
            <div className="grid grid-cols-2 p-2">                
                <div>
                    <h1 className='title text-secondary text-center my-10'>Bienvenidos a Fundación Callejeritos</h1>
                    <p className="paragraph my-10 mx-10">Desde 2021, estamos unidos en la realización de este sueño.</p>
                    <p className="paragraph my-10 mx-10">Somos un equipo de 10 voluntarios comprometidos y dedicados que trabajamos 
                    incansablemente para rescatar y rehabilitar animales necesitados. Desde perros abandonados hasta gatos callejeros, proporcionamos atención 
                    veterinaria crucial y un refugio amoroso, preparándolos para encontrar hogares permanentes.</p>
                    <p className="paragraph my-10 mx-10">También promovemos activamente el bienestar animal y la conciencia social 
                    sobre la importancia de la esterilización y los hogares de tránsito.</p>
                    <p className="paragraph my-10 mx-10">Nuestra misión ha sido guiada por la pasión y la solidaridad de nuestra 
                    comunidad, desde nuestros humildes comienzos hasta convertirnos en un faro de esperanza para innumerables animales. Cada paso que damos está 
                    guiado por el deseo de hacer una diferencia tangible en la vida de cada animal y en nuestra comunidad.</p>
                    <img src={fundacion} alt="" className="h-56 ml-60"/>
                </div>

                <div className='bg-white shadow-md rounded-lg p-4'>
                    <Album slides={slides}/>
                </div>           
            </div>
            <Carousel/>
        </section>
    )
};

export default Foundation;