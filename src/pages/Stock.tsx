import React, { useState, useEffect } from 'react';
import { Package, AlertTriangle, RefreshCw } from 'lucide-react';
import { getProducts } from '../lib/api';
import type { Product } from '../types';

export default function Stock() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data.products);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStock = (productId: number, newStock: number) => {
    setProducts(products.map(product =>
      product.id === productId ? { ...product, stock: newStock } : product
    ));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Product Stock</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          [...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse bg-white p-6 rounded-xl shadow-sm">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))
        ) : (
          products.map((product) => (
            <div key={product.id} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-medium">{product.title}</h3>
                  <p className="text-sm text-gray-600">{product.brand}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-gray-400" />
                  <span className="font-medium">{product.stock} units</span>
                </div>
                {product.stock < 10 && (
                  <span className="flex items-center gap-1 text-sm text-amber-600">
                    <AlertTriangle className="w-4 h-4" />
                    Low Stock
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => updateStock(product.id, product.stock + 10)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Restock
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}