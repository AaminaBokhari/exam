import React, { createContext, useContext, useState, useEffect } from 'react';
import { getProducts, getUsers } from '../lib/api';
import type { Product, Order, DashboardStats } from '../types';

interface AppContextType {
  products: Product[];
  orders: Order[];
  stats: DashboardStats;
  updateProduct: (product: Product) => void;
  updateOrder: (order: Order) => void;
  updateStock: (productId: number, newStock: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalOrders: 0,
    totalSales: 0,
    pendingOrders: 0
  });

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const [productsData, usersData] = await Promise.all([
        getProducts(),
        getUsers()
      ]);
      
      setProducts(productsData.products);
      setStats({
        totalUsers: usersData.total,
        totalOrders: orders.length,
        totalSales: orders.reduce((sum, order) => sum + order.total, 0),
        pendingOrders: orders.filter(order => order.status === 'pending').length
      });
    } catch (error) {
      console.error('Failed to load initial data:', error);
    }
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(products.map(product =>
      product.id === updatedProduct.id ? updatedProduct : product
    ));
  };

  const updateOrder = (updatedOrder: Order) => {
    setOrders(orders.map(order =>
      order.id === updatedOrder.id ? updatedOrder : order
    ));
    
    // Update stats
    setStats(prev => ({
      ...prev,
      totalOrders: orders.length,
      totalSales: orders.reduce((sum, order) => sum + order.total, 0),
      pendingOrders: orders.filter(order => order.status === 'pending').length
    }));
  };

  const updateStock = (productId: number, newStock: number) => {
    setProducts(products.map(product =>
      product.id === productId ? { ...product, stock: newStock } : product
    ));
  };

  return (
    <AppContext.Provider value={{
      products,
      orders,
      stats,
      updateProduct,
      updateOrder,
      updateStock
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}