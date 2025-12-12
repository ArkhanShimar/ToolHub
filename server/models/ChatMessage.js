const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  messages: [{
    sender: {
      type: String,
      enum: ['user', 'admin'],
      required: true
    },
    text: {
      type: String,
      required: true
    },
    image: {
      url: String,
      alt: String
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    read: {
      type: Boolean,
      default: false
    }
  }],
  status: {
    type: String,
    enum: ['active', 'closed', 'archived'],
    default: 'active'
  },
  lastMessageAt: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update lastMessageAt when new message is added
chatMessageSchema.pre('save', function(next) {
  if (this.isModified('messages')) {
    this.lastMessageAt = Date.now();
  }
  this.updatedAt = Date.now();
  next();
});

// Indexes
chatMessageSchema.index({ userId: 1 });
chatMessageSchema.index({ status: 1 });
chatMessageSchema.index({ lastMessageAt: -1 });

module.exports = mongoose.model('ChatMessage', chatMessageSchema);