import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getById } from "../../redux/adoptions/adoptionsActions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCat, faDog, faChildReaching, faSuitcaseMedical, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Link } from "react-router-dom";
import Album from "../../components/Album/Album";
import fondoDetail from '/fondoDetail.png'


const DetailAdoptions = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getById(id));

    }, [dispatch, id]);

    const detail = useSelector((state) => state.adoptions.detail);
    console.log(detail.image);

    return (
        <section className="grid grid-cols-2 bg-repeat bg-auto" style={{ backgroundImage: `url(${fondoDetail})` }}>
            <div className="bg-white m-10 p-10">
                <div className="flex items-center justify-between">
                    <h1 className='titleName text-secondary'>{detail.name}</h1>
                    <div>
                        <button className="menu-btn border border-secondary rounded-full hover:bg-secondary">Adoptame!</button>
                        <Link to='/adopciones'>
                            <button className="paragraph-bold">Ver todos</button>
                        </Link>
                    </div>
                </div>
                <p className="paragraph-bold">{detail.age} - {detail.gender}</p>
                {/* <p className="paragraph-bold">{detail.gender}</p> */}
                <p className="paragraph">{detail.description}</p>
                <div className="grid grid-cols-1 gap-4 my-4">
                    {detail.specialCare ? (
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faSuitcaseMedical} size="2xl" className="w-10 h-10 p-2 text-primary bg-secondary rounded-full mr-2" />
                            <p className="paragraph">Requiere cuidados especiales</p>
                        </div>

                    ) : (
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faXmark} size="2lg" className="w-10 h-10 p-2 text-primary bg-secondary rounded-full mr-2" />
                            <p className="paragraph">No requiere cuidados especiales</p>
                        </div>
                    )
                    }
                    {detail.getsAlongWithDogs ? (
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faDog} size="2xl" className="w-10 h-10 p-2 text-primary bg-secondary rounded-full mr-2" />
                            <p className="paragraph">Me llevo bien con perros</p>
                        </div>

                    ) : (
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faXmark} size="2lg" className="w-10 h-10 p-2 text-primary bg-secondary rounded-full mr-2" />
                            <p className="paragraph">No me llevo bien con perros</p>
                        </div>
                    )

                    }
                    {detail.getsAlongWithCats ? (
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faCat} size="2xl" className="w-10 h-10 p-2 text-primary bg-secondary rounded-full mr-2" />
                            <p className="paragraph">Me llevo bien con gatos</p>
                        </div>
                    ) : (
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faXmark} size="2lg" className="w-10 h-10 p-2 text-primary bg-secondary rounded-full mr-2" />
                            <p className="paragraph">No me llevo bien con gatos</p>
                        </div>

                    )
                    }
                    {detail.getsAlongWithChildren ? (
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faChildReaching} size="2xl" className="w-10 h-10 p-2 text-primary bg-secondary rounded-full mr-2" />
                            <p className="paragraph">Me llevo bien con niños</p>
                        </div>
                    ) : (
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faXmark} size="2lg" className="w-10 h-10 p-2 text-primary bg-secondary rounded-full mr-2" />
                            <p className="paragraph">No me llevo bien con niños</p>
                        </div>
                    )
                    }
                </div>
                <a href='https://www.instagram.com/fundacion.callejeritos/' target='_blank' className="flex items-center mt-16 mx-2 paragraph hover:text-secondary">
                    Encontranos en Instagram <FontAwesomeIcon icon={faInstagram} size="xl" className="ml-2" />
                </a>
            </div>
            <div>
                <Album slides={detail.image} />
            </div>
        </section>
    );
};

export default DetailAdoptions;
