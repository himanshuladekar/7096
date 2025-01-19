import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Zap, Users, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="section">
      <div className="hero-section text-center">
        <h1 className="hero-title">Welcome to the Future of Campus Shopping</h1>
        <p className="hero-subtitle">Discover cutting-edge essentials for your MIT journey</p>
        <Link to="/products" className="btn btn-primary text-lg">
          Explore Products
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <div className="feature-card">
          <ShoppingBag className="feature-icon" />
          <h2 className="text-xl font-semibold mb-2">Curated Essentials</h2>
          <p>Handpicked products tailored for MIT students</p>
        </div>
        <div className="feature-card">
          <Zap className="feature-icon" />
          <h2 className="text-xl font-semibold mb-2">Instant Delivery</h2>
          <p>Get your items delivered at lightning speed</p>
        </div>
        <div className="feature-card">
          <Users className="feature-icon" />
          <h2 className="text-xl font-semibold mb-2">Community Reviews</h2>
          <p>Make informed decisions with peer insights</p>
        </div>
        <div className="feature-card">
          <Sparkles className="feature-icon" />
          <h2 className="text-xl font-semibold mb-2">Exclusive Deals</h2>
          <p>Enjoy special discounts for MIT students</p>
        </div>
      </div>

      <div className="bg-secondary-color text-white rounded-lg p-8 text-center">
        <h2 className="text-3xl font-semibold mb-4 text-black rounded-lg p-8">New to MIT?</h2>
        <p className="text-xl mb-6 text-black rounded-lg p-4">Get started with our comprehensive welcome package!</p>
        <Link to="/products" className="btn btn-primary text-lg">
          Explore Welcome Package
        </Link>
      </div>
    </div>
  );
}

