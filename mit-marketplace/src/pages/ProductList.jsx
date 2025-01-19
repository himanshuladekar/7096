import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { sampleProducts, sampleBundles } from '../sampleProducts';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../contexts/CartContext';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [bundles, setBundles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recentlyAdded, setRecentlyAdded] = useState({});
  const { user } = useAuth();
  const { addToCart } = useCart();

  useEffect(() => {
    setProducts(sampleProducts);
    setBundles(sampleBundles);
    setLoading(false);
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    setRecentlyAdded(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setRecentlyAdded(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="section">
      <h2 className="section-title">Curated Essentials</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.imageUrl || `/placeholder.svg?height=200&width=300`} alt={product.name} className="product-image" />
            <div className="product-info">
              <h3 className="product-title">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <p className="product-price">${product.price.toFixed(2)}</p>
              <div className="flex justify-between items-center mt-4">
                <Link to={`/products/${product.id}`} className="btn btn-secondary">
                  View Details
                </Link>
                <button 
                  className={`btn ${recentlyAdded[product.id] ? 'bg-green-500 hover:bg-green-600' : 'btn-primary'}`}
                  onClick={() => handleAddToCart(product)}
                  disabled={recentlyAdded[product.id]}
                >
                  {recentlyAdded[product.id] ? 'Added to Cart' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {user && (
        <div className="mt-12">
          <h2 className="section-title">Recommended Bundles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bundles.map((bundle) => (
              <div key={bundle.id} className="product-card">
                <div className="product-info">
                  <h3 className="product-title">{bundle.name}</h3>
                  <p className="product-description">{bundle.description}</p>
                  <p className="product-price">${bundle.price.toFixed(2)}</p>
                  <button 
                    className={`btn w-full mt-4 ${recentlyAdded[bundle.id] ? 'bg-green-500 hover:bg-green-600' : 'btn-primary'}`}
                    onClick={() => handleAddToCart(bundle)}
                    disabled={recentlyAdded[bundle.id]}
                  >
                    {recentlyAdded[bundle.id] ? 'Added to Cart' : 'Add Bundle to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

