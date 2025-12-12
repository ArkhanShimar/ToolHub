const express = require('express');
const User = require('../models/User');
const { authenticateUser } = require('../middleware/auth');
const router = express.Router();

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { firebaseUID, name, email, phone, address } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ firebaseUID }, { email }] 
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    // Create new user
    const user = new User({
      firebaseUID,
      name,
      email,
      phone,
      address,
      lastLogin: new Date()
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error.message
    });
  }
});

// Get current user
router.get('/me', authenticateUser, async (req, res) => {
  try {
    // Update last login
    req.user.lastLogin = new Date();
    await req.user.save();

    res.json({
      success: true,
      user: {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        phone: req.user.phone,
        address: req.user.address,
        notifications: req.user.notifications,
        lastLogin: req.user.lastLogin
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get user data'
    });
  }
});

// Update user profile
router.put('/profile', authenticateUser, async (req, res) => {
  try {
    const { name, phone, address } = req.body;

    // Update user fields
    if (name) req.user.name = name;
    if (phone) req.user.phone = phone;
    if (address) req.user.address = { ...req.user.address, ...address };

    await req.user.save();

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        phone: req.user.phone,
        address: req.user.address
      }
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile'
    });
  }
});

// Get user notifications
router.get('/notifications', authenticateUser, async (req, res) => {
  try {
    const notifications = req.user.notifications
      .sort((a, b) => b.date - a.date)
      .slice(0, 20); // Get latest 20 notifications

    res.json({
      success: true,
      notifications
    });
  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get notifications'
    });
  }
});

// Mark notification as read
router.put('/notifications/:id/read', authenticateUser, async (req, res) => {
  try {
    const notification = req.user.notifications.id(req.params.id);
    
    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    notification.read = true;
    await req.user.save();

    res.json({
      success: true,
      message: 'Notification marked as read'
    });
  } catch (error) {
    console.error('Mark notification read error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to mark notification as read'
    });
  }
});

// Mark all notifications as read
router.put('/notifications/read-all', authenticateUser, async (req, res) => {
  try {
    req.user.notifications.forEach(notification => {
      notification.read = true;
    });
    
    await req.user.save();

    res.json({
      success: true,
      message: 'All notifications marked as read'
    });
  } catch (error) {
    console.error('Mark all notifications read error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to mark all notifications as read'
    });
  }
});

module.exports = router;