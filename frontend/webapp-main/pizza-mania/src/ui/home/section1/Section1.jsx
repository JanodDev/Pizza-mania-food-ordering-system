import React from 'react';
import CardStyle1 from '../../CardStyle1';
import PromotionBanners from '../../PromotionBanners';

const Section1 = () => {
  const foodItems = [
    { name: 'Pro Pizza', count: '10', image: './pizza.jpg' },
    {
      name: 'Chicken & French Fries',
      count: '20',
      image: './chicken.png',
    },
    { name: 'Desserts', count: '12', image: './desserts.png' },
    { name: 'Beverage', count: '40', image: './beverages.png' },
  ];

  return (
    <div className="relative bg-[url('./sectionbackground.png')] bg-cover py-16">
      {/* Decorative Leaf */}
      <div className="absolute right-[0px] top-[-70px] z-10 h-64 w-64">
        <img
          src="/leaf.png"
          alt="Decorative leaf"
          className="h-full w-full object-contain"
        />
      </div>

      {/* Content Container */}
      <div className="relative mx-auto max-w-5xl px-6">
        {/* Section Header */}
        <div className="mb-8">
          <span className="font-main text-sm font-medium text-secondaryGreen">
            Crispy, Every Bite Tasty
          </span>
          <h2 className="mt-2 font-main text-3xl font-bold text-mainBlack">
            Popular Food Items
          </h2>
        </div>

        {/* Food Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {foodItems.map((item, index) => (
            <CardStyle1 item={item} key={index}></CardStyle1>
          ))}
        </div>
      </div>

      {/* Include the PromoFSec component */}
      <div className="mt-16">
        <PromotionBanners />
      </div>
    </div>
  );
};

export default Section1;
