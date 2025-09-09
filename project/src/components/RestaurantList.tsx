import React, { useState } from 'react';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { useRestaurants } from '../hooks/useRestaurants';
import RestaurantCard from './RestaurantCard';

interface RestaurantListProps {
  onRestaurantClick: (restaurantId: string) => void;
}

const RestaurantList: React.FC<RestaurantListProps> = ({ onRestaurantClick }) => {
  const { restaurants, loading, error } = useRestaurants();
  const [sortBy, setSortBy] = useState('relevance');
  const [filterRating, setFilterRating] = useState('all');

  const filteredRestaurants = restaurants.filter(restaurant => {
    if (filterRating === 'all') return true;
    return restaurant.rating >= parseFloat(filterRating);
  });

  const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'deliveryTime':
        return parseInt(a.delivery_time) - parseInt(b.delivery_time);
      case 'costForTwo':
        return a.cost_for_two - b.cost_for_two;
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Restaurants near you</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gray-300 h-48"></div>
                <div className="p-4 space-y-3">
                  <div className="bg-gray-300 h-6 rounded"></div>
                  <div className="bg-gray-300 h-4 rounded w-3/4"></div>
                  <div className="flex justify-between">
                    <div className="bg-gray-300 h-4 rounded w-1/4"></div>
                    <div className="bg-gray-300 h-4 rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-red-600">Error loading restaurants: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Restaurants near you</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-600" />
              <select
                value={filterRating}
                onChange={(e) => setFilterRating(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="all">All Ratings</option>
                <option value="4">4.0+ Rating</option>
                <option value="4.2">4.2+ Rating</option>
                <option value="4.5">4.5+ Rating</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <SlidersHorizontal className="h-5 w-5 text-gray-600" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="relevance">Relevance</option>
                <option value="rating">Rating</option>
                <option value="deliveryTime">Delivery Time</option>
                <option value="costForTwo">Cost for Two</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onClick={() => onRestaurantClick(restaurant.id)}
            />
          ))}
        </div>
        
        {sortedRestaurants.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500">No restaurants found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default RestaurantList;