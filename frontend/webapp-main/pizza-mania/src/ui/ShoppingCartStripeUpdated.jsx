import React, { useEffect, useState } from 'react';
import { Trash2, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { loadStripe } from '@stripe/stripe-js';
import { useSocket } from '../hooks/useSocket';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { API_URL } from '../services/pizzaManiaAPI';

const stripePromise = loadStripe(
  'pk_test_51QgJyFCIYew122LAAPvwqHmUX87wPVxKpjoxlARvzO2yq641XuS8uDOcMaXEL4vqq1KaHaEfKY8nOp4tyus1hV0F00CToXwEMt',
);

// Add this import at the top
const CheckoutForm = ({ total, cartItems, handleSuccess }) => {
  const socket = useSocket(); // Add socket hook

  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      return;
    }

    try {
      // Create payment intent and save order details
      const response = await fetch(
        `${API_URL}/payments/create-payment-intent`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: total,
            orderDetails: {
              ...orderDetails,
              items: cartItems,
              totalAmount: total,
            },
          }),
        },
      );

      const data = await response.json();

      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(data.clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: orderDetails.name,
              email: orderDetails.email,
              address: {
                line1: orderDetails.address,
                city: orderDetails.city,
                postal_code: orderDetails.postalCode,
              },
            },
          },
        });

      if (stripeError) {
        setError(stripeError.message);
      } else if (paymentIntent.status === 'succeeded') {
        // Emit new order event via socket

        const orderData = {
          _id: data.orderId,
          customer: {
            name: orderDetails.name,
            email: orderDetails.email,
            address: orderDetails.address,
            city: orderDetails.city,
            postalCode: orderDetails.postalCode,
            phone: orderDetails.phone,
          },
          items: cartItems.map((item) => ({
            productId: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
          totalAmount: total,
          status: 'pending',
          createdAt: new Date().toISOString(),
        };

        socket?.emit('new-order', orderData);

        // Listen for status updates for this specific order
        socket?.on(`order-status-${data.orderId}`, ({ status }) => {
          // You could show a notification or update UI with the new status
          console.log(`Order status updated: ${status}`);
          // Optionally update some state to show the status
        });

        handleSuccess(data.orderId); // Pass the order ID from backend
      }
    } catch (err) {
      setError('An error occurred while processing your payment.');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Shipping Details */}
      <div>
        <label className="mb-2 block text-sm">Full Name</label>
        <input
          type="text"
          name="name"
          value={orderDetails.name}
          onChange={handleInputChange}
          required
          className="w-full rounded bg-rose-400 p-2 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm">Email</label>
        <input
          type="email"
          name="email"
          value={orderDetails.email}
          onChange={handleInputChange}
          required
          className="w-full rounded bg-rose-400 p-2 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm">Address</label>
        <input
          type="text"
          name="address"
          value={orderDetails.address}
          onChange={handleInputChange}
          required
          className="w-full rounded bg-rose-400 p-2 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="mb-2 block text-sm">City</label>
          <input
            type="text"
            name="city"
            value={orderDetails.city}
            onChange={handleInputChange}
            required
            className="w-full rounded bg-rose-400 p-2 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
        </div>
        <div className="flex-1">
          <label className="mb-2 block text-sm">Postal Code</label>
          <input
            type="text"
            name="postalCode"
            value={orderDetails.postalCode}
            onChange={handleInputChange}
            required
            className="w-full rounded bg-rose-400 p-2 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm">Phone</label>
        <input
          type="tel"
          name="phone"
          value={orderDetails.phone}
          onChange={handleInputChange}
          required
          className="w-full rounded bg-rose-400 p-2 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
        />
      </div>

      {/* Card Element */}
      <div>
        <label className="mb-2 block text-sm">Card Details</label>
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

      {error && <div className="text-white/90">{error}</div>}

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
  const [orderStatus, setOrderStatus] = useState(null);
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const socket = useSocket();

  const {
    cart,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    total: subtotal,
    getTotalItems,
    clearCart,
  } = useCart();

  const deliveryFee = 200;
  const total = subtotal + deliveryFee;

  const handlePaymentSuccess = (orderId) => {
    setCurrentOrderId(orderId);

    // Listen for status updates
    socket?.on(`order-status-${orderId}`, ({ status }) => {
      setOrderStatus(status);
      // You could show a notification here
      if (status === 'Delivered') {
        // Handle delivery completion
        clearCart();
      }
    });
    alert(
      `Order #${orderId} placed successfully! Thank you for your purchase.`,
    );
    clearCart();
    // You can add navigation to an order confirmation page here
  };

  useEffect(() => {
    return () => {
      if (socket && currentOrderId) {
        socket.off(`order-status-${currentOrderId}`);
      }
    };
  }, [socket, currentOrderId]);

  return (
    <div className="mt-24 min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Your existing cart layout */}
      {orderStatus && (
        <div className="mb-4 rounded-lg bg-green-100 p-4 text-green-700">
          Order Status: {orderStatus}
        </div>
      )}
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Cart Items section - Your existing code */}
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
            <h2 className="mb-6 text-xl font-semibold">Checkout</h2>

            <Elements stripe={stripePromise}>
              <CheckoutForm
                total={total}
                cartItems={cart}
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
