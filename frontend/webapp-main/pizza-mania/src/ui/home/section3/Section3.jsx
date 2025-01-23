import React from 'react';
import CardStyle2 from '../../CardStyle2';

const Section3 = () => {
  const menuItems = [
    {
      title: 'Fried Chicken With French Fries',
      price: 750,
      originalPrice: 1000,
      isPopular: true,
      imageUrl: './delicious-burger.png',
    },
    {
      title: 'Buffalo Wings',
      price: 650,
      isPopular: true,
      imageUrl: './grilled-2.png',
    },
    {
      title: 'Cheese Pizza',
      price: 850,
      isPopular: true,
      originalPrice: 900,
      imageUrl: './ruti.png',
    },
    {
      title: 'Garlic French Fries',
      price: 450,
      isPopular: false,
      imageUrl: './main-food-2.png',
    },
    {
      title: 'Buffalo Wings',
      price: 650,
      isPopular: false,
      imageUrl: './ruti.png',
    },
    {
      title: 'Cheese Pizza',
      price: 850,
      isPopular: true,
      imageUrl: './main-food-2.png',
    },
    {
      title: 'Garlic French Fries',
      price: 450,
      isPopular: true,
      imageUrl: './beef-ruti.png',
    },
    {
      title: 'Garlic French Fries',
      price: 450,
      isPopular: false,
      imageUrl: './main-food-2.png',
    },
  ];

  return (
    <div className="bg-[#F8E9E9] text-center font-main">
      <div className="mx-auto max-w-5xl px-6 py-8">
        <div className="mb-8">
          <span className="text-sm font-medium text-secondaryGreen">
            Crispy, Every Bite Tasty
          </span>
          <h2 className="mt-2 text-3xl font-bold text-mainBlack">
            Popular Food Items
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {menuItems.map((item, index) => (
            <CardStyle2 key={index} {...item}></CardStyle2>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Section3;
