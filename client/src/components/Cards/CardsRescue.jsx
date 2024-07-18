import CardRescues from "../Card/CardRescues";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { getRescues } from "../../redux/rescues/rescuesActions";

const CardsRescue = ()=>{

    const dispatch = useDispatch();
    const { rescues } = useSelector((state) => state.rescues);

    useEffect(()=>{
        dispatch(getRescues())
    },[dispatch]);

    return(
        <section>
            <div className="w-full bg-white grid grid-cols-1 sm:grid-cols-4 gap-4 p-8">
                {
                    rescues && rescues.map((r) => (
                        <CardRescues
                            key={r.id}
                            id={r.id}
                            name={r.name}
                            images={r.image[0]}
                        />
                    ))
                }
            </div>
        </section>
    )
};

export default CardsRescue;