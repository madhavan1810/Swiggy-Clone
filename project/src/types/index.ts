export interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  cuisines: string[];
  location: string;
  promoted?: boolean;
  costForTwo: number;
  offer?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isVeg: boolean;
  rating?: number;
  bestseller?: boolean;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  restaurantId: string;
  restaurantName: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  count: number;
}

export interface Order {
  id: string;
  restaurantName: string;
  items: CartItem[];
  total: number;
  status: 'placed' | 'preparing' | 'out_for_delivery' | 'delivered';
  estimatedTime: string;
  address: string;
}