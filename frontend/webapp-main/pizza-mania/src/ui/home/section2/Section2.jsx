import React from 'react';
import MainButton from '../../MainButton';

const Section2 = () => {
  return (
    <div className="relative bg-[url('./Section2.png')] bg-cover bg-center py-36">
      {/* Background Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          {/* Text Content */}
          <div className="z-10 font-main text-white">
            <span className="mb-2 block text-xl font-medium">Save 20%</span>
            <h2 className="mb-4 text-6xl font-bold">
              Today`s <span className="text-secondaryGold">Special</span> Day
            </h2>
            <p className="mb-6 text-2xl font-semibold text-gray-200">
              Fried{' '}
              <span className="text-secondaryGold">Chicken And Chips</span> RS
              1500.00
            </p>

            {/* Button Group */}
            <div className="flex space-x-4">
              <MainButton
                buttonText="Order Now"
                iconPath="./Icon.png"
                backColor="bg-secondaryRed"
                hoverColor="bg-secondaryRedShade"
              ></MainButton>
            </div>
          </div>

          {/* Food Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-6">
              {/* Burger Image */}
              <div className="transform cursor-pointer rounded-lg p-4 shadow-lg transition-transform hover:scale-105">
                <img
                  src="./chickenoffer.png"
                  alt="Delicious Burger"
                  className="h-full w-full object-contain"
                />
              </div>

              {/* Fries Image */}
              <div className="transform cursor-pointer rounded-lg p-4 shadow-lg transition-transform hover:scale-105">
                <img
                  src="./frenchoffer.png"
                  alt="Crispy Fries"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section2;
