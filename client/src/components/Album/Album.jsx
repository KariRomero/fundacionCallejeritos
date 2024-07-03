import { useState, useEffect } from 'react';

const Album = ({ slides }) => {  
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % slides.length;
    setCurrentIndex(newIndex);
  };
  
  useEffect(() => {
    if (slides) {
      const interval = setInterval(nextSlide, 5000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [currentIndex, slides]);
  if (!slides) {    
    return <div>No hay banners disponibles.</div>;
  }

  return (
    <div className='h-[720px] w-full relative group bg-black block'>
      <div style={{ backgroundImage: `url(${slides[currentIndex]})` }} className='w-full h-full duration-500 bg-center bg-cover'></div>      
    </div>
  );
};

export default Album;