import React from 'react';
import { Star, Clock, MapPin, Tag } from 'lucide-react';
import { Database } from '../types/database';

type Restaurant = Database['public']['Tables']['restaurants']['Row'];

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: () => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 group transform hover:-translate-y-1"
    >
      <div className="relative overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {restaurant.is_promoted && (
          <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-semibold animate-pulse">
            PROMOTED
          </div>
        )}
        {restaurant.offer && (
          <div className="absolute bottom-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold flex items-center">
            <Tag className="h-3 w-3 mr-1" />
            {restaurant.offer}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-200">
          {restaurant.name}
        </h3>
        <p className="text-sm text-gray-600 mb-3">{restaurant.cuisines.join(', ')}</p>
        
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-green-500 text-green-500 mr-1" />
            <span className="text-sm font-medium text-gray-900">{restaurant.rating}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-1" />
            {restaurant.delivery_time}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-1" />
            {restaurant.location}
          </div>
          <div className="text-sm text-gray-600">
            ₹{restaurant.cost_for_two} for two
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;