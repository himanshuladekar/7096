import { useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth';
import { app } from '../firebase';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (email, password) => {
    setError(null);
    try {
      const auth = getAuth(app);
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError('Failed to create an account');
      console.error(err);
    }
  };

  const signIn = async (email, password) => {
    setError(null);
    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError('Failed to sign in');
      console.error(err);
    }
  };

  const signOut = async () => {
    setError(null);
    try {
      const auth = getAuth(app);
      await firebaseSignOut(auth);
    } catch (err) {
      setError('Failed to sign out');
      console.error(err);
    }
  };

  return { user, error, signUp, signIn, signOut };
}
