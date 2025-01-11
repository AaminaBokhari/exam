export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
}

export interface Order {
  id: number;
  userId: number;
  products: Array<{
    id: number;
    quantity: number;
    title: string;
    price: number;
  }>;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  date: string;
}

export interface DashboardStats {
  totalUsers: number;
  totalOrders: number;
  totalSales: number;
  pendingOrders: number;
}