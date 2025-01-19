import React, { useState, useEffect } from 'react';
import { Route, useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import ReviewForm from '../components/ReviewForm';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../contexts/CartContext';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        const productDoc = doc(db, 'products', id);
        const productSnapshot = await getDoc(productDoc);
        if (productSnapshot.exists()) {
          setProduct({ id: productSnapshot.id, ...productSnapshot.data() });
        }
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center text-red-600">Product not found</div>;
  }
  
  return (
    <div className="section">
      <div className="card md:flex">
        <div className="md:w-1/2">
          <img
            className="w-full h-64 object-cover md:h-full"
            src={product.imageUrl || `/placeholder.svg?height=400&width=400`}
            alt={product.name}
          />
        </div>
        <div className="p-8 md:w-1/2">
          <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-2xl text-blue-600 font-bold mb-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-500 mb-4">Category: {product.category}</p>
          <button 
            className="btn btn-primary w-full md:w-auto"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
      {user && <ReviewForm productId={product.id} />}
    </div>
  );
}

