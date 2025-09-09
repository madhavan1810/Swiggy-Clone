import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { CartItem } from '../types';

export const useOrders = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const createOrder = async (
    cartItems: CartItem[],
    restaurantId: string,
    deliveryAddress: string,
    phone: string,
    totalAmount: number
  ) => {
    if (!user) throw new Error('User must be authenticated');

    try {
      setLoading(true);

      // Try to create order in Supabase
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          restaurant_id: restaurantId,
          total_amount: totalAmount,
          delivery_address: deliveryAddress,
          phone: phone,
          estimated_delivery_time: '25-30 mins',
        })
        .select()
        .single();

      if (orderError) {
        // If Supabase fails, simulate order creation
        console.log('Simulating order creation');
        const mockOrder = {
          id: `order_${Date.now()}`,
          user_id: user.id,
          restaurant_id: restaurantId,
          total_amount: totalAmount,
          delivery_address: deliveryAddress,
          phone: phone,
          status: 'placed' as const,
          estimated_delivery_time: '25-30 mins',
          created_at: new Date().toISOString(),
        };
        
        // Store in localStorage for demo
        const existingOrders = JSON.parse(localStorage.getItem('demo-orders') || '[]');
        existingOrders.push({
          ...mockOrder,
          items: cartItems
        });
        localStorage.setItem('demo-orders', JSON.stringify(existingOrders));
        
        return mockOrder;
      }

      // Create order items if Supabase worked
      const orderItems = cartItems.map(item => ({
        order_id: order.id,
        menu_item_id: item.id,
        quantity: item.quantity,
        price: item.price,
      }));

      await supabase.from('order_items').insert(orderItems);
      return order;
    } catch (error) {
      // Fallback to demo mode
      console.log('Creating demo order');
      const mockOrder = {
        id: `order_${Date.now()}`,
        user_id: user.id,
        restaurant_id: restaurantId,
        total_amount: totalAmount,
        delivery_address: deliveryAddress,
        phone: phone,
        status: 'placed' as const,
        estimated_delivery_time: '25-30 mins',
        created_at: new Date().toISOString(),
      };
      
      const existingOrders = JSON.parse(localStorage.getItem('demo-orders') || '[]');
      existingOrders.push({
        ...mockOrder,
        items: cartItems
      });
      localStorage.setItem('demo-orders', JSON.stringify(existingOrders));
      
      return mockOrder;
    } finally {
      setLoading(false);
    }
  };

  const getUserOrders = async () => {
    if (!user) return [];

    try {
      // Try to fetch from Supabase
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          restaurants (name, image),
          order_items (
            *,
            menu_items (name, image)
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        // Fallback to localStorage
        const demoOrders = JSON.parse(localStorage.getItem('demo-orders') || '[]');
        return demoOrders.filter((order: any) => order.user_id === user.id);
      }
      
      return data || [];
    } catch (error) {
      // Fallback to localStorage
      const demoOrders = JSON.parse(localStorage.getItem('demo-orders') || '[]');
      return demoOrders.filter((order: any) => order.user_id === user.id);
    }
  };

  return { createOrder, getUserOrders, loading };
};