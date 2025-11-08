import React from 'react';
import { ShoppingCart, Store, Shield } from 'lucide-react';

const Navbar = ({ onNavigate, cartCount = 0 }) => {
  return (
    <header className="w-full sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <button onClick={() => onNavigate('home')} className="flex items-center gap-2 font-semibold text-gray-900">
          <Store className="h-5 w-5 text-indigo-600" />
          <span>PastelPay</span>
        </button>
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
          <button onClick={() => onNavigate('home')} className="hover:text-gray-900">Home</button>
          <button onClick={() => onNavigate('cart')} className="hover:text-gray-900">Cart</button>
          <button onClick={() => onNavigate('checkout')} className="hover:text-gray-900">Checkout</button>
          <button onClick={() => onNavigate('admin')} className="hover:text-gray-900 flex items-center gap-1">
            <Shield className="h-4 w-4" /> Admin
          </button>
        </nav>
        <button onClick={() => onNavigate('cart')} className="relative inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800">
          <ShoppingCart className="h-4 w-4" />
          <span className="hidden sm:inline">Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 min-w-[20px] px-1 rounded-full bg-rose-500 text-white text-xs grid place-items-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
