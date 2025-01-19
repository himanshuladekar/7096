import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../contexts/CartContext';
import { ShoppingCart, Menu, X } from 'lucide-react';

export default function Header() {
  const { user, signOut } = useAuth();
  const { cart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/" className="text-2xl font-bold text-primary-color">MIT Marketplace</Link>
        <nav className={`header-nav ${isMenuOpen ? 'flex' : 'hidden md:flex'}`}>
          <Link to="/products" className="header-link">Products</Link>
          {user ? (
            <>
              <Link to="/profile" className="header-link">Profile</Link>
              <button onClick={signOut} className="header-link">Sign Out</button>
            </>
          ) : (
            <Link to="/auth" className="header-link">Sign Up / Sign In</Link>
          )}
          <Link to="/cart" className="header-link relative group">
            <div className="relative">
              <ShoppingCart size={24} className={cartItemsCount > 0 ? 'text-primary' : 'text-gray-600'} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItemsCount}
                </span>
              )}
            </div>
            <span className="absolute top-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {cartItemsCount === 0 ? 'Cart is empty' : `${cartItemsCount} item${cartItemsCount > 1 ? 's' : ''} in cart`}
            </span>
          </Link>
        </nav>
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}

