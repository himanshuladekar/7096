import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../hooks/useAuth';

export default function ReviewForm({ productId }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      await addDoc(collection(db, 'reviews'), {
        productId,
        userId: user.uid,
        rating,
        comment,
        createdAt: new Date()
      });
      setRating(5);
      setComment('');
      alert('Review submitted successfully!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <div>
        <label htmlFor="rating" className="block mb-1">Rating</label>
        <select
          id="rating"
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value))}
          className="w-full px-3 py-2 border rounded-md"
        >
          {[1, 2, 3, 4, 5].map((value) => (
            <option key={value} value={value}>{value} Star{value !== 1 ? 's' : ''}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="comment" className="block mb-1">Comment</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          rows={4}
        ></textarea>
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
        Submit Review
      </button>
    </form>
  );
}

