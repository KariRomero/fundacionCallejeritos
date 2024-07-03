import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getById } from "../../redux/adoptions/adoptionsActions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCat, faDog, faChildReaching, faSuitcaseMedical } from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Link } from "react-router-dom";
import Album from "../../components/Album/Album";


const DetailAdoptions = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getById(id));

    }, [dispatch, id]);

    const detail = useSelector((state) => state.adoptions.detail);

    return (
        <section className="grid grid-cols-2">
            <div className="mx-10 my-6">
                <div className="flex items-center justify-between">
                    <h1 className='title text-secondary'>{detail.name}</h1>
                    <div>
                        <button className="menu-btn border border-secondary rounded-full hover:bg-secondary">Adoptame!</button>
                        <Link to='/adopciones'>
                            <button className="paragraph-bold">Ver todos</button>
                        </Link>
                    </div>
                </div>
                <p className="paragraph-bold">{detail.gender}</p>
                <p className="paragraph-bold">{detail.age}</p>
                <p className="paragraph">{detail.description}</p>
                <div className="grid grid-cols-1 gap-4 my-4">
                    {detail.specialCare && 
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faSuitcaseMedical} size="2xl" className="w-10 h-10 p-2 text-primary bg-secondary rounded-full mr-2"/>
                        <p className="paragraph">Cuidados especiales</p>
                    </div>
                    }
                    {detail.getsAlongWithDogs && 
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faDog} size="2xl" className="w-10 h-10 p-2 text-primary bg-secondary rounded-full mr-2"/>
                        <p className="paragraph">Me llevo bien con perros</p>
                    </div>
                    }
                    {detail.getsAlongWithCats && 
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faCat} size="2xl" className="w-10 h-10 p-2 text-primary bg-secondary rounded-full mr-2"/>
                        <p className="paragraph">Me llevo bien con gatos</p>
                    </div>
                    }
                    {detail.getsAlongWithChildren && 
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faChildReaching} size="2xl" className="w-10 h-10 p-2 text-primary bg-secondary rounded-full mr-2"/>
                        <p className="paragraph">Me llevo bien con niños</p>
                    </div>
                    }
                </div>
                <a href='https://www.instagram.com/fundacion.callejeritos/' target='_blank' className="flex items-center mt-16 mx-2 paragraph hover:text-secondary">
                    Encontranos en Instagram <FontAwesomeIcon icon={faInstagram} size="xl" className="ml-2"/>
                </a> 
            </div>
            <div>
                <Album slides={detail.image}/>
            </div>
        </section>        
    );
};

export default DetailAdoptions;
