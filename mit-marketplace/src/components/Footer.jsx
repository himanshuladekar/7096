import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="footer-title">MIT Marketplace</h3>
            <p className="text-gray-400">Your one-stop shop for all MIT essentials.</p>
          </div>
          <div>
            <h4 className="footer-title">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/products" className="footer-link">Products</Link></li>
              <li><Link to="/cart" className="footer-link">Cart</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-title">Contact Us</h4>
            <p className="text-gray-400">Email: support@mitmktplace.com</p>
            <p className="text-gray-400">Phone: (123) 456-7890</p>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400">
          <p>&copy; 2023 MIT Marketplace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

