import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getById } from "../../redux/adoptions/adoptionsActions";
import Album from "../../components/Album/Album";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCat, faDog, faChildReaching, faSuitcaseMedical } from "@fortawesome/free-solid-svg-icons";


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
                    <h1 className='text-3xl font-medium tracking-wider text-secondary'>{detail.name}</h1>
                    <button className="menu-btn border border-secondary rounded-full hover:bg-secondary">Adoptame!</button>
                </div>
                <p className="text-base font-normal tracking-wide text-start">{detail.gender}</p>
                <p className="text-base font-normal tracking-wide text-start">{detail.age}</p>
                <p className="text-base font-normal tracking-wide text-start">{detail.description}</p>
                <div className="grid grid-cols-1 gap-4 my-2">
                    {detail.specialCare && 
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faSuitcaseMedical} size="2xl" className="w-10 h-10 p-2 text-primary bg-secondary rounded-full mr-2"/>
                        <p className="text-sm font-normal tracking-wide text-center">Cuidados especiales</p>
                    </div>
                    }
                    {detail.getsAlongWithDogs && 
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faDog} size="2xl" className="w-10 h-10 p-2 text-primary bg-secondary rounded-full mr-2"/>
                        <p className="text-sm font-normal tracking-wide text-center">Me llevo bien con perros</p>
                    </div>
                    }
                    {detail.getsAlongWithCats && 
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faCat} size="2xl" className="w-10 h-10 p-2 text-primary bg-secondary rounded-full mr-2"/>
                        <p className="text-sm font-normal tracking-wide text-center">Me llevo bien con gatos</p>
                    </div>
                    }
                    {detail.getsAlongWithChildren && 
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faChildReaching} size="2xl" className="w-10 h-10 p-2 text-primary bg-secondary rounded-full mr-2"/>
                        <p className="text-sm font-normal tracking-wide text-center">Me llevo bien con niños</p>
                    </div>
                    }
                </div>
            </div>
            <div>
                <Album slides={detail.image}/>
            </div>
        </section>        
    );
};

export default DetailAdoptions;
