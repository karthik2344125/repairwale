const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());
app.use(express.json());

const fs = require('fs');

// Serve static frontend: prefer production build in `client/dist` if present,
// otherwise fall back to serving the raw `client` directory (useful for prototype).
const clientRoot = path.join(__dirname, '..', 'client');
const clientDist = path.join(clientRoot, 'dist');
if (fs.existsSync(clientDist)) {
  app.use('/', express.static(clientDist));
} else {
  app.use('/', express.static(clientRoot));
}

// For SPA client-side routing, serve index.html for any unknown GET route
app.get('*', (req, res, next) => {
  // skip API routes
  if (req.path.startsWith('/api') || req.path.startsWith('/socket.io')) return next()

  const indexPath = fs.existsSync(clientDist)
    ? path.join(clientDist, 'index.html')
    : path.join(clientRoot, 'index.html')

  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath)
  } else {
    next()
  }
})

// Mock mechanics data
const mechanics = [
  { id: 'm1', name: 'Ravi Auto Repair', lat: 28.6139, lng: 77.2090, rating: 4.6 },
  { id: 'm2', name: 'Sai Mechanics', lat: 28.6200, lng: 77.2100, rating: 4.4 },
  { id: 'm3', name: 'QuickFix Garage', lat: 28.6100, lng: 77.2000, rating: 4.7 }
];

app.get('/api/mechanics', (req, res) => {
  res.json(mechanics);
});

// Create a service request
app.post('/api/request', (req, res) => {
  const { customerName, lat, lng, problem } = req.body;
  const requestId = uuidv4();
  const request = { id: requestId, customerName, lat, lng, problem, status: 'searching', createdAt: Date.now() };

  // Broadcast to mechanics (in real app you'd notify nearby mechanics)
  io.emit('new_request', request);

  res.json({ ok: true, request });
});

// Simple health
app.get('/health', (req, res) => res.json({ ok: true }));

// Socket.io for chat and simple presence
io.on('connection', (socket) => {
  console.log('socket connected', socket.id);

  socket.on('join', (room) => {
    socket.join(room);
    console.log(`${socket.id} joined ${room}`);
  });

  socket.on('leave', (room) => {
    socket.leave(room);
  });

  socket.on('message', (payload) => {
    // payload: { room, from, text }
    if (payload && payload.room) {
      io.to(payload.room).emit('message', { from: payload.from, text: payload.text, ts: Date.now() });
    }
  });

  socket.on('disconnect', () => {
    console.log('socket disconnect', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`RepairWale server running on http://localhost:${PORT}`));

// -----------------------
// Mock Razorpay endpoints (replace with real Razorpay integration)
// -----------------------
// To implement real payments:
//  - install `razorpay` npm package
//  - use your Razorpay key_id and key_secret on server-side to create orders
//  - expose an endpoint like POST /api/create-order that creates an order using Razorpay SDK
//  - verify payment signatures on server-side in a /api/verify-payment endpoint

app.post('/api/create-order', (req, res) => {
  // Expected body: { amount } (amount in rupees or smallest currency unit depending on your implementation)
  const { amount } = req.body || {};
  if (!amount) return res.status(400).json({ ok: false, error: 'amount required' });

  // Mock order object — in production replace with Razorpay order creation
  const order = {
    id: `order_mock_${uuidv4()}`,
    amount,
    currency: 'INR',
    status: 'created'
  };

  res.json({ ok: true, order });
});

app.post('/api/verify-payment', (req, res) => {
  // Expecting { order_id, payment_id, signature }
  // In production verify signature using Razorpay keys.
  const { order_id, payment_id, signature } = req.body || {};
  if (!order_id || !payment_id) return res.status(400).json({ ok: false, error: 'order_id and payment_id required' });

  // For prototype we accept any payment and respond ok.
  res.json({ ok: true, order_id, payment_id, verified: true });
});
