import React, { useState } from 'react';
import { HiOutlineTruck } from 'react-icons/hi';
import MainButton from './MainButton';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      tagline: 'Crispy, Every Bite Tasty',
      title: 'AWESOME\nDELICIOUS\nPIZZA',
      buttonText: 'Order Now',
      bgImage: './slider2.jpg',
    },
    {
      tagline: 'Fresh & Hot',
      title: 'PERFECT\nITALIAN\nPIZZA',
      buttonText: 'Order Now',
      bgImage: './slider3n.png',
    },
  ];

  return (
    <div className="relative z-20 h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-500 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          style={{
            backgroundImage: `url(${slide.bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0">
            <div className="mx-40 h-full max-w-7xl px-6">
              <div className="flex h-full items-center">
                <div className="max-w-2xl text-white">
                  <p className="mb-[-20px] font-main text-lg text-[#FFC222]">
                    {slide.tagline}
                  </p>
                  <h1 className="mb-[-1px] whitespace-pre-line font-main text-[90px] font-bold leading-tight">
                    {slide.title}
                  </h1>

                  <MainButton
                    buttonText="Order Now"
                    iconPath="./Icon.png"
                    backColor="bg-secondaryGreen"
                    hoverColor="bg-green-700"
                  ></MainButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 w-3 rounded-full transition-all ${index === currentSlide ? 'w-8 bg-white' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
