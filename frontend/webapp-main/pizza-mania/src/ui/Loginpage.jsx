import React from 'react';

const PizzaLogin = () => {
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

          {/* Login Form */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">LOGIN</h2>
            <p className="text-gray-600">How to i get started lorem ipsum dolor at?</p>

            {/* Username Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Username"
                className="w-full px-4 py-3 bg-white rounded-lg pl-10"
              />
              <span className="absolute left-3 top-3.5">👤</span>
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 bg-white rounded-lg pl-10"
              />
              <span className="absolute left-3 top-3.5">🔒</span>
            </div>

            {/* Login Button */}
            <button className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-pink-600 transition-colors">
              Login Now
            </button>

            {/* Other Login Options */}
            <div className="mt-6">
              <p className="text-center text-gray-600 mb-4">Login with Others</p>
              
              {/* Google Login */}
              <button className="w-full mb-3 bg-white text-gray-700 py-3 rounded-lg flex items-center justify-center border hover:bg-gray-50">
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5 mr-2" />
                Login with google
              </button>

              {/* Facebook Login */}
              <button className="w-full bg-white text-gray-700 py-3 rounded-lg flex items-center justify-center border hover:bg-gray-50">
                <img src="https://www.facebook.com/favicon.ico" alt="Facebook" className="w-5 h-5 mr-2" />
                Login with Facebook
              </button>
            </div>

            {/* Register Link */}
            <div className="text-center mt-6">
              <p className="text-gray-600">Don't have an account?</p>
              <a href="#" className="text-gray-900 font-semibold">Register now</a>
            </div>
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
              Very good works are waiting for you Login Now!!
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

export default PizzaLogin;