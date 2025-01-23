import React from 'react';

export default function CardStyle1({ item }) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex flex-col items-center">
        <img
          src={item.image}
          alt={item.name}
          className="mb-4 h-32 w-32 object-cover"
        />
        <h3 className="mb-2 font-main text-lg font-semibold text-mainBlack">
          {item.name}
        </h3>
        <span className="border-t-2 border-secondaryGold font-main font-medium text-secondaryGold">
          {item.count} Products
        </span>
      </div>
    </div>
  );
}
