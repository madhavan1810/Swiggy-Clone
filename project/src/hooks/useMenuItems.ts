import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Database } from '../types/database';
import { mockMenuItems } from '../data/mockData';

type MenuItem = Database['public']['Tables']['menu_items']['Row'];

export const useMenuItems = (restaurantId: string) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (restaurantId) {
      fetchMenuItems();
    }
  }, [restaurantId]);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try to fetch from Supabase first
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('restaurant_id', restaurantId)
        .eq('is_available', true)
        .order('is_bestseller', { ascending: false });

      if (error) {
        // If Supabase fails, use mock data
        console.log('Using mock menu items data');
        setMenuItems(mockMenuItems[restaurantId] || []);
      } else {
        setMenuItems(data || mockMenuItems[restaurantId] || []);
      }
    } catch (error: any) {
      console.log('Using mock menu items data due to error:', error);
      setMenuItems(mockMenuItems[restaurantId] || []);
    } finally {
      setLoading(false);
    }
  };

  return { menuItems, loading, error, refetch: fetchMenuItems };
};