import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getById } from "../../redux/rescues/rescuesActions";
import Album from "../../components/Album/Album";

const DetailRescues = ()=>{

    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getById(id));
    }, [dispatch, id]);

    const { detail } = useSelector((state) => state.rescues);

    return(
        <section className="grid grid-cols-2">
            <div className="mx-10 my-6">
                <h1 className='text-3xl font-medium tracking-wider text-secondary'>{detail.name}</h1>
                <p className="text-base font-normal tracking-wide text-start">{detail.description}</p>
            </div>
            <div>
                <Album slides={detail.image}/>            
            </div>
        </section>        
    )
};

export default DetailRescues;