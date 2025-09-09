import React from 'react';
import { ArrowLeft, Star, Clock, MapPin, Plus } from 'lucide-react';
import { useRestaurants } from '../hooks/useRestaurants';
import { useMenuItems } from '../hooks/useMenuItems';

interface RestaurantDetailProps {
  restaurantId: string;
  onBack: () => void;
  onAddToCart: (item: any) => void;
}

const RestaurantDetail: React.FC<RestaurantDetailProps> = ({ 
  restaurantId, 
  onBack, 
  onAddToCart 
}) => {
  const { restaurants } = useRestaurants();
  const { menuItems, loading, error } = useMenuItems(restaurantId);
  
  const restaurant = restaurants.find(r => r.id === restaurantId);

  if (!restaurant) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p>Restaurant not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors duration-200 hover:bg-gray-100 px-3 py-2 rounded-lg"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to restaurants
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-64 overflow-hidden">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white">
            <h1 className="text-3xl font-bold mb-2">{restaurant.name}</h1>
            <p className="text-lg">{restaurant.cuisines.join(', ')}</p>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-green-100 px-3 py-1 rounded-full">
                <Star className="h-5 w-5 fill-green-500 text-green-500 mr-1" />
                <span className="font-semibold text-green-700">{restaurant.rating}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="h-5 w-5 mr-1" />
                {restaurant.delivery_time}
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-1" />
                {restaurant.location}
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold">₹{restaurant.cost_for_two}</p>
              <p className="text-sm text-gray-600">for two</p>
            </div>
          </div>

          {restaurant.offer && (
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r-lg">
              <p className="text-blue-800 font-semibold">{restaurant.offer}</p>
            </div>
          )}

          <div>
            <h2 className="text-2xl font-bold mb-6">Menu</h2>
            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse border rounded-lg p-4">
                    <div className="flex justify-between">
                      <div className="flex-1">
                        <div className="bg-gray-300 h-6 rounded mb-2"></div>
                        <div className="bg-gray-300 h-4 rounded w-3/4 mb-2"></div>
                        <div className="bg-gray-300 h-4 rounded w-1/4"></div>
                      </div>
                      <div className="bg-gray-300 w-24 h-24 rounded-lg"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <p className="text-red-600">Error loading menu: {error}</p>
            ) : menuItems.length > 0 ? (
              <div className="space-y-4">
                {menuItems.map((item, index) => (
                  <div 
                    key={item.id} 
                    className="border rounded-lg p-4 hover:shadow-md transition-all duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <div className={`w-4 h-4 rounded-sm mr-2 ${item.is_veg ? 'bg-green-500' : 'bg-red-500'}`} />
                          <h3 className="text-lg font-semibold">{item.name}</h3>
                          {item.is_bestseller && (
                            <span className="ml-2 bg-orange-500 text-white px-2 py-1 rounded text-xs animate-pulse">
                              BESTSELLER
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 mb-2">{item.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-orange-600">₹{item.price}</span>
                          {item.rating && (
                            <div className="flex items-center">
                              <Star className="h-4 w-4 fill-green-500 text-green-500 mr-1" />
                              <span className="text-sm">{item.rating}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="ml-4 flex flex-col items-center">
                        <div className="relative overflow-hidden rounded-lg mb-2">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-24 h-24 object-cover rounded-lg hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <button
                          onClick={() => onAddToCart({
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            image: item.image,
                            restaurantId: restaurant.id,
                            restaurantName: restaurant.name
                          })}
                          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center transition-all duration-200 transform hover:scale-105 whitespace-nowrap"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Menu coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;