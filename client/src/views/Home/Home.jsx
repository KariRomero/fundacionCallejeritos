import Banner from "../../components/Banner/Banner";
import Options from "../../components/Options/Options";
import Carousel from "../../components/Carousel/Carousel";
import doggy from '/dog6.png';

const Home = ()=>{
    return(
        <div>
            <Banner doggy={doggy}/>
            <Options/>
            <Carousel/>
        </div>
    )
};

export default Home;