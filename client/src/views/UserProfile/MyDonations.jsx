import MercadoPagoDonacion from "../../components/MercadoPago/MercadoPagoDonacion";
import UserDonations from "../../components/User/UserDonations";

const MyDonations = () => {
    return (
        <section className="flex h-screen justify-center px-4">
                <UserDonations />
                {/* <MercadoPagoDonacion /> */}
        </section>
    )
};

export default MyDonations;