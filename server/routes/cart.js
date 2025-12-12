const express = require('express');
const User = require('../models/User');
const Product = require('../models/Product');
const { authenticateUser } = require('../middleware/auth');
const router = express.Router();

// Get user's cart
router.get('/', authenticateUser, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate({
        path: 'cart.productId',
        select: 'name slug price salePrice images brand stockQty isActive'
      });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Filter out inactive products and products that don't exist
    const validCartItems = user.cart.filter(item => 
      item.productId && item.productId.isActive
    );

    // Update cart if items were filtered out
    if (validCartItems.length !== user.cart.length) {
      user.cart = validCartItems;
      await user.save();
    }

    res.json({
      success: true,
      items: validCartItems.map(item => ({
        _id: item._id,
        product: item.productId,
        qty: item.qty,
        variantId: item.variantId,
        addedAt: item.addedAt
      }))
    });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get cart'
    });
  }
});

// Add item to cart
router.post('/add', authenticateUser, async (req, res) => {
  try {
    const { productId, quantity = 1, variantId } = req.body;

    // Validate product exists and is active
    const product = await Product.findOne({ 
      _id: productId, 
      isActive: true 
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check stock availability
    if (product.stockQty < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient stock'
      });
    }

    const user = await User.findById(req.user._id);

    // Check if item already exists in cart
    const existingItemIndex = user.cart.findIndex(item => 
      item.productId.toString() === productId && 
      (!variantId || item.variantId?.toString() === variantId)
    );

    if (existingItemIndex > -1) {
      // Update quantity
      const newQty = user.cart[existingItemIndex].qty + quantity;
      
      if (product.stockQty < newQty) {
        return res.status(400).json({
          success: false,
          message: 'Insufficient stock for requested quantity'
        });
      }

      user.cart[existingItemIndex].qty = newQty;
    } else {
      // Add new item
      user.cart.push({
        productId,
        qty: quantity,
        variantId,
        addedAt: new Date()
      });
    }

    await user.save();

    // Populate and return updated cart
    const updatedUser = await User.findById(req.user._id)
      .populate({
        path: 'cart.productId',
        select: 'name slug price salePrice images brand stockQty isActive'
      });

    res.json({
      success: true,
      message: 'Item added to cart',
      items: updatedUser.cart.map(item => ({
        _id: item._id,
        product: item.productId,
        qty: item.qty,
        variantId: item.variantId,
        addedAt: item.addedAt
      }))
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add item to cart'
    });
  }
});

// Update cart item quantity
router.put('/update', authenticateUser, async (req, res) => {
  try {
    const { productId, quantity, variantId } = req.body;

    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be at least 1'
      });
    }

    // Validate product and stock
    const product = await Product.findOne({ 
      _id: productId, 
      isActive: true 
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    if (product.stockQty < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient stock'
      });
    }

    const user = await User.findById(req.user._id);

    // Find and update cart item
    const cartItem = user.cart.find(item => 
      item.productId.toString() === productId && 
      (!variantId || item.variantId?.toString() === variantId)
    );

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart'
      });
    }

    cartItem.qty = quantity;
    await user.save();

    // Populate and return updated cart
    const updatedUser = await User.findById(req.user._id)
      .populate({
        path: 'cart.productId',
        select: 'name slug price salePrice images brand stockQty isActive'
      });

    res.json({
      success: true,
      message: 'Cart updated',
      items: updatedUser.cart.map(item => ({
        _id: item._id,
        product: item.productId,
        qty: item.qty,
        variantId: item.variantId,
        addedAt: item.addedAt
      }))
    });
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update cart'
    });
  }
});

// Remove item from cart
router.delete('/remove', authenticateUser, async (req, res) => {
  try {
    const { productId, variantId } = req.body;

    const user = await User.findById(req.user._id);

    // Remove item from cart
    user.cart = user.cart.filter(item => 
      !(item.productId.toString() === productId && 
        (!variantId || item.variantId?.toString() === variantId))
    );

    await user.save();

    // Populate and return updated cart
    const updatedUser = await User.findById(req.user._id)
      .populate({
        path: 'cart.productId',
        select: 'name slug price salePrice images brand stockQty isActive'
      });

    res.json({
      success: true,
      message: 'Item removed from cart',
      items: updatedUser.cart.map(item => ({
        _id: item._id,
        product: item.productId,
        qty: item.qty,
        variantId: item.variantId,
        addedAt: item.addedAt
      }))
    });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove item from cart'
    });
  }
});

// Clear entire cart
router.delete('/clear', authenticateUser, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.cart = [];
    await user.save();

    res.json({
      success: true,
      message: 'Cart cleared',
      items: []
    });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to clear cart'
    });
  }
});

module.exports = router;