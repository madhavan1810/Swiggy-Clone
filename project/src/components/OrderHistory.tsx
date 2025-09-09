import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Star, ChevronRight, Package, Truck, CheckCircle, XCircle, ShoppingBag } from 'lucide-react';
import { useOrders } from '../hooks/useOrders';
import { useAuth } from '../contexts/AuthContext';

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getUserOrders } = useOrders();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const userOrders = await getUserOrders();
      setOrders(userOrders);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'placed':
        return <Package className="h-5 w-5 text-blue-500" />;
      case 'confirmed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'preparing':
        return <Clock className="h-5 w-5 text-orange-500" />;
      case 'out_for_delivery':
        return <Truck className="h-5 w-5 text-purple-500" />;
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Package className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'placed':
        return 'bg-blue-100 text-blue-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'preparing':
        return 'bg-orange-100 text-orange-800';
      case 'out_for_delivery':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <div className="bg-orange-100 rounded-full p-6 mb-6 inline-block">
            <ShoppingBag className="h-16 w-16 text-orange-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Sign in to view orders</h2>
          <p className="text-gray-600 mb-8">Please sign in to see your order history and track your deliveries</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="bg-gray-300 h-8 rounded w-48 mb-2 animate-pulse"></div>
            <div className="bg-gray-300 h-4 rounded w-32 animate-pulse"></div>
          </div>
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="bg-gray-300 h-6 rounded mb-2 w-1/3"></div>
                    <div className="bg-gray-300 h-4 rounded w-1/4"></div>
                  </div>
                  <div className="bg-gray-300 h-6 rounded w-20"></div>
                </div>
                <div className="bg-gray-300 h-4 rounded mb-4 w-3/4"></div>
                <div className="flex justify-between">
                  <div className="bg-gray-300 h-4 rounded w-1/4"></div>
                  <div className="bg-gray-300 h-4 rounded w-1/6"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <XCircle className="h-16 w-16 text-red-400 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error loading orders</h2>
          <p className="text-red-600 mb-6">{error}</p>
          <button
            onClick={fetchOrders}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Orders</h1>
          <p className="text-gray-600">Track and manage your food deliveries</p>
        </div>
        
        {orders.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-orange-100 rounded-full p-8 mb-6 inline-block">
              <Package className="h-20 w-20 text-orange-500" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">No orders yet</h2>
            <p className="text-gray-600 mb-8 text-lg">Ready to order? Let's get you some delicious food!</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Browse Restaurants
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <div 
                key={order.id} 
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <h3 className="text-xl font-bold text-gray-900 mr-4">
                          {order.restaurants?.name || order.restaurant_name || 'Restaurant'}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                          {order.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        Order #{order.id.slice(0, 8)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatDate(order.created_at)}
                      </p>
                    </div>
                    <div className="flex items-center">
                      {getStatusIcon(order.status)}
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-6 mb-6">
                    <div className="space-y-3">
                      {(order.order_items || order.items || []).map((item: any, itemIndex: number) => (
                        <div key={item.id || itemIndex} className="flex justify-between items-center">
                          <div className="flex items-center">
                            <img
                              src={item.menu_items?.image || item.image || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400'}
                              alt={item.menu_items?.name || item.name || 'Item'}
                              className="w-12 h-12 object-cover rounded-lg mr-4 shadow-sm"
                            />
                            <div>
                              <p className="font-semibold text-gray-900">
                                {item.menu_items?.name || item.name || 'Menu Item'}
                              </p>
                              <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <span className="font-bold text-gray-900">₹{item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="truncate max-w-xs">
                        {order.delivery_address}
                      </span>
                    </div>
                    <div className="flex items-center space-x-6">
                      <span className="text-2xl font-bold text-orange-600">
                        ₹{order.total_amount}
                      </span>
                      <button className="flex items-center text-orange-500 hover:text-orange-600 transition-colors duration-200 group">
                        <span className="text-sm font-semibold mr-2">View Details</span>
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                      </button>
                    </div>
                  </div>

                  {order.estimated_delivery_time && (
                    <div className="mt-4 flex items-center text-sm text-gray-500 bg-gray-50 rounded-lg p-3">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>Estimated delivery: {order.estimated_delivery_time}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;