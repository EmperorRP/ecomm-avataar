"use client"
"use client"
import React, { useState, useEffect, useRef } from 'react';

interface CarouselDataItem {
  id: string;
  src: string;
}

const CarouselComponent: React.FC = () => {
  const [carouselData, setCarouselData] = useState<CarouselDataItem[]>([
    { id: '1', src: 'http://fakeimg.pl/350x150/?text=1' },
    { id: '2', src: 'http://fakeimg.pl/350x150/?text=2' },
    { id: '3', src: 'http://fakeimg.pl/350x150/?text=3' },
    { id: '4', src: 'http://fakeimg.pl/350x150/?text=4' },
    { id: '5', src: 'http://fakeimg.pl/350x150/?text=5' },
  ]);
  const carouselPlayState = useRef<number | null>(null);

  const next = () => {
    setCarouselData(carouselData => [...carouselData.slice(1), carouselData[0]]);
  };

  useEffect(() => {
    carouselPlayState.current = window.setInterval(next, 4000);
    return () => {
      if (carouselPlayState.current !== null) {
        clearInterval(carouselPlayState.current);
      }
    };
  }, []);

  return (
    <div className="carousel-container" style={{ display: 'flex', overflowX: 'auto' }}>
      {carouselData.map((item, index) => (
        <img 
          key={item.id} 
          src={item.src} 
          alt={`Carousel item ${index + 1}`} 
          style={{ flex: '0 0 auto', width: '350px', height: '150px', marginRight: '10px', objectFit: 'cover' }} 
        />
      ))}
    </div>
  );
};

export default CarouselComponent;
