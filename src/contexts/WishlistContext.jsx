import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { api } from '../lib/api';
import toast from 'react-hot-toast';

const WishlistContext = createContext({});

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Load wishlist when user logs in
  useEffect(() => {
    if (user) {
      loadWishlist();
    } else {
      setWishlist([]);
    }
  }, [user]);

  const loadWishlist = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const token = await user.firebaseUser.getIdToken();
      const response = await api.get('/wishlist', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWishlist(response.data.items || []);
    } catch (error) {
      console.error('Error loading wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (product) => {
    if (!user) {
      toast.error('Please login to add items to wishlist');
      return;
    }

    try {
      const token = await user.firebaseUser.getIdToken();
      const response = await api.post('/wishlist/add', {
        productId: product._id
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setWishlist(response.data.items);
      return { success: true };
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      toast.error('Failed to add item to wishlist');
      return { success: false, error: error.message };
    }
  };

  const removeFromWishlist = async (productId) => {
    if (!user) return;

    try {
      const token = await user.firebaseUser.getIdToken();
      const response = await api.delete('/wishlist/remove', {
        data: { productId },
        headers: { Authorization: `Bearer ${token}` }
      });

      setWishlist(response.data.items);
      return { success: true };
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      toast.error('Failed to remove item from wishlist');
      return { success: false, error: error.message };
    }
  };

  const clearWishlist = async () => {
    if (!user) return;

    try {
      const token = await user.firebaseUser.getIdToken();
      await api.delete('/wishlist/clear', {
        headers: { Authorization: `Bearer ${token}` }
      });

      setWishlist([]);
      return { success: true };
    } catch (error) {
      console.error('Error clearing wishlist:', error);
      toast.error('Failed to clear wishlist');
      return { success: false, error: error.message };
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item._id === productId);
  };

  const value = {
    wishlist,
    loading,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist,
    loadWishlist
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};