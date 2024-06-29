import { useState } from 'react';
import CardAdoptions from "../Card/CardAdoptions";

const Carousel = ({cards})=>{

    const adoptions=[
        {
        id: "5e81",
        name: "Leon",
        gender:"Macho",
        age:"Adulto",
        specialCare:true,
        getsAlongWithDogs:true,
        getsAlongWithCats:true,
        getsAlongWithChildren:true,
        description: "Nos avisaron que estaba en un taller, que lo había mordido una víbora y estaba infectado. Fuimos a buscarlo y efectivamente estaba en una situación compleja, con un olor nauseabundo. Lo llevamos al veterinario y tuvieron que amputarle la patita. Lo adopta enseguida Guada y su hijo Leon. Hoy, después de pasar por un cancer en sus orejas y amputárselas también, esta felizmente en un hogar que le dan muchísimo amor",
        image: [
            "https://res.cloudinary.com/dm9glx5a7/image/upload/v1719600762/fundacionCallejeritos/leon3.jpg",
            "https://res.cloudinary.com/dm9glx5a7/image/upload/v1719600762/fundacionCallejeritos/leon1.jpg",
            "https://res.cloudinary.com/dm9glx5a7/image/upload/v1719600762/fundacionCallejeritos/leon2.jpg"
        ]
        },
        {
        id: "ffc6",
        name: "Kitty",
        gender:"Hembra",
        age:"Adulto",
        specialCare:false,
        getsAlongWithDogs:true,
        getsAlongWithCats:false,
        getsAlongWithChildren:true,
        description: "Pasó casi todo su primer año de vida atada a una cadena, la cual le lastimó el cuello al punto de generarle una gran bichera. La misma hizo que tenga que pasar por 2 operaciones, 8 meses de recuperación. No solo eso, también la encontramos desnutrida, pesando tan solo 16 kg, y con tos perrera. Después de todo eso la vida le dio otra oportunidad. Fue descubriendo de a poco su esencia de perro, largando todo eso que tenía reprimido y ni sabia que era. Transformó todo ese sufrimiento en amor, porque es puro amor, y que tenga una familia que hoy en día le dio una segunda oportunidad de vivir como se merece, feliz",
        image: [
            "https://res.cloudinary.com/dm9glx5a7/image/upload/v1719601066/fundacionCallejeritos/kitty2.jpg",
        "https://res.cloudinary.com/dm9glx5a7/image/upload/v1719601011/fundacionCallejeritos/kitty1.jpg",
        "https://res.cloudinary.com/dm9glx5a7/image/upload/v1719601010/fundacionCallejeritos/kitty3.jpg"
        ]
        },
        {
        id: "022a",
        name: "Nero",
        gender:"Macho",
        age:"Adulto",
        specialCare:false,
        getsAlongWithDogs:true,
        getsAlongWithCats:false,
        getsAlongWithChildren:false,
        description: "Lo rescatamos del maltrato,  vivio toda su vida con un cable atado en su cuello el cual le lastimo y provoco que se le forme una bichera enorme. Cuando nero llego con nosotros era piel y huesos, nos tomo varios meses recuperarlo, pero hoy vive feliz con su familia, como debió ser siempre.",
        image: [
            "https://res.cloudinary.com/dm9glx5a7/image/upload/v1719601183/fundacionCallejeritos/nero2.jpg",
        "https://res.cloudinary.com/dm9glx5a7/image/upload/v1719601183/fundacionCallejeritos/nero1.jpg"
        ]
        },
        {
        id: "a8aa",
        name: "Apolo",
        gender:"Macho",
        age:"Cachorro",
        specialCare:true,
        getsAlongWithDogs:false,
        getsAlongWithCats:false,
        getsAlongWithChildren:true,
        description: "Fue encontrado junto a su mamá en un basural, ambos llenos de pulgas, garrapatas y sarna. El tuvo que pasar por largos tratamientos ya que las garrapatas le habian trasmitido una bacteria a la sangre, luego de varios meses se fue recuperando y comezo a vivir su nueva vida con una familia que lo ama.",
        image: [
        "https://res.cloudinary.com/dm9glx5a7/image/upload/v1719601268/fundacionCallejeritos/apolo1.jpg",
        "https://res.cloudinary.com/dm9glx5a7/image/upload/v1719601267/fundacionCallejeritos/apolo2.jpg"
        ]
        },
        {
        id: "ff18",
        name: "Bauti",
        gender:"Macho",
        age:"Cachorro",
        specialCare:true,
        getsAlongWithDogs:false,
        getsAlongWithCats:false,
        getsAlongWithChildren:false,
        description: "Lo habían tirado, fuimos a buscarlo y tenía 5 días. Lo criamos, fuimos todos los días alimentándolo con mamadera, calorcito y muchos cuidados porque su estado era muy delicado. Y finalmente a sus 45 días llegó una familia quien lo apodó CHANGUITO, y vive rodeado de amor.",
        image: [
            "https://res.cloudinary.com/dm9glx5a7/image/upload/v1719601378/fundacionCallejeritos/bauti2.jpg",
        "https://res.cloudinary.com/dm9glx5a7/image/upload/v1719601379/fundacionCallejeritos/bauti1.jpg"
        ]
        },
        {
        id: "b750",
        name: "Cloe",
        gender:"Hembra",
        age:"Cachorro",
        specialCare:false,
        getsAlongWithDogs:true,
        getsAlongWithCats:false,
        getsAlongWithChildren:true,
        description: "Nos avisaron que estaban abandonadas junto con su hermanita Panchi, en una caja. Estabas llenas de pulgas, infecciones, parásitos. Pudimos darle atención veterinaria y ambas consiguieron una familia hermosa",
        image: [
        "https://res.cloudinary.com/dm9glx5a7/image/upload/v1719601471/fundacionCallejeritos/cloe1.jpg",
        "https://res.cloudinary.com/dm9glx5a7/image/upload/v1719601472/fundacionCallejeritos/cloe2.jpg"
        ]
        },
        {
        id: "4999",
        name: "Diegote",
        gender:"Macho",
        age:"Cachorro",
        specialCare:false,
        getsAlongWithDogs:true,
        getsAlongWithCats:false,
        getsAlongWithChildren:true,
        description: "Un cachorro cruza con Border Collie que nació sin una de sus patitas delanteras y creemos que por eso fue abandonado. Anduvo dando vueltas más de un mes por el barrio Santa Lucía hasta que se consiguió tránsito. Hoy se llama Atahualpa, tiene una familia que le cumple todos los caprichos (hasta dormir en la cama), dos hermanas que lo tratan como un rey, y paseos caninos con amigos una vez a la semana ",
        image: [
        "https://res.cloudinary.com/dm9glx5a7/image/upload/v1719601601/fundacionCallejeritos/diegote2.jpg",
        "https://res.cloudinary.com/dm9glx5a7/image/upload/v1719601600/fundacionCallejeritos/diegote1.jpg"
        ]
        },
        {
        id: "b66d",
        name: "Pelu",
        gender:"Hembra",
        age:"Anciano",
        specialCare:true,
        getsAlongWithDogs:true,
        getsAlongWithCats:true,
        getsAlongWithChildren:true,
        description: "Nos envían un video aterrador, una perra tirada en la calle agonizando. Fue llevada al veterinario, estaba vieja deshidratada, no caminaba. Pelu fue todo un desafío. Comenzó fisioterapia, 2/3 veces por semana, durante meses. Estuvo mucho tiempo de tránsito en tránsito, de a poco comenzando a caminar. Pensábamos que nadie le iba a dar un lugar a la vieji, hasta que un día apareció Silvia y entendió todo, que lo importante no era la edad que Pelu tenía, si no todo lo demás que tenía para brindar. Hoy la vieja vive de 10, disfrutado su momento más vulnerable, la vejez, bien acompañada, con una familia y un hogar lleno de amor.",
        image: [
        "https://res.cloudinary.com/dm9glx5a7/image/upload/v1719601724/fundacionCallejeritos/pelu1.jpg"
        ],
        video: [
        "https://res.cloudinary.com/dm9glx5a7/video/upload/v1719601719/fundacionCallejeritos/peluVideo.mp4"
        ]
        }
        ]


    const [currentIndex, setCurrentIndex] = useState(0);
    const cardsToShow = 4;

    const next = () => {
        setCurrentIndex((prevIndex) => 
            (prevIndex + cardsToShow) % adoptions.length
        );
    };

    const prev = () => {
        setCurrentIndex((prevIndex) => 
            (prevIndex - cardsToShow + adoptions.length) % adoptions.length
        );
    };

    const displayCards = () => {
        let displayed = [];
        for (let i = 0; i < cardsToShow; i++) {
            displayed.push(adoptions[(currentIndex + i) % adoptions.length]);
        }
        return displayed;
    };
    return(
        <div className="relative w-full max-w-7xl mx-auto">
            <button 
                onClick={prev} 
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-l-lg"
            >
                Prev
            </button>
            <div className="flex overflow-hidden">
                {displayCards().map((card) => (
                    <CardAdoptions 
                        key={card.id} 
                        id={card.id} 
                        name={card.name} 
                        images={card.image[0]} 
                        gender={card.gender} 
                        age={card.age} 
                    />
                ))}
            </div>
            <button 
                onClick={next} 
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-r-lg"
            >
                Next
            </button>
        </div>
    )
};

export default Carousel;
