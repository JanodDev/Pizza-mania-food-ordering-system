import React from 'react';
import { CheckCircle } from 'lucide-react';

const PaymentSuccess = ({ total, orderId = Math.random().toString(36).substring(7).toUpperCase() }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-4">Your order has been confirmed</p>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Order ID</span>
            <span className="font-medium">{orderId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Amount Paid</span>
            <span className="font-medium">Rs {total}</span>
          </div>
        </div>

        <button 
          onClick={() => window.location.href = '/'}
          className="w-full bg-rose-500 text-white py-3 rounded-lg hover:bg-rose-600 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;