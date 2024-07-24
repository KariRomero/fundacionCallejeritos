import CardAdoptions from "../Card/CardAdoptions";

const CardsAdoptions = ({ adoptions }) => {
    return (
        <section>
            <div className="bg-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-8">
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
                    ))}
            </div>
        </section>
    )
};

export default CardsAdoptions;