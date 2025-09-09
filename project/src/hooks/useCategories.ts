import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Database } from '../types/database';
import { mockCategories } from '../data/mockData';

type Category = Database['public']['Tables']['categories']['Row'];

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try to fetch from Supabase first
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) {
        // If Supabase fails, use mock data
        console.log('Using mock categories data');
        setCategories(mockCategories);
      } else {
        setCategories(data || mockCategories);
      }
    } catch (error: any) {
      console.log('Using mock categories data due to error:', error);
      setCategories(mockCategories);
    } finally {
      setLoading(false);
    }
  };

  return { categories, loading, error, refetch: fetchCategories };
};