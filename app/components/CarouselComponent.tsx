"use client"
import React, { useState, useEffect, useRef } from 'react';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Pagination from './PaginationComponent';


const ITEM_DISTANCE = 200;
const ITEM_ANGLE = -45;
const CENTER_ITEM_POP = 500;
const CENTER_ITEM_DISTANCE = 80;
const AUTOPLAY_DELAY = 4500;


const CarouselComponent: React.FC = () => {
  const el = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const items = [
    {
      title: "Utensils",
      description: "Modern Kitchen Utensils",
      image: "/img1.png",
  },
  {
      title: "Abstract",
      description: "Circular abstract",
      image: "/img2.png",
  },
  {
      title: "Sunflower pot",
      description: "Beautiful Vase",
      image: "/img3.png",
  },
  {
      title: "Conical Abstract",
      description: "Conical abstract art",
      image: "/img4.png",
  },
  {
      title: "Flower",
      description: "Flower",
      image: "/img5.png",
  },
];

  function setTransform(el: HTMLDivElement, xpos: number, zpos: number, yAngle: number) {
    el.style.transform = `translateX(${xpos}px) translateZ(${zpos}px) rotateY(${yAngle}deg)`;
  }

  useEffect(() => {
    target(currentIndex);
  }, [currentIndex, items]);

  useEffect(() => {
    startAutoplay();
    return () => {
      stopAutoplay();
    };
  }, []);

  function target(index: number) {
    const items = el.current!.children;
    setCurrentIndex(index);
    for (let i = 0; i < items.length; i++) {
      const item = items[i] as HTMLDivElement;

      if (i === index) {
        setTransform(item, 0, CENTER_ITEM_POP, 0);
      } else if (i < index) {
        setTransform(item, (i - index) * ITEM_DISTANCE - CENTER_ITEM_DISTANCE, 0, -ITEM_ANGLE);
      } else {
        setTransform(item, (i - index) * ITEM_DISTANCE + CENTER_ITEM_DISTANCE, 0, ITEM_ANGLE);
      }
    }
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, AUTOPLAY_DELAY);
  }

  function stopAutoplay() {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }

  const handleArrowClick = (direction: 'left' | 'right') => {
    stopAutoplay();
    const newIndex = direction === 'left' ? currentIndex - 1 : currentIndex + 1;
    const correctedIndex = (newIndex + items.length) % items.length;
    target(correctedIndex);
    startAutoplay();
  };

  return (
    <>
      <div className="container my-4">
      <div className='coverflow' ref={el}>
        {items.map((item, index) => (
          <div key={index} className='coverflow-item' onClick={() => target(index)}>
            <img src={item.image} alt={item.title} className="drop-shadow-xl rounded-lg w-[500px] h-[350px] mx-auto" />
            <div className="text-overlay rounded-lg">
                <h2>{item.description}</h2>
            </div>
          </div>
        ))}
      </div>
      
    </div>
    <div className='arrow-container mb-5'>
      <FaArrowLeft className="faArrowLeft" onClick={() => handleArrowClick('left')} />
      <Pagination total={items.length} current={currentIndex} onClick={target} />
      <FaArrowRight className="faArrowRight" onClick={() => handleArrowClick('right')} />
    </div>
    </>
  );
};

export default CarouselComponent;
