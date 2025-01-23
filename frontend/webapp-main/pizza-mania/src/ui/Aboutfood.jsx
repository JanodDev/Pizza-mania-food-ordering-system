import { Award, Users,  } from 'lucide-react';
export default function Aboutfood() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Image Section */}
            <div className="relative">
              <img 
                src="/pizza-cheese.png" 
                alt="Delicious Pizza" 
                className="w-full rounded-lg shadow-xl"
              />
              <div className="absolute bottom-4 right-4 bg-yellow-400 text-black px-4 py-2 rounded-full font-semibold">
                Since /2025
              </div>
            </div>
    
            {/* Content Section */}
            <div>
              <span className="text-[#00A149]">About Our Food</span>
              <h2 className="text-4xl font-bold mt-2 mb-6">
                Where Quality Meet Excellent <span className="text-[#00A149]">Service.</span>
              </h2>
              
              <p className="text-gray-600 mb-8">
                Its the perfect dining experience where every dish is crafted with fresh, high-quality Experience quick and efficient service that ensures your food is servead fresh Its the dining experience where every dish is crafted with fresh, high-quality ingredients
              </p>
    
              {/* Features */}
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div className="flex gap-4">
                  <Award className="text-yellow-400 w-12 h-12" />
                  <div>
                    <h3 className="font-bold mb-2">Super Quality Food</h3>
                    <p className="text-sm text-gray-600">A team of dreamers and doers building unique interactive music and art</p>
                  </div>
                </div>
    
                <div className="flex gap-4">
                  <Users className="text-yellow-400 w-12 h-12" />
                  <div>
                    <h3 className="font-bold mb-2">Well Reputation</h3>
                    <p className="text-sm text-gray-600">A team of dreamers and doers building unique interactive music and art</p>
                  </div>
                </div>
              </div>
    
              {/* CTA and Quote */}
              <div className="flex items-center gap-8">
                <button className="bg-[#00A149] text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                  More About Us
                </button>
                <div>
                  <p className="text-yellow-500 font-bold">BRENDON GARREY</p>
                  <p className="text-sm">CUSTOMERS EXPERIENCE IS OUR HIGHEST PRIORITY.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}
