import CardAdoptions from "../Card/CardAdoptions";

const CardsAdoptions = ( { adoptions } )=>{
    return(
        <section>
            <div className="w-full bg-white grid grid-cols-1 sm:grid-cols-4 sm:gap-4 p-8">
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