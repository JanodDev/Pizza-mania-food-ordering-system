import React, { useState } from 'react';
import { Trash2, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ShoppingCart = () => {
  const {
    cart,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    total: subtotal,
    getTotalItems,
  } = useCart();

  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expDate: '',
    cvv: '',
  });

  const [selectedCardType, setSelectedCardType] = useState('mastercard');

  const cardTypes = [
    { id: 'mastercard', name: 'Mastercard', image: '/master.png' },
    { id: 'visa', name: 'Visa', image: '/visa.png' },
    { id: 'applepay', name: 'Apple Pay', image: '/ApplePay.png' },
  ];

  const deliveryFee = 200;
  const total = subtotal + deliveryFee;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckout = () => {
    if (
      !formData.cardName ||
      !formData.cardNumber ||
      !formData.expDate ||
      !formData.cvv
    ) {
      alert('Please fill in all card details');
      return;
    }
    alert(
      `Order placed! Total: Rs ${total}\nPayment Method: ${selectedCardType}`,
    );
  };

  return (
    <div className="mt-24 min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Shopping Continue button */}
      <div className="mb-4">
        <button className="flex items-center text-gray-700">
          <svg
            className="mr-2 h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Shopping Continue
        </button>
      </div>

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

        {/* Payment Details */}
        <div className="lg:w-96">
          <div className="rounded-lg bg-rose-500 p-6 text-white">
            <h2 className="mb-6 text-xl font-semibold">Card Details</h2>

            {/* Card type selection */}
            <div className="mb-4 flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <div className="flex gap-2">
                {cardTypes.map((card) => (
                  <button
                    key={card.id}
                    onClick={() => setSelectedCardType(card.id)}
                    className={`rounded bg-white p-1.5 transition-all ${
                      selectedCardType === card.id
                        ? 'ring-2 ring-white'
                        : 'opacity-60 hover:opacity-80'
                    }`}
                  >
                    <img
                      src={card.image}
                      alt={card.name}
                      className="h-5 w-auto"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm">Name on card</label>
                <input
                  type="text"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  placeholder="Name"
                  className="w-full rounded bg-rose-400 p-2 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm">Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1111 2222 3333 4444"
                  maxLength="19"
                  className="w-full rounded bg-rose-400 p-2 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="mb-2 block text-sm">Expiration date</label>
                  <input
                    type="text"
                    name="expDate"
                    value={formData.expDate}
                    onChange={handleInputChange}
                    placeholder="mm/yy"
                    maxLength="5"
                    className="w-full rounded bg-rose-400 p-2 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>
                <div className="flex-1">
                  <label className="mb-2 block text-sm">CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    maxLength="3"
                    className="w-full rounded bg-rose-400 p-2 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>
              </div>
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
              onClick={handleCheckout}
              disabled={cart.length === 0}
              className="mt-6 w-full rounded-lg bg-rose-600 py-3 text-white transition-colors hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Checkout →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
