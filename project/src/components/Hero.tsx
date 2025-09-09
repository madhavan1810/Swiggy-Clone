import React from 'react';
import { Clock, Star, Truck, ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 text-white py-20 overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-white rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Star className="h-5 w-5 mr-2 text-yellow-300" />
              <span className="text-sm font-medium">India's #1 Food Delivery App</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Hungry?
              <span className="block text-yellow-300">Order Now!</span>
            </h1>
            
            <p className="text-xl mb-8 text-orange-100 leading-relaxed">
              Get your favorite meals delivered fresh, fast, and hot to your doorstep. 
              From local favorites to global cuisines.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button className="group bg-white text-orange-600 px-8 py-4 rounded-xl font-semibold hover:bg-orange-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center">
                <span>Order Now</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-orange-600 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
                Browse Restaurants
              </button>
            </div>
          </div>
          
          <div className="hidden lg:block animate-fade-in-right">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-400 rounded-3xl transform rotate-6 scale-105 opacity-20"></div>
              <img 
                src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Delicious food delivery" 
                className="relative rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-500 w-full h-96 object-cover"
              />
              
              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 bg-white text-orange-600 p-4 rounded-2xl shadow-xl animate-bounce">
                <Star className="h-8 w-8" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-green-500 text-white p-4 rounded-2xl shadow-xl animate-pulse">
                <Clock className="h-8 w-8" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center group animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-4 hover:bg-white/30 transition-all duration-300 group-hover:scale-105">
              <Clock className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-orange-100">Average delivery time of just 25 minutes</p>
            </div>
          </div>
          
          <div className="text-center group animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-4 hover:bg-white/30 transition-all duration-300 group-hover:scale-105">
              <Star className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Top Quality</h3>
              <p className="text-orange-100">Only the best restaurants and fresh ingredients</p>
            </div>
          </div>
          
          <div className="text-center group animate-fade-in-up" style={{ animationDelay: '600ms' }}>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-4 hover:bg-white/30 transition-all duration-300 group-hover:scale-105">
              <Truck className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Live Tracking</h3>
              <p className="text-orange-100">Track your order in real-time from kitchen to door</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;