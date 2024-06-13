import dog from '/1.png'

const Banner = ()=>{
    return(
        <div className="bg-primary w-full">
            <img src={dog} alt="dogg" className='bg-secondary rounded-full p-10' />

        </div>
    )
};

export default Banner;