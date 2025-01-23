import React from 'react';
import { Award, Leaf, Sprout } from 'lucide-react';
import { CheckCircle, Truck, Shield, Phone } from 'lucide-react';

export default function Section2() {
  return (
    <>
      <div
        className=""
        style={{
          backgroundImage: `url('/Rectangle.png')`,
        }}
      >
        <div className="relative mx-auto max-w-6xl px-4">
          <div className="grid gap-12 md:grid-cols-3">
            {/* Premium Quality */}
            <div className="space-y-4 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold">Premium Quality</h3>
              <p className="text-gray-600">
                The quality and safety of our products is our top priority. We
                continue to quest for even greater product quality
              </p>
            </div>

            {/* Always Fresh */}
            <div className="space-y-4 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold">Alway Fresh</h3>
              <p className="text-gray-600">
                Botanica Shop is always committed to 100% fresh, organic food
                has a certificate of food safety certification
              </p>
            </div>

            {/* Organic Farming */}
            <div className="space-y-4 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg">
                <Sprout className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold">Organic Farming</h3>
              <p className="text-gray-600">
                Agricultural system that uses ecologically based pest controls
                and biological fertilizers derived largely from animal
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 px-4 py-16 md:flex-row">
        {/* Left Side - Benefits */}
        <div className="space-y-8 md:w-1/2">
          <div className="flex items-center gap-4 rounded-full bg-white p-4 shadow-lg transition-transform hover:translate-x-2">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <span className="font-semibold">Authenticity Certification</span>
          </div>

          <div className="flex items-center gap-4 rounded-full bg-white p-4 shadow-lg transition-transform hover:translate-x-2">
            <Truck className="h-8 w-8 text-green-600" />
            <span className="font-semibold">Express Delivery</span>
          </div>

          <div className="flex items-center gap-4 rounded-full bg-white p-4 shadow-lg transition-transform hover:translate-x-2">
            <Shield className="h-8 w-8 text-green-600" />
            <span className="font-semibold">Payment Secure</span>
          </div>
        </div>

        {/* Right Side - Image and CTA */}
        <div className="text-center md:w-1/2 md:text-right">
          <img
            src="/Front view male.png"
            alt="Delivery person"
            className="mx-auto mb-8 md:ml-auto"
          />
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">
              Who We Are
              <br />
              What We Do?
            </h2>
            <div className="inline-flex items-center gap-2 rounded-full bg-green-600 px-6 py-3 text-white">
              <Phone className="h-5 w-5" />
              <div>
                <p className="text-sm">How to Order?</p>
                <p className="font-bold">CALL US:+94117777888</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
