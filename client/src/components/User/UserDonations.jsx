import MercadoPagoDonacion from "../MercadoPago/MercadoPagoDonacion";

const UserDonations = () => {
    return (
        <section className="w-full max-w-4xl mx-auto h-auto my-36 p-8 flex flex-col justify-center items-center">
            <div className=" paragraph text-lg text-start ">
                <h1 className="title mt-2">Tu Ayuda, Su Segunda Oportunidad</h1>
                <p>
                    Tu contribución puede hacer una gran diferencia en la vida de miles de animales que necesitan ayuda.
                </p>
                <p>
                    En nuestra fundación, nos dedicamos a rescatar, cuidar y encontrar hogares amorosos para aquellos que han sido abandonados o maltratados.
                </p>
                <p>
                    Con tu donación, nos ayudas a cubrir gastos médicos, alimentación, y cuidados esenciales para que estos animales puedan tener una segunda oportunidad.
                </p>
                <p>
                    ¡Gracias por ser parte de este cambio positivo y por darle una nueva oportunidad a quienes más lo necesitan!
                </p>
                <div className="w-full flex justify-center mt-2">
                    <MercadoPagoDonacion />
                </div>
            </div>
        </section>
    );
};

export default UserDonations;
