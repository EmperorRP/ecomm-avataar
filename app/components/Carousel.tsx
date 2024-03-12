"use client"
import React, { useEffect, useState } from 'react';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const Carousel: React.FC = () => {
    const [current, setCurrent] = useState<number>(0);

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

    const length = items.length;

    const nextItem = () =>{
    setCurrent(current === length - 1 ? 0 : current + 1)
    };

    const prevItem = () =>{
    setCurrent(current === 0 ? length - 1 : current - 1)
    };

    useEffect(() => {
        const interval = setInterval(nextItem, 4000); 

        return () => clearInterval(interval);
    }, [current]);
    

  return (
    <div className="slider mt-10">
        {items.map((item, index) => {
        return (
            <div className={index === current ? 'slide active' : 'slide'} key={index}>
            {index === current && (
                <div className="relative">
                <img src={item.image} alt={item.title} className="drop-shadow-xl rounded-xl w-[500px] h-[350px] mx-auto" />
                <div className="text-overlay rounded-lg">
                    <h2>{item.description}</h2>
                </div>
                </div>
            )}
            </div>
        );
        })}
        <div className='flex justify-between items-center w-full mt-10'>
            <div className='flex justify-start'>
                <FaArrowLeft className='' onClick={prevItem}/>
            </div>
            <div className="flex-grow text-center">
                {current + 1} / {length}
            </div>
            <div className='flex justify-end'>
                <FaArrowRight className='' onClick={nextItem}/>
            </div>
        </div>
    </div>
  );
};

export default Carousel;
