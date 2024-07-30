import CardRescues from "../Card/CardRescues";

const CardsRescue = ({ rescues })=>{
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