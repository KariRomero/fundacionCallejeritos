import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getById } from "../../redux/user/usersActions";
import CardAdoptions from "../../components/Card/CardAdoptions";

const MyAdoptions = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { adopciones } = useSelector(state => state.users.user);
    const { user } = useSelector(state => state.users);
    const [adopcionesList, setAdopcionesList] = useState(adopciones);

    useEffect(() => {
        dispatch(getById(id));
    }, [dispatch, id]);

    useEffect(() => {
        setAdopcionesList(adopciones);
    }, [adopciones]);

    const handleDeleteSuccess = () => {
        dispatch(getById(id));
    };

    return (
        <section className="flex h-screen justify-center px-4">
            <ul className="w-full grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 mt-4">
                {Array.isArray(adopcionesList) && adopcionesList.map(adop => (
                    <CardAdoptions
                        key={adop.id}
                        id={adop.id}
                        name={adop.name}
                        gender={adop.gender}
                        images={adop.image[0]}
                        userId={user.id}
                        onDeleteSuccess={handleDeleteSuccess}
                    />
                ))}
            </ul>
        </section>
    );
};

export default MyAdoptions;
