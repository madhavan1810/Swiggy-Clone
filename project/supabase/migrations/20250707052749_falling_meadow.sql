/*
  # Seed Initial Data

  1. Categories
  2. Sample Restaurants
  3. Menu Items
*/

-- Insert categories
INSERT INTO categories (id, name, image, description) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'Biryani', 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=400', 'Aromatic rice dishes'),
  ('550e8400-e29b-41d4-a716-446655440002', 'Pizza', 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400', 'Italian favorites'),
  ('550e8400-e29b-41d4-a716-446655440003', 'Burger', 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400', 'Juicy burgers'),
  ('550e8400-e29b-41d4-a716-446655440004', 'Chinese', 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400', 'Asian cuisine'),
  ('550e8400-e29b-41d4-a716-446655440005', 'Desserts', 'https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg?auto=compress&cs=tinysrgb&w=400', 'Sweet treats'),
  ('550e8400-e29b-41d4-a716-446655440006', 'Rolls', 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=400', 'Wrapped delights'),
  ('550e8400-e29b-41d4-a716-446655440007', 'North Indian', 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400', 'Traditional North Indian'),
  ('550e8400-e29b-41d4-a716-446655440008', 'South Indian', 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=400', 'South Indian specialties');

-- Insert sample restaurants
INSERT INTO restaurants (id, name, description, image, rating, delivery_time, cuisines, location, cost_for_two, is_promoted, offer) VALUES
  ('650e8400-e29b-41d4-a716-446655440001', 'Biryani Blues', 'Authentic biryani and Mughlai cuisine', 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=800', 4.3, '30-35 mins', ARRAY['Biryani', 'North Indian', 'Mughlai'], 'Connaught Place', 500, true, '50% OFF up to ₹100'),
  ('650e8400-e29b-41d4-a716-446655440002', 'Pizza Hut', 'Delicious pizzas and Italian food', 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=800', 4.1, '25-30 mins', ARRAY['Pizza', 'Fast Food', 'Italian'], 'Karol Bagh', 600, false, '30% OFF up to ₹150'),
  ('650e8400-e29b-41d4-a716-446655440003', 'Burger King', 'Flame-grilled burgers and fast food', 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=800', 4.2, '20-25 mins', ARRAY['Burgers', 'Fast Food', 'American'], 'Rajouri Garden', 400, false, 'Buy 1 Get 1 Free'),
  ('650e8400-e29b-41d4-a716-446655440004', 'Chinese Wok', 'Authentic Chinese and Asian cuisine', 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800', 4.0, '35-40 mins', ARRAY['Chinese', 'Asian', 'Thai'], 'Lajpat Nagar', 450, false, '40% OFF up to ₹80'),
  ('650e8400-e29b-41d4-a716-446655440005', 'Dessert Story', 'Premium desserts and ice creams', 'https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg?auto=compress&cs=tinysrgb&w=800', 4.4, '25-30 mins', ARRAY['Desserts', 'Ice Cream', 'Bakery'], 'Khan Market', 300, false, 'Free delivery'),
  ('650e8400-e29b-41d4-a716-446655440006', 'Rolls Mania', 'Street-style rolls and fast food', 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800', 4.2, '20-25 mins', ARRAY['Rolls', 'Street Food', 'Fast Food'], 'Chandni Chowk', 250, true, '₹50 OFF on orders above ₹199');

-- Insert menu items for Biryani Blues
INSERT INTO menu_items (restaurant_id, category_id, name, description, price, image, is_veg, is_bestseller, rating) VALUES
  ('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'Chicken Biryani', 'Aromatic basmati rice cooked with tender chicken and exotic spices', 350, 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=400', false, true, 4.5),
  ('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'Mutton Biryani', 'Slow-cooked mutton with fragrant basmati rice and traditional spices', 450, 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=400', false, false, 4.6),
  ('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'Veg Biryani', 'Mixed vegetables cooked with basmati rice and aromatic spices', 280, 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=400', true, false, 4.2);

-- Insert menu items for Pizza Hut
INSERT INTO menu_items (restaurant_id, category_id, name, description, price, image, is_veg, is_bestseller, rating) VALUES
  ('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', 'Margherita Pizza', 'Classic pizza with fresh tomatoes, mozzarella, and basil', 320, 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400', true, true, 4.3),
  ('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', 'Pepperoni Pizza', 'Loaded with pepperoni, mozzarella cheese, and pizza sauce', 420, 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400', false, false, 4.4),
  ('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', 'Veggie Supreme', 'Loaded with fresh vegetables and cheese', 380, 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400', true, false, 4.1);

-- Insert menu items for Burger King
INSERT INTO menu_items (restaurant_id, category_id, name, description, price, image, is_veg, is_bestseller, rating) VALUES
  ('650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440003', 'Whopper', 'Flame-grilled beef patty with fresh ingredients', 250, 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400', false, true, 4.4),
  ('650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440003', 'Veg Whopper', 'Plant-based patty with fresh vegetables', 220, 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400', true, false, 4.2),
  ('650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440003', 'Chicken Royale', 'Crispy chicken fillet with mayo and lettuce', 200, 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=400', false, false, 4.3);