


export default function Footer() {

  

  
  return <div>
    

    <footer className="bg-gray-50 py-12 relative">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Business Info */}
        <div className="bg-red-500 text-white p-8 rounded-2xl">
          <h2 className="text-2xl font-bold italic mb-2">pizza Mania</h2>
          <p className="text-sm mb-4">FOOD & RESTAURANT</p>
          
          <div className="space-y-2 mb-6">
            <p>Tuesday - Saturday: 10:00am - 23:00pm</p>
            <p className="underline">Closed on Sunday</p>
          </div>
          
          <p className="text-sm">5 star rated on TripAdvisor</p>
        </div>

        {/* Menu Links */}
        <div>
          <h2 className="text-xl font-bold mb-6 relative inline-block">
            Menu
            <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400"></span>
          </h2>
          <ul className="space-y-4">
            <li>
              <a href="#" className="hover:text-red-500 flex items-center gap-2">
                <span>›</span> Pro Pizza
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500 flex items-center gap-2">
                <span>›</span> Chicken
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500 flex items-center gap-2">
                <span>›</span> Desserts
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500 flex items-center gap-2">
                <span>›</span> Beverages
              </a>
            </li>
          </ul>
        </div>

        {/* Review Form */}
        <div>
          <h2 className="text-xl font-bold mb-6 relative inline-block">
            Write here
            <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400"></span>
          </h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Your review</label>
              <input
                type="text"
                placeholder="Good Service"
                className="w-full p-4 border rounded-lg"
              />
            </div>
            <button className="bg-red-500 text-white px-8 py-2 rounded-full hover:bg-red-600">
              Send
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t">
        <div className="flex justify-between items-center">
          <p>© 2025 pizza Mania</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-red-500">Facebook</a>
            <a href="#" className="hover:text-red-500">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  
    
  </div>;
}
