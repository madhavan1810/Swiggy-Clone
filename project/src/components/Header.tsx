import React, { useState } from 'react';
import { Search, MapPin, ShoppingCart, User, LogOut, Clock, Home } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  onOrdersClick?: () => void;
  onHomeClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onCartClick, onOrdersClick, onHomeClick }) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, signOut } = useAuth();

  const handleAuthClick = () => {
    if (user) {
      signOut();
    } else {
      setShowAuthModal(true);
    }
  };

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-40 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <h1 
                  onClick={onHomeClick}
                  className="text-2xl font-bold text-orange-500 hover:text-orange-600 transition-colors duration-200 cursor-pointer"
                >
                  Swiggy
                </h1>
              </div>
              <div className="hidden md:flex items-center space-x-2 text-gray-700">
                <MapPin className="h-5 w-5 text-orange-500" />
                <span className="text-sm">Deliver to</span>
                <span className="text-sm font-medium hover:text-orange-500 transition-colors duration-200 cursor-pointer">
                  Delhi, India
                </span>
              </div>
            </div>

            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for restaurants, cuisine or a dish"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={onHomeClick}
                className="flex items-center space-x-2 p-2 text-gray-700 hover:text-orange-500 transition-all duration-200 hover:bg-orange-50 rounded-lg"
              >
                <Home className="h-6 w-6" />
                <span className="hidden md:inline font-medium">Home</span>
              </button>
              {user && (
                <button
                  onClick={onOrdersClick}
                  className="flex items-center space-x-2 p-2 text-gray-700 hover:text-orange-500 transition-all duration-200 hover:bg-orange-50 rounded-lg"
                >
                  <Clock className="h-6 w-6" />
                  <span className="hidden md:inline font-medium">Orders</span>
                </button>
              )}
              <button
                onClick={onCartClick}
                className="relative p-2 text-gray-700 hover:text-orange-500 transition-all duration-200 hover:bg-orange-50 rounded-lg"
              >
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-medium animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>
              <button 
                onClick={handleAuthClick}
                className="flex items-center space-x-2 p-2 text-gray-700 hover:text-orange-500 transition-all duration-200 hover:bg-orange-50 rounded-lg"
              >
                {user ? <LogOut className="h-6 w-6" /> : <User className="h-6 w-6" />}
                <span className="hidden md:inline font-medium">
                  {user ? 'Sign Out' : 'Sign In'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </>
  );
};

export default Header;