import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const PizzaRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen flex bg-pink-50">
      {/* Left Section */}
      <div className="w-1/2 p-8 flex flex-col justify-center items-center">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center gap-2">
          <div className="w-20">
            <img src="./logo2.png" />
          </div>
        </div>

          {/* Registration Form */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">REGISTER</h2>

            {/* Full Name Input */}
            <div className="space-y-2">
              <label className="block text-gray-700">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Badmus Al-Amir"
                  className="w-full px-4 py-3 bg-white rounded-lg pl-10"
                />
                <span className="absolute left-3 top-3.5">👤</span>
              </div>
            </div>

            {/* Username Input */}
            <div className="space-y-2">
              <label className="block text-gray-700">Username</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="badmusdesigns"
                  className="w-full px-4 py-3 bg-white rounded-lg pl-10"
                />
                <span className="absolute left-3 top-3.5">👤</span>
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="block text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="************"
                  className="w-full px-4 py-3 bg-white rounded-lg pl-10 pr-10"
                />
                <span className="absolute left-3 top-3.5">🔒</span>
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div className="space-y-2">
              <label className="block text-gray-700">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="************"
                  className="w-full px-4 py-3 bg-white rounded-lg pl-10 pr-10"
                />
                <span className="absolute left-3 top-3.5">🔒</span>
                <button
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3.5 text-gray-500"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Register Button */}
            <button className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-pink-600 transition-colors">
              Register now
            </button>

            {/* Login Link */}
            <button className="w-full bg-pink-100 text-pink-500 py-3 rounded-lg hover:bg-pink-200 transition-colors">
              Login now
            </button>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 bg-red-500 p-8 flex items-center justify-center">
        <div className="relative w-full max-w-md aspect-square rounded-xl overflow-hidden">
          <img
            src="/login png.png"
            alt="Delicious Pizza"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white p-8">
            <h2 className="text-4xl font-bold text-center mb-4">
              Very good works are waiting for you register Now!!!
            </h2>
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <span className="text-2xl">⚡</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaRegister;