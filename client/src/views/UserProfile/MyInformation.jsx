import SideNav from "../../components/User/SideNav";
import UserInfo from "../../components/User/UserInfo";

const MyInformation = () => {
    return(
        <section className='flex h-screen'>
            <SideNav/>
            <UserInfo/>
        </section>
    )
};

export default MyInformation;