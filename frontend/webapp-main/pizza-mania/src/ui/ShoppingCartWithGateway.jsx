import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { API_URL } from '../services/pizzaManiaAPI';

const ShoppingCart = () => {
  const {
    cart,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    total: subtotal,
    getTotalItems,
    clearCart,
  } = useCart();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
  });

  const deliveryFee = 200;
  const total = subtotal + deliveryFee;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    // Generate a unique order ID
    const orderId =
      'ORDER_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

    // PayHere payment configuration
    const payment = {
      sandbox: true, // Set to false in production
      merchant_id: '1229298', // Replace with your Merchant ID
      return_url: 'http://localhost:3000/',
      cancel_url: 'http://localhost:3000/cart',
      // notify_url: 'http://localhost:3000/api/payhere/notify',
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      country: 'Sri Lanka',
      order_id: orderId,
      items: 'Pizza Prices',
      currency: 'LKR',
      amount: total,
    };

    try {
      // Get hash from server
      const hashResponse = await fetch(`${API_URL}/payhere/generate-hash`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          merchant_id: payment.merchant_id,
          order_id: payment.order_id,
          amount: payment.amount,
          currency: payment.currency,
        }),
      });

      const { hash } = await hashResponse.json();

      console.log(hash);

      // Add hash to payment object
      payment.hash = hash;

      // Create form and submit to PayHere
      const form = document.createElement('form');
      form.setAttribute('method', 'post');
      form.setAttribute('action', 'https://sandbox.payhere.lk/pay/checkout');

      // Add fields to form
      Object.entries(payment).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (error) {}
  };

  return (
    <div className="mt-24 min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Cart Items section */}
        <div className="flex-1">
          <h2 className="mb-2 text-xl font-semibold">Shopping cart</h2>
          <p className="mb-4 text-gray-600">
            You have {getTotalItems()} item{getTotalItems() !== 1 ? 's' : ''} in
            your cart
          </p>

          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center rounded-lg bg-white p-4 shadow-sm"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-20 w-20 rounded-lg object-cover"
                />
                <div className="ml-4 flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center rounded-md border">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="px-3 py-1 transition-colors hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="border-x px-3 py-1">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="px-3 py-1 transition-colors hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-medium">
                      Rs {item.price * item.quantity}
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 transition-colors hover:text-gray-600"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {cart.length === 0 && (
              <div className="py-8 text-center text-gray-500">
                Your cart is empty
              </div>
            )}
          </div>
        </div>

        {/* Checkout Form */}
        <div className="lg:w-96">
          <div className="rounded-lg bg-rose-500 p-6 text-white">
            <h2 className="mb-6 text-xl font-semibold">Checkout Details</h2>

            <form onSubmit={handleCheckout} className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="mb-2 block text-sm">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded bg-rose-400 p-2 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>
                <div className="flex-1">
                  <label className="mb-2 block text-sm">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded bg-rose-400 p-2 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded bg-rose-400 p-2 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded bg-rose-400 p-2 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded bg-rose-400 p-2 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded bg-rose-400 p-2 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>

              <div className="mt-6 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>Rs {subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery fee</span>
                  <span>Rs {deliveryFee}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Total (Tax incl.)</span>
                  <span>Rs {total}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={cart.length === 0}
                className="mt-6 w-full rounded-lg bg-rose-600 py-3 text-white transition-colors hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Proceed to Payment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
