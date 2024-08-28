import doggy from '/dog5.png';
import backG from '/BannerLanding.png';

const Dashboard = () => {
    return (
        <section className='flex justify-center h-screen sm:ml-64 bg-repeat bg-center' style={{ backgroundImage: `url(${backG})` }} >
            <div className='grid grid-cols-1 md:grid-cols-2 md:mx-auto md:my-auto' >
                <div className='pt-36 text-center ' >
                    <h1 className="title">¡Bienvenido al panel del Administrador!</h1>
                </div>
                <div className='flex justify-center mt-10'>
                    <img src={doggy} alt='banner' className='w-2/3' />
                </div>
            </div>
        </section>
    )
};

export default Dashboard;
