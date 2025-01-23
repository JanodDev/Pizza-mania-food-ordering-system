import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useGetOrder from './useGetOrder';
import useMarkDelivered from './useMarkDelivered';

export type OrderDetailsProps = {
  order: {
    _id: string;
    customer: {
      name: string;
      email: string;
      address: string;
      city: string;
      postalCode: string;
      phone: string;
    };
    items: Array<{
      productId: string;
      name: string;
      quantity: number;
      price: number;
    }>;
    totalAmount: number;
    status: 'pending' | 'paid' | 'delivered';
    createdAt: string;
  };
};

const OrderDetailsView = () => {
  const navigate = useNavigate();
  const { isLoading, orderData, error } = useGetOrder();
  const { markOrderDelivered, isMarking } = useMarkDelivered();
  // Using the dummy order data
  const order = orderData;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'paid':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const handleDispatch = () => {
    // Add dispatch logic here
    markOrderDelivered(order._id);
    console.log('Dispatching order:', order._id);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto max-w-4xl p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to Orders
      </button>

      <Card>
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">Order Details</CardTitle>
            <Badge
              className={`${getStatusColor(order.status)} px-3 py-1 capitalize`}
            >
              {order.status}
            </Badge>
          </div>
          <div className="text-sm text-gray-500">Order ID: {order._id}</div>
          <div className="text-sm text-gray-500">
            Date: {new Date(order.createdAt).toLocaleString()}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Customer Information */}
            <div>
              <h3 className="mb-2 text-lg font-semibold">
                Customer Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Name</div>
                  <div>{order.customer.name}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <div>{order.customer.email}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Phone</div>
                  <div>{order.customer.phone}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Address</div>
                  <div>{`${order.customer.address}, ${order.customer.city}, ${order.customer.postalCode}`}</div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Order Items */}
            <div>
              <h3 className="mb-2 text-lg font-semibold">Order Items</h3>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </div>
                    </div>
                    <div className="text-right">
                      <div>{formatCurrency(item.price)}</div>
                      <div className="text-sm text-gray-500">
                        {formatCurrency(item.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Order Summary */}
            <div>
              <h3 className="mb-2 text-lg font-semibold">Order Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <div className="font-medium">Total Amount</div>
                  <div className="font-semibold">
                    {formatCurrency(order.totalAmount)}
                  </div>
                </div>
              </div>
            </div>

            {/* Dispatch Button */}
            <div className="flex justify-end pt-4">
              <Button
                disabled={isMarking || order.status === 'delivered'}
                onClick={handleDispatch}
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                {order.status === 'delivered'
                  ? 'Already Dispatched'
                  : 'Dispatch Order'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderDetailsView;
