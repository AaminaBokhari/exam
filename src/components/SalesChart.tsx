import React from 'react';

export default function SalesChart() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Sales Overview</h2>
        <select className="text-sm border rounded-lg px-3 py-2">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 3 months</option>
        </select>
      </div>
      <div className="h-[300px] flex items-center justify-center text-gray-500">
        Chart will be implemented with a charting library based on requirements
      </div>
    </div>
  );
}