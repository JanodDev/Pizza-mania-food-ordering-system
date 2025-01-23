import React from 'react';
import { Phone, Utensils } from 'lucide-react';

export default function section1() {
  return (
    <>
      <div
        className="relative min-h-screen bg-black bg-cover bg-center"
        style={{
          backgroundImage: `url('/aboutus.png')`,
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* Content */}
        <div className="relative mx-auto max-w-4xl px-4 py-16">
          <h1 className="mb-12 text-7xl font-bold text-white/90">About Us</h1>

          <div className="space-y-6 text-white">
            <h2 className="mb-6 text-3xl font-bold">Welcome to Pizza Mania!</h2>

            <p className="text-lg">
              At Pizza Mania, We're passionate about serving up the ultimate
              comfort food experience. From our freshly baked pizzas with
              mouthwatering toppings to our crispy, golden fried chicken and
              perfectly seasoned fries, we've got something to satisfy every
              craving.
            </p>

            <p className="text-lg">
              Whether you're a fan of classic flavors or love to try bold new
              combinations, Pizza Mania is your go-to destination for delicious,
              high-quality meals made with care.
            </p>

            <p className="text-lg">
              Our easy-to-use web app makes ordering a breeze, so you can enjoy
              your favorites at home, at work, or wherever hunger strikes.
            </p>

            <p className="mt-8 text-xl font-semibold">
              Treat yourself to a feast of flavors at Pizza Mania—because every
              bite should be a celebration!
            </p>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-16 text-center">
          <p className="mb-4 font-semibold text-red-500">
            ABOUT THE FOOD RESTAURANT
          </p>
          <h1 className="text-4xl font-bold md:text-5xl">
            Perfect Place For An Exceptional
            <br />
            Experience
          </h1>
        </div>

        <div className="grid items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Left Image */}
          <div className="aspect-square overflow-hidden rounded-full">
            <img
              src="/cook.png"
              alt="Chef preparing food"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Center Image */}
          <div className="aspect-square overflow-hidden rounded-full">
            <img
              src="/phone.png/"
              alt="Food ordering app"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Features Section */}
          <div className="space-y-8">
            <p className="text-gray-600">
              Nisl quam nestibulum ac quam nec odio elementu sceisue the aucan
              ligula. Orci varius natoque pena culus mus nellentesque ha um ac
              quam nec odio elbrine.
            </p>

            <div className="space-y-6">
              {/* Online Ordering Feature */}
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-yellow-100 p-4">
                  <Phone className="h-6 w-6 text-yellow-500" />
                </div>
                <div>
                  <h3 className="mb-1 font-bold">Online Food Ordering</h3>
                  <p className="text-gray-600">
                    Easy Food delivery from the best restaurants.
                  </p>
                </div>
              </div>

              {/* Healthy Food Feature */}
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-yellow-100 p-4">
                  <Utensils className="h-6 w-6 text-yellow-500" />
                </div>
                <div>
                  <h3 className="mb-1 font-bold">100% Healthy Food</h3>
                  <p className="text-gray-600">
                    Eating a wide variety of nutritious Healthy foods
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
