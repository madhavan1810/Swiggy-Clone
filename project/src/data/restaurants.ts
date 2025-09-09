import { Restaurant, MenuItem } from '../types';

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Biryani Blues',
    image: 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.3,
    deliveryTime: '30-35 mins',
    cuisines: ['Biryani', 'North Indian', 'Mughlai'],
    location: 'Connaught Place',
    promoted: true,
    costForTwo: 500,
    offer: '50% OFF up to ₹100'
  },
  {
    id: '2',
    name: 'Pizza Hut',
    image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.1,
    deliveryTime: '25-30 mins',
    cuisines: ['Pizza', 'Fast Food', 'Italian'],
    location: 'Karol Bagh',
    costForTwo: 600,
    offer: '30% OFF up to ₹150'
  },
  {
    id: '3',
    name: 'Burger King',
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.2,
    deliveryTime: '20-25 mins',
    cuisines: ['Burgers', 'Fast Food', 'American'],
    location: 'Rajouri Garden',
    costForTwo: 400,
    offer: 'Buy 1 Get 1 Free'
  },
  {
    id: '4',
    name: 'Chinese Wok',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.0,
    deliveryTime: '35-40 mins',
    cuisines: ['Chinese', 'Asian', 'Thai'],
    location: 'Lajpat Nagar',
    costForTwo: 450,
    offer: '40% OFF up to ₹80'
  },
  {
    id: '5',
    name: 'Dessert Story',
    image: 'https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.4,
    deliveryTime: '25-30 mins',
    cuisines: ['Desserts', 'Ice Cream', 'Bakery'],
    location: 'Khan Market',
    costForTwo: 300,
    offer: 'Free delivery'
  },
  {
    id: '6',
    name: 'Rolls Mania',
    image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.2,
    deliveryTime: '20-25 mins',
    cuisines: ['Rolls', 'Street Food', 'Fast Food'],
    location: 'Chandni Chowk',
    promoted: true,
    costForTwo: 250,
    offer: '₹50 OFF on orders above ₹199'
  }
];

export const menuItems: { [key: string]: MenuItem[] } = {
  '1': [
    {
      id: '1',
      name: 'Chicken Biryani',
      description: 'Aromatic basmati rice cooked with tender chicken and exotic spices',
      price: 350,
      image: 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Biryani',
      isVeg: false,
      rating: 4.5,
      bestseller: true
    },
    {
      id: '2',
      name: 'Mutton Biryani',
      description: 'Slow-cooked mutton with fragrant basmati rice and traditional spices',
      price: 450,
      image: 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Biryani',
      isVeg: false,
      rating: 4.6
    },
    {
      id: '3',
      name: 'Veg Biryani',
      description: 'Mixed vegetables cooked with basmati rice and aromatic spices',
      price: 280,
      image: 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Biryani',
      isVeg: true,
      rating: 4.2
    }
  ],
  '2': [
    {
      id: '4',
      name: 'Margherita Pizza',
      description: 'Classic pizza with fresh tomatoes, mozzarella, and basil',
      price: 320,
      image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Pizza',
      isVeg: true,
      rating: 4.3,
      bestseller: true
    },
    {
      id: '5',
      name: 'Pepperoni Pizza',
      description: 'Loaded with pepperoni, mozzarella cheese, and pizza sauce',
      price: 420,
      image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Pizza',
      isVeg: false,
      rating: 4.4
    }
  ]
};