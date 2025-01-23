import React from 'react';
import { Link } from 'react-router-dom';

export default function Section1() {
  const categories = [
    {
      name: 'Pro Pizza',
      image: './cat1.png',
      dishes: 12,
      to: 'pizza',
    },
    {
      name: 'Fried Chicken & french fries',
      image: './cat2.png',
      dishes: 14,
      to: 'chickenfries',
    },
    {
      name: 'Desserts',
      image: './cat3.png',
      dishes: 12,
      to: 'desserts',
    },
    {
      name: 'Beverages',
      image: './cat4.png',
      dishes: 12,
      to: 'beverages',
    },
  ];

  return (
    <>
      <div className="mx-auto w-full max-w-7xl bg-[#F9F4F4] px-4 py-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-2 text-4xl font-bold">Choose a Category</h1>
          <div className="mx-auto h-1 w-24 bg-yellow-400"></div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              to={`${category.to}`}
              key={category.name}
              className="group cursor-pointer transition-transform duration-200 hover:-translate-y-2"
            >
              <div className="rounded-lg bg-white p-4 text-center shadow-lg">
                <div className="relative mx-auto h-48 w-48">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full rounded-lg object-cover"
                  />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{category.name}</h3>
                <p className="text-sm text-pink-500">
                  {category.dishes} Dishes in the Menu
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
