const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  mechanic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  service: {
    name: String,
    price: Number,
    duration: Number
  },
  location: {
    address: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'in-progress', 'completed', 'cancelled'],
    default: 'pending',
    index: true
  },
  payment: {
    method: String,
    status: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending'
    },
    transactionId: String,
    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,
    amount: Number,
    paidAt: Date
  },
  promoCode: {
    code: String,
    discount: Number
  },
  totalAmount: Number,
  finalAmount: Number,
  notes: String,
  timeline: [{
    status: String,
    timestamp: Date,
    note: String
  }],
  rating: {
    stars: Number,
    review: String,
    createdAt: Date
  }
}, {
  timestamps: true
});

orderSchema.index({ customer: 1, createdAt: -1 });
orderSchema.index({ mechanic: 1, status: 1 });

module.exports = mongoose.model('Order', orderSchema);
