import { HiOutlineShoppingCart } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function NavBar() {
  const { getTotalItems } = useCart();
  const totalItemCount = getTotalItems();
  return (
    <nav className="fixed top-0 z-50 w-full overflow-hidden bg-white px-6 py-2 font-main shadow-sm drop-shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center gap-2">
          <div className="w-20">
            <img src="./logo2.png" />
          </div>
        </div>

        {/* Navigation Links */}
        <div className="hidden items-center space-x-8 md:flex">
          <Link to="/home" className="text-mainBlack hover:text-secondaryRed">
            Home
          </Link>
          <Link to="/about" className="text-mainBlack hover:text-secondaryRed">
            About Us
          </Link>
          <Link
            to="/category"
            className="text-mainBlack hover:text-secondaryRed"
          >
            Menu
          </Link>
          <Link
            to="/contact"
            className="text-mainBlack hover:text-secondaryRed"
          >
            Contact
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          <div className="relative">
            <Link to="/cart">
              <HiOutlineShoppingCart className="h-6 w-6 text-mainBlack" />
            </Link>

            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-secondaryGreen text-xs text-white">
              {totalItemCount || 0}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
