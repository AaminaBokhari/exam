import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function DashboardDeals() {
  const { products } = useApp();
  const navigate = useNavigate();

  const topDeals = products
    .filter(product => product.stock > 0)
    .sort((a, b) => b.price - a.price)
    .slice(0, 5);

  const handleProductClick = (productId: number) => {
    navigate(`/products?selected=${productId}`);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Top Deals</h2>
      <div className="space-y-4">
        {topDeals.map((product) => (
          <div
            key={product.id}
            onClick={() => handleProductClick(product.id)}
            className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-12 h-12 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-medium">{product.title}</h3>
              <p className="text-sm text-gray-600">{product.brand}</p>
            </div>
            <div className="text-right">
              <p className="font-medium">${product.price}</p>
              <p className="text-sm text-gray-600">{product.stock} in stock</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}