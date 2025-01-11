import React from 'react';
import { Users, ShoppingCart, DollarSign, Package } from 'lucide-react';
import DashboardCard from '../components/DashboardCard';
import SalesChart from '../components/SalesChart';

const stats = {
  totalUsers: 1234,
  totalOrders: 789,
  totalSales: 52495,
  pendingOrders: 23,
};

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <DashboardCard
          title="Total Users"
          value={stats.totalUsers}
          icon={Users}
          trend={{ value: 12, isPositive: true }}
        />
        <DashboardCard
          title="Total Orders"
          value={stats.totalOrders}
          icon={ShoppingCart}
          trend={{ value: 8, isPositive: true }}
        />
        <DashboardCard
          title="Total Sales"
          value={`$${stats.totalSales.toLocaleString()}`}
          icon={DollarSign}
          trend={{ value: 15, isPositive: true }}
        />
        <DashboardCard
          title="Pending Orders"
          value={stats.pendingOrders}
          icon={Package}
          trend={{ value: 3, isPositive: false }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesChart />
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
          <div className="space-y-4">
            {/* Recent orders will be mapped here */}
            <div className="animate-pulse">
              <div className="h-12 bg-gray-200 rounded mb-3"></div>
              <div className="h-12 bg-gray-200 rounded mb-3"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}