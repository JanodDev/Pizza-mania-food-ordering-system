import React from 'react';
import { Instagram, Facebook, Phone } from 'lucide-react';

const ContactSection = () => {
  return (
    <div className="relative min-h-screen">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="/contactus.png"
          alt="Restaurant Interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 min-h-screen flex flex-col items-center justify-center text-center text-white">
        {/* Welcome Text */}
        <h2 className="text-2xl font-semibold mb-4">HELLO, NEW FRIEND</h2>
        
        {/* Description */}
        <p className="max-w-2xl mx-auto text-lg mb-12 leading-relaxed">
          At Pizza Mania, we're passionate about serving you the freshest and 
          most delicious pizzas, made with love and the finest ingredients. 
          Whether you're craving a delicious classic or a loaded meat feast, we've 
          got something for everyone!
        </p>

        {/* Contact Us Title */}
        <h1 className="text-5xl font-bold mb-8">CONTACT US</h1>

        {/* Phone Number */}
        <div className="text-2xl font-semibold mb-12">
          +94 111 111 111
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-6">
          <a 
            href="#" 
            className="w-12 h-12 rounded-full bg-pink-600 flex items-center justify-center hover:bg-pink-700 transition-colors"
          >
            <Instagram className="w-6 h-6" />
          </a>
          <a 
            href="#" 
            className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition-colors"
          >
            <Facebook className="w-6 h-6" />
          </a>
          <a 
            href="#" 
            className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center hover:bg-green-700 transition-colors"
          >
            <Phone className="w-6 h-6" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;