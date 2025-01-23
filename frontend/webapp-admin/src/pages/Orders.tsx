import { OrdersDataTable } from '@/features/orders/OrdersDataTable';
import React from 'react';

export default function Orders() {
  return (
    <div className="m-4">
      <h2 className="mb-6 text-center text-3xl font-bold">Orders</h2>
      <OrdersDataTable></OrdersDataTable>
    </div>
  );
}
