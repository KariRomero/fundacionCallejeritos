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
            <div>
                <h1>{detail.name}</h1>
                <h2>{detail.gender}</h2>
                <h2>{detail.age}</h2>
                <p>{detail.description}</p>
                <div>
                    {detail.specialCare && <FontAwesomeIcon icon={faSuitcaseMedical} />}
                    {detail.getsAlongWithDogs && <FontAwesomeIcon icon={faDog} />}
                    {detail.getsAlongWithCats && <FontAwesomeIcon icon={faCat} />}
                    {detail.getsAlongWithChildren && <FontAwesomeIcon icon={faChildReaching} />}
                </div>
                <button className="menu-btn border border-secondary rounded-full hover:bg-secondary">Adoptame!</button>
            </div>
            <div>
                <Album slides={detail.image}/>
            </div>
        </section>        
    );
};

export default DetailAdoptions;
