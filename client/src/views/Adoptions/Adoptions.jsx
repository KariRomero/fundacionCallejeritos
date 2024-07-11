import CardsAdoptions from "../../components/Cards/CardsAdoptions";
import Filter from "../../components/Filter/Filter";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAdoptions } from "../../redux/adoptions/adoptionsActions";

const Adoptions = ()=>{
    
    const dispatch = useDispatch();
    const { adoptions } = useSelector(state => state.adoptions);
    
    useEffect(() => {
        dispatch(getAdoptions());
    }, [dispatch]);
    
    console.log(adoptions);
    return(
        <section>
            <Filter/>
            <CardsAdoptions adoptions={ adoptions }/>
        </section>
    )
};

export default Adoptions;