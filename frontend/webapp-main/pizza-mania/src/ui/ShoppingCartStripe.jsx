import React, { useState } from 'react';
import { Trash2, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { API_URL } from '../services/pizzaManiaAPI';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(
  'pk_test_51QgJyFCIYew122LAAPvwqHmUX87wPVxKpjoxlARvzO2yq641XuS8uDOcMaXEL4vqq1KaHaEfKY8nOp4tyus1hV0F00CToXwEMt',
);

const CheckoutForm = ({ total, handleSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      return;
    }

    try {
      // Create payment intent on your server
      const response = await fetch(
        `${API_URL}/payments/create-payment-intent`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount: total }),
        },
      );

      const data = await response.json();

      // Confirm the payment with Stripe.js
      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(data.clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        });

      if (stripeError) {
        setError(stripeError.message);
      } else if (paymentIntent.status === 'succeeded') {
        handleSuccess();
      }
    } catch (err) {
      setError('An error occurred while processing your payment.');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: 'white',
                '::placeholder': {
                  color: 'rgba(255, 255, 255, 0.7)',
                },
              },
            },
          }}
          className="w-full rounded bg-rose-400 p-3"
        />
      </div>
      {error && <div className="mb-4 text-white/90">{error}</div>}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="mt-6 w-full rounded-lg bg-rose-600 py-3 text-white transition-colors hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? 'Processing...' : 'Pay Now →'}
      </button>
    </form>
  );
};

const ShoppingCart = () => {
  const {
    cart,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    total: subtotal,
    getTotalItems,
  } = useCart();

  const deliveryFee = 200;
  const total = subtotal + deliveryFee;

  const handlePaymentSuccess = () => {
    alert('Payment successful! Thank you for your order.');
    // Add your post-payment logic here (clear cart, redirect, etc.)
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
        {/* Cart Items section - Keep your existing cart items code */}
        <div className="flex-1">
          {/* ... Your existing cart items code ... */}
        </div>

        {/* Payment Details */}
        <div className="lg:w-96">
          <div className="rounded-lg bg-rose-500 p-6 text-white">
            <h2 className="mb-6 text-xl font-semibold">Payment Details</h2>

            <Elements stripe={stripePromise}>
              <CheckoutForm
                total={total}
                handleSuccess={handlePaymentSuccess}
              />
            </Elements>

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
