import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, MapPin, Phone, ArrowLeft } from 'lucide-react';
import { CartItem } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useOrders } from '../hooks/useOrders';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  total: number;
}

const Cart: React.FC<CartProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  total
}) => {
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { user } = useAuth();
  const { createOrder } = useOrders();

  const handlePlaceOrder = async () => {
    if (!user) {
      setError('Please sign in to place an order');
      return;
    }

    if (!deliveryAddress || !phone) {
      setError('Please fill in all delivery details');
      return;
    }

    if (cartItems.length === 0) return;

    try {
      setLoading(true);
      const restaurantId = cartItems[0].restaurantId;
      
      await createOrder(cartItems, restaurantId, deliveryAddress, phone, total);
      
      setShowOrderSuccess(true);
      onClearCart();
      setShowCheckout(false);
      
      setTimeout(() => {
        setShowOrderSuccess(false);
        onClose();
      }, 3000);
    } catch (error: any) {
      setError('Failed to place order: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = () => {
    if (!user) {
      setError('Please sign in to place an order');
      return;
    }
    setShowCheckout(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300" 
        onClick={onClose} 
      />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b bg-white sticky top-0 z-10">
            <h2 className="text-xl font-semibold text-gray-900">Your Cart</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {showOrderSuccess ? (
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center">
                <div className="bg-green-100 rounded-full p-4 mb-4 inline-block animate-pulse">
                  <ShoppingBag className="h-12 w-12 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-green-600 mb-2">Order Placed!</h3>
                <p className="text-gray-600">Your order has been placed successfully.</p>
                <p className="text-sm text-gray-500 mt-2">Estimated delivery: 25-30 minutes</p>
              </div>
            </div>
          ) : showCheckout ? (
            <div className="flex-1 p-4 overflow-y-auto">
              <button
                onClick={() => setShowCheckout(false)}
                className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors duration-200"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to cart
              </button>
              
              <h3 className="text-lg font-semibold mb-4">Delivery Details</h3>
              
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
                  {error}
                </div>
              )}
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="h-4 w-4 inline mr-1" />
                    Delivery Address
                  </label>
                  <textarea
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    rows={3}
                    placeholder="Enter your complete address"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="h-4 w-4 inline mr-1" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-xl font-bold text-orange-600">₹{total}</span>
                </div>
                <button
                  onClick={handlePlaceOrder}
                  disabled={loading || !deliveryAddress || !phone}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
                >
                  {loading ? 'Placing Order...' : 'Confirm Order'}
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-4">
                {cartItems.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Your cart is empty</p>
                    <p className="text-sm text-gray-400 mt-2">Add some delicious items to get started!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:shadow-md transition-shadow duration-200">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-600">{item.restaurantName}</p>
                          <p className="text-sm font-semibold text-orange-600">₹{item.price}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-red-500 hover:text-red-700 p-1 transition-colors duration-200"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="border-t p-4 space-y-4 bg-white">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-xl font-bold text-orange-600">₹{total}</span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;