import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Database } from '../types/database';
import { mockRestaurants } from '../data/mockData';

type Restaurant = Database['public']['Tables']['restaurants']['Row'];

export const useRestaurants = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try to fetch from Supabase first
      const { data, error } = await supabase
        .from('restaurants')
        .select('*')
        .eq('is_active', true)
        .order('rating', { ascending: false });

      if (error) {
        // If Supabase fails, use mock data
        console.log('Using mock restaurants data');
        setRestaurants(mockRestaurants);
      } else {
        setRestaurants(data || mockRestaurants);
      }
    } catch (error: any) {
      console.log('Using mock restaurants data due to error:', error);
      setRestaurants(mockRestaurants);
    } finally {
      setLoading(false);
    }
  };

  return { restaurants, loading, error, refetch: fetchRestaurants };
};