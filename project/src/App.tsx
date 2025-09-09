import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Categories from './components/Categories';
import RestaurantList from './components/RestaurantList';
import RestaurantDetail from './components/RestaurantDetail';
import Cart from './components/Cart';
import Footer from './components/Footer';
import OrderHistory from './components/OrderHistory';
import { useCart } from './hooks/useCart';

type View = 'home' | 'restaurant' | 'orders';

function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string>('');
  
  const {
    cartItems,
    isOpen: isCartOpen,
    setIsOpen: setIsCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotal,
    getItemCount
  } = useCart();

  const handleRestaurantClick = (restaurantId: string) => {
    setSelectedRestaurantId(restaurantId);
    setCurrentView('restaurant');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedRestaurantId('');
  };

  const handleViewOrders = () => {
    setCurrentView('orders');
  };

  const handleAddToCart = (item: any) => {
    addToCart(item);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartCount={getItemCount()}
        onCartClick={() => setIsCartOpen(true)}
        onOrdersClick={handleViewOrders}
        onHomeClick={handleBackToHome}
      />
      
      <main className="transition-all duration-300 ease-in-out">
        {currentView === 'home' ? (
          <>
            <Hero />
            <Categories />
            <RestaurantList onRestaurantClick={handleRestaurantClick} />
          </>
        ) : currentView === 'orders' ? (
          <OrderHistory />
        ) : (
          <RestaurantDetail
            restaurantId={selectedRestaurantId}
            onBack={handleBackToHome}
            onAddToCart={handleAddToCart}
          />
        )}
      </main>
      
      <Footer />
      
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
        total={getTotal()}
      />
    </div>
  );
}

export default App;