import React from 'react';

const PromotionBanners = () => {
  return (
    <div className="mx-auto max-w-4xl px-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* First Promo Banner - Take 1 column */}
        <div className="relative cursor-pointer overflow-hidden rounded-2xl shadow-lg transition-transform hover:scale-105 md:col-span-1">
          <img
            src="./chickenpromo.png"
            alt="Super Delicious Chicken"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Second Promo Banner - Take 2 columns */}
        <div className="relative cursor-pointer overflow-hidden rounded-2xl shadow-lg transition-transform hover:scale-105 md:col-span-2">
          <img
            src="./pizzapromo.png"
            alt="Super Delicious Pizza"
            className="w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default PromotionBanners;
