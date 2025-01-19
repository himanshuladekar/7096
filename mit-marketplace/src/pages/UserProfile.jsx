import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function UserProfile() {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState({ region: '', interests: [], budget: 0, culturalPreferences: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserPreferences = async () => {
      if (user) {
        const userDoc = doc(db, 'users', user.uid);
        const userSnapshot = await getDoc(userDoc);
        if (userSnapshot.exists()) {
          setPreferences(userSnapshot.data());
        }
        setLoading(false);
      }
    };

    fetchUserPreferences();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      const userDoc = doc(db, 'users', user.uid);
      await updateDoc(userDoc, preferences);
      alert('Preferences updated successfully!');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="region" className="block mb-1">Region</label>
          <input
            type="text"
            id="region"
            value={preferences.region}
            onChange={(e) => setPreferences({ ...preferences, region: e.target.value })}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="interests" className="block mb-1">Interests (comma-separated)</label>
          <input
            type="text"
            id="interests"
            value={preferences.interests.join(', ')}
            onChange={(e) => setPreferences({ ...preferences, interests: e.target.value.split(',').map(i => i.trim()) })}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="budget" className="block mb-1">Monthly Budget ($)</label>
          <input
            type="number"
            id="budget"
            value={preferences.budget}
            onChange={(e) => setPreferences({ ...preferences, budget: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="culturalPreferences" className="block mb-1">Cultural Preferences (comma-separated)</label>
          <input
            type="text"
            id="culturalPreferences"
            value={preferences.culturalPreferences.join(', ')}
            onChange={(e) => setPreferences({ ...preferences, culturalPreferences: e.target.value.split(',').map(i => i.trim()) })}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
          Update Preferences
        </button>
      </form>
    </div>
  );
}

