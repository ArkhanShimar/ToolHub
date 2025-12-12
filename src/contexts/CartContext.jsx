import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { api } from '../lib/api';
import toast from 'react-hot-toast';

const CartContext = createContext({});

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Load cart when user logs in
  useEffect(() => {
    if (user) {
      loadCart();
    } else {
      setCartItems([]);
    }
  }, [user]);

  const loadCart = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const token = await user.firebaseUser.getIdToken();
      const response = await api.get('/cart', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCartItems(response.data.items || []);
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product, quantity = 1, variantId = null) => {
    if (!user) {
      toast.error('Please login to add items to cart');
      return;
    }

    try {
      const token = await user.firebaseUser.getIdToken();
      const response = await api.post('/cart/add', {
        productId: product._id,
        quantity,
        variantId
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setCartItems(response.data.items);
      return { success: true };
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
      return { success: false, error: error.message };
    }
  };

  const updateQuantity = async (productId, quantity, variantId = null) => {
    if (!user) return;

    try {
      const token = await user.firebaseUser.getIdToken();
      const response = await api.put('/cart/update', {
        productId,
        quantity,
        variantId
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setCartItems(response.data.items);
      return { success: true };
    } catch (error) {
      console.error('Error updating cart:', error);
      toast.error('Failed to update cart');
      return { success: false, error: error.message };
    }
  };

  const removeFromCart = async (productId, variantId = null) => {
    if (!user) return;

    try {
      const token = await user.firebaseUser.getIdToken();
      const response = await api.delete('/cart/remove', {
        data: { productId, variantId },
        headers: { Authorization: `Bearer ${token}` }
      });

      setCartItems(response.data.items);
      toast.success('Item removed from cart');
      return { success: true };
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Failed to remove item from cart');
      return { success: false, error: error.message };
    }
  };

  const clearCart = async () => {
    if (!user) return;

    try {
      const token = await user.firebaseUser.getIdToken();
      await api.delete('/cart/clear', {
        headers: { Authorization: `Bearer ${token}` }
      });

      setCartItems([]);
      return { success: true };
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Failed to clear cart');
      return { success: false, error: error.message };
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.product.salePrice || item.product.price;
      return total + (price * item.qty);
    }, 0);
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.qty, 0);
  };

  const value = {
    cartItems,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartItemsCount,
    loadCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};