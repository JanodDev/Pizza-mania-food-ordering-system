import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, ShoppingCart, Clock, DollarSign } from 'lucide-react';
import useOrders from '../orders/useGetOrders';

const Dashboard = () => {
  const { isLoading, data: orders, error } = useOrders();

  // Process orders data for metrics and charts
  const { metrics, popularItems, revenueData } = useMemo(() => {
    if (!orders || orders.length === 0) {
      return {
        metrics: {
          totalRevenue: 0,
          totalOrders: 0,
          pendingOrders: 0,
          averageOrderValue: 0,
        },
        popularItems: [],
        revenueData: [],
      };
    }

    // Calculate basic metrics
    const totalRevenue = orders.reduce(
      (sum, order) => sum + order.totalAmount,
      0,
    );
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(
      (order) => order.status === 'pending',
    ).length;
    const averageOrderValue = totalRevenue / totalOrders;

    // Process items for popularity chart
    const itemCounts = {};
    const itemRevenue = {};

    orders.forEach((order) => {
      order.items.forEach((item) => {
        const itemName = item.name;
        itemCounts[itemName] = (itemCounts[itemName] || 0) + item.quantity;
        itemRevenue[itemName] =
          (itemRevenue[itemName] || 0) + item.price * item.quantity;
      });
    });

    const popularItems = Object.entries(itemCounts)
      .map(([name, orders]) => ({
        name,
        orders,
        revenue: itemRevenue[name],
      }))
      .sort((a, b) => b.orders - a.orders)
      .slice(0, 5);

    // Process revenue data by date
    const revenueByDate = orders.reduce((acc, order) => {
      const date = new Date(order.createdAt).toLocaleDateString();
      acc[date] = (acc[date] || 0) + order.totalAmount;
      return acc;
    }, {});

    const revenueData = Object.entries(revenueByDate)
      .map(([date, amount]) => ({
        date,
        amount,
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    return {
      metrics: {
        totalRevenue,
        totalOrders,
        pendingOrders,
        averageOrderValue,
      },
      popularItems,
      revenueData,
    };
  }, [orders]);

  if (isLoading) {
    return <div className="p-4">Loading dashboard data...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error loading dashboard data</div>;
  }

  return (
    <div className="space-y-4 p-4">
      <h2 className="mb-6 text-center text-3xl font-bold">Dashboard</h2>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              LKR {metrics.totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Total revenue from all orders
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              Number of orders placed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Orders
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.pendingOrders}</div>
            <p className="text-xs text-muted-foreground">
              Orders awaiting processing
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Average Order Value
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              LKR {Math.round(metrics.averageOrderValue).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Average value per order
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Popular Items Chart */}
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Popular Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={popularItems}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  formatter={(value, name) => [
                    name === 'orders'
                      ? `${value} orders`
                      : `LKR ${value.toLocaleString()}`,
                    name === 'orders' ? 'Orders' : 'Revenue',
                  ]}
                />
                <Bar dataKey="orders" fill="#adfa1d" />
                <Bar dataKey="revenue" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Trend Chart */}
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Revenue Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip
                  formatter={(value) => [
                    `LKR ${value.toLocaleString()}`,
                    'Revenue',
                  ]}
                />
                <Bar dataKey="amount" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
