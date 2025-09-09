// Mock data for development when Supabase is not connected
export const mockCategories = [
  {
    id: '1',
    name: 'Biryani',
    image: 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Aromatic rice dishes',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Pizza',
    image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Italian favorites',
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Burger',
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Juicy burgers',
    created_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Chinese',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Asian cuisine',
    created_at: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Desserts',
    image: 'https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Sweet treats',
    created_at: new Date().toISOString()
  },
  {
    id: '6',
    name: 'Rolls',
    image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Wrapped delights',
    created_at: new Date().toISOString()
  }
];

export const mockRestaurants = [
  {
    id: '1',
    name: 'Biryani Blues',
    description: 'Authentic biryani and Mughlai cuisine',
    image: 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.3,
    delivery_time: '30-35 mins',
    cuisines: ['Biryani', 'North Indian', 'Mughlai'],
    location: 'Connaught Place',
    cost_for_two: 500,
    is_promoted: true,
    offer: '50% OFF up to ₹100',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    owner_id: null
  },
  {
    id: '2',
    name: 'Pizza Hut',
    description: 'Delicious pizzas and Italian food',
    image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.1,
    delivery_time: '25-30 mins',
    cuisines: ['Pizza', 'Fast Food', 'Italian'],
    location: 'Karol Bagh',
    cost_for_two: 600,
    is_promoted: false,
    offer: '30% OFF up to ₹150',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    owner_id: null
  },
  {
    id: '3',
    name: 'Burger King',
    description: 'Flame-grilled burgers and fast food',
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.2,
    delivery_time: '20-25 mins',
    cuisines: ['Burgers', 'Fast Food', 'American'],
    location: 'Rajouri Garden',
    cost_for_two: 400,
    is_promoted: false,
    offer: 'Buy 1 Get 1 Free',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    owner_id: null
  },
  {
    id: '4',
    name: 'Chinese Wok',
    description: 'Authentic Chinese and Asian cuisine',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.0,
    delivery_time: '35-40 mins',
    cuisines: ['Chinese', 'Asian', 'Thai'],
    location: 'Lajpat Nagar',
    cost_for_two: 450,
    is_promoted: false,
    offer: '40% OFF up to ₹80',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    owner_id: null
  },
  {
    id: '5',
    name: 'Dessert Story',
    description: 'Premium desserts and ice creams',
    image: 'https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.4,
    delivery_time: '25-30 mins',
    cuisines: ['Desserts', 'Ice Cream', 'Bakery'],
    location: 'Khan Market',
    cost_for_two: 300,
    is_promoted: false,
    offer: 'Free delivery',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    owner_id: null
  },
  {
    id: '6',
    name: 'Rolls Mania',
    description: 'Street-style rolls and fast food',
    image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.2,
    delivery_time: '20-25 mins',
    cuisines: ['Rolls', 'Street Food', 'Fast Food'],
    location: 'Chandni Chowk',
    cost_for_two: 250,
    is_promoted: true,
    offer: '₹50 OFF on orders above ₹199',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    owner_id: null
  }
];

export const mockMenuItems: { [key: string]: any[] } = {
  '1': [
    {
      id: '1',
      restaurant_id: '1',
      category_id: '1',
      name: 'Chicken Biryani',
      description: 'Aromatic basmati rice cooked with tender chicken and exotic spices',
      price: 350,
      image: 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=400',
      is_veg: false,
      is_available: true,
      is_bestseller: true,
      rating: 4.5,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '2',
      restaurant_id: '1',
      category_id: '1',
      name: 'Mutton Biryani',
      description: 'Slow-cooked mutton with fragrant basmati rice and traditional spices',
      price: 450,
      image: 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=400',
      is_veg: false,
      is_available: true,
      is_bestseller: false,
      rating: 4.6,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '3',
      restaurant_id: '1',
      category_id: '1',
      name: 'Veg Biryani',
      description: 'Mixed vegetables cooked with basmati rice and aromatic spices',
      price: 280,
      image: 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=400',
      is_veg: true,
      is_available: true,
      is_bestseller: false,
      rating: 4.2,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ],
  '2': [
    {
      id: '4',
      restaurant_id: '2',
      category_id: '2',
      name: 'Margherita Pizza',
      description: 'Classic pizza with fresh tomatoes, mozzarella, and basil',
      price: 320,
      image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400',
      is_veg: true,
      is_available: true,
      is_bestseller: true,
      rating: 4.3,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '5',
      restaurant_id: '2',
      category_id: '2',
      name: 'Pepperoni Pizza',
      description: 'Loaded with pepperoni, mozzarella cheese, and pizza sauce',
      price: 420,
      image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400',
      is_veg: false,
      is_available: true,
      is_bestseller: false,
      rating: 4.4,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ],
  '3': [
    {
      id: '6',
      restaurant_id: '3',
      category_id: '3',
      name: 'Whopper',
      description: 'Flame-grilled beef patty with fresh ingredients',
      price: 250,
      image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400',
      is_veg: false,
      is_available: true,
      is_bestseller: true,
      rating: 4.4,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '7',
      restaurant_id: '3',
      category_id: '3',
      name: 'Veg Whopper',
      description: 'Plant-based patty with fresh vegetables',
      price: 220,
      image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400',
      is_veg: true,
      is_available: true,
      is_bestseller: false,
      rating: 4.2,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ]
};