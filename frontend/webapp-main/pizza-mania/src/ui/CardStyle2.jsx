import { Heart } from 'lucide-react';
const CardStyle2 = ({ title, price, originalPrice, isPopular, imageUrl }) => (
  <div className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg">
    <div className="absolute left-2 top-2 z-10">
      <button className="rounded-lg bg-white p-2 shadow-sm transition-colors hover:bg-gray-50">
        <Heart className="h-5 w-5 text-gray-600" />
      </button>
    </div>

    <div className="">
      <div className="pb-15 relative aspect-square w-full rounded-md bg-white p-12">
        <img
          src={imageUrl || './delicious-burger.png'}
          alt={title}
          className="w-full object-cover"
        />
        {isPopular && (
          <div className="absolute bottom-0 right-0 z-20">
            <img src={'./badge.png'} alt="Popular badge" className="w-20" />
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center justify-center gap-2">
          {originalPrice && (
            <div>
              <span className="mx-2 rounded-md bg-secondaryGold p-1 text-center text-sm text-mainBlack">
                -25%
              </span>
              <span className="text-center text-sm text-gray-400 line-through">
                Rs {originalPrice}
              </span>
            </div>
          )}
          <span className="text-center text-sm font-bold text-gray-400">
            Rs {price}
          </span>
        </div>
        <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      </div>
    </div>
  </div>
);

export default CardStyle2;
