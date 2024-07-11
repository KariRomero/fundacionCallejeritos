import CardAdoptions from "../Card/CardAdoptions";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { getAdoptions } from "../../redux/adoptions/adoptionsActions";

const CardsAdoptions = ( { adoptions } )=>{

    // const dispatch = useDispatch();
    // const { adoptions } = useSelector((state) => state.adoptions);

    // useEffect(()=>{
    //     dispatch(getAdoptions())
    // },[dispatch]);

    return(
        <section>
            <div className="w-full bg-white grid grid-cols-4 gap-4 p-8">
                {
                    adoptions && adoptions.map((a) => (
                        <CardAdoptions
                            key={a.id}
                            id={a.id}
                            name={a.name}
                            images={a.image[0]}
                            gender={a.gender}
                            age={a.age}
                        />
                    ))
                }
            </div>
        </section>
    )
};

export default CardsAdoptions;