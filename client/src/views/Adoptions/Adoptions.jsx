import CardsAdoptions from "../../components/Cards/CardsAdoptions";
import Filter from "../../components/Filter/Filter";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAdoptions } from "../../redux/adoptions/adoptionsActions";

const Adoptions = () => {
    const dispatch = useDispatch();
    const { adoptions } = useSelector(state => state.adoptions);
    
    useEffect(() => {
        dispatch(getAdoptions());
    }, [dispatch]);
    
    return (
        <section className="w-full flex flex-col items-center">
            <Filter />
            <CardsAdoptions adoptions={ adoptions } />
        </section>
    )
};

export default Adoptions;