

import { Truck } from 'lucide-react';

export default function Dilivery() 
{return (
  <div className="bg-[#F8385D] min-h-[400px]">
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
        {/* Text Content */}
        <div>
          <span className="text-yellow-400">Crispy, Every Bite Taste</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            30 Minutes Fast
            <br />
            <span className="text-yellow-400">Delivery</span> Challenge
          </h2>
          <button className="bg-white text-[#00A149] px-8 py-3 rounded-full flex items-center gap-2 hover:bg-gray-100 transition-colors">
            <Truck size={20} />
            <span>Order Now</span>
          </button>
        </div>
        
        {/* Image */}
        <div className="flex justify-end">
          <img 
            src="/delivery-man.png" 
            alt="Delivery Person" 
            className="w-auto h-[300px] md:h-[400px] object-contain"
          />
        </div>
      </div>
    </div>
  </div>
);

}
