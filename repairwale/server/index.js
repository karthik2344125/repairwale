const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const morgan = require('morgan');
const crypto = require('crypto');
let Razorpay; // lazy require

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// -------- Global error safety nets ----------
process.on('uncaughtException', (err) => {
  console.error('[FATAL] Uncaught Exception:', err.stack || err);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('[FATAL] Unhandled Rejection at:', promise, 'reason:', reason);
});
let basePort = parseInt(process.env.PORT,10) || 3000;
let currentPort = basePort;
let maxPortAttempts = 20;
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    if (currentPort < basePort + maxPortAttempts) {
      const nextPort = currentPort + 1;
      console.warn(`[PORT] ${currentPort} in use. Attempting fallback port ${nextPort} ...`);
      currentPort = nextPort;
      setTimeout(() => startListening(currentPort), 250);
      return;
    } else {
      console.error('[PORT] Exhausted fallback attempts. Last tried port:', currentPort);
    }
  }
  console.error('[SERVER ERROR]', err);
});
process.on('beforeExit', (code) => {
  console.log('[PROCESS beforeExit] code:', code);
});
process.on('exit', (code) => {
  console.log('[PROCESS exit] code:', code);
});
['SIGINT','SIGTERM','SIGQUIT'].forEach(sig => {
  process.on(sig, () => {
    console.log(`[SIGNAL] ${sig} received. Shutting down server...`)
    process.exit(0)
  })
})

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
// Razorpay init (only if env vars present)
const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;
let razorpayInstance = null;
if (razorpayKeyId && razorpayKeySecret) {
  try {
    Razorpay = require('razorpay');
    razorpayInstance = new Razorpay({ key_id: razorpayKeyId, key_secret: razorpayKeySecret });
    console.log('[RAZORPAY] Initialized');
  } catch (e) {
    console.error('[RAZORPAY] Initialization failed', e);
  }
} else {
  console.warn('[RAZORPAY] Keys not provided. Using mock order endpoints.');
}

const fs = require('fs');

// Serve static frontend: prefer production build in `client/dist` if present,
// otherwise fall back to serving the raw `client` directory (useful for prototype).
const clientRoot = path.join(__dirname, '..', 'client');
const clientDist = path.join(clientRoot, 'dist');
const servingDist = fs.existsSync(clientDist);
console.log('[STATIC] dist exists?', servingDist, 'path:', servingDist ? clientDist : clientRoot);
app.use('/', express.static(servingDist ? clientDist : clientRoot, {
  setHeaders: (res) => {
    res.setHeader('Cache-Control','no-store'); // ensure latest build served after changes
  }
}));

// For SPA client-side routing, serve index.html for any unknown GET route
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api') || req.path.startsWith('/socket.io')) return next();
  const indexPath = servingDist ? path.join(clientDist, 'index.html') : path.join(clientRoot, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.error('[STATIC] index.html missing. Did you run build? Expected at', indexPath);
    return res.status(500).send('Build not found. Run "npm run build" in client folder.');
  }
  res.sendFile(indexPath);
});

// API 404 fallback (moved to end below after route definitions)

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

// In-memory storage for chat and tracking
const chatHistory = {}; // { orderId: [messages] }
const mechanicLocations = {}; // { orderId: { lat, lng, timestamp } }

// Socket.io for real-time chat, GPS tracking, and presence
io.on('connection', (socket) => {
  console.log('✅ Socket connected:', socket.id);

  // Legacy chat support
  socket.on('join', (room) => {
    socket.join(room);
    console.log(`${socket.id} joined ${room}`);
  });

  socket.on('leave', (room) => {
    socket.leave(room);
  });

  socket.on('message', (payload) => {
    if (payload && payload.room) {
      io.to(payload.room).emit('message', { from: payload.from, text: payload.text, ts: Date.now() });
    }
  });

  // Real-time chat for orders
  socket.on('join-chat', ({ orderId, userRole, userName }) => {
    const room = `chat:${orderId}`;
    socket.join(room);
    console.log(`💬 ${userName} (${userRole}) joined chat for order ${orderId}`);
    
    // Send chat history
    if (chatHistory[orderId]) {
      socket.emit('chat-history', chatHistory[orderId]);
    }
  });

  socket.on('send-message', (message) => {
    const room = `chat:${message.orderId}`;
    
    // Store message
    if (!chatHistory[message.orderId]) {
      chatHistory[message.orderId] = [];
    }
    chatHistory[message.orderId].push(message);
    
    // Broadcast to all in room
    io.to(room).emit('chat-message', message);
    console.log(`💬 Message sent in order ${message.orderId}:`, message.text.substring(0, 30));
  });

  socket.on('typing', ({ orderId, userName }) => {
    const room = `chat:${orderId}`;
    socket.to(room).emit('user-typing', { userName });
  });

  socket.on('leave-chat', ({ orderId }) => {
    const room = `chat:${orderId}`;
    socket.leave(room);
  });

  // Live GPS tracking
  socket.on('track-mechanic', ({ orderId, mechanicId }) => {
    const room = `gps:${orderId}`;
    socket.join(room);
    console.log(`📍 Started GPS tracking for order ${orderId}`);
    
    // Simulate mechanic location updates (in production, this would come from mechanic's app)
    const interval = setInterval(() => {
      const baseLocation = mechanicLocations[orderId] || { 
        lat: 28.6139 + (Math.random() - 0.5) * 0.1, 
        lng: 77.2090 + (Math.random() - 0.5) * 0.1 
      };
      
      // Simulate movement towards customer
      const location = {
        lat: baseLocation.lat + (Math.random() - 0.5) * 0.001,
        lng: baseLocation.lng + (Math.random() - 0.5) * 0.001
      };
      
      mechanicLocations[orderId] = location;
      
      // Calculate mock distance and ETA
      const distance = (Math.random() * 5 + 0.5).toFixed(1); // 0.5-5.5 km
      const eta = `${Math.round(distance * 1.5)} min`;
      
      io.to(room).emit('mechanic-location-update', {
        location,
        distance: parseFloat(distance),
        eta,
        timestamp: Date.now()
      });
    }, 5000); // Update every 5 seconds
    
    socket.on('stop-tracking', () => {
      clearInterval(interval);
    });
  });

  socket.on('update-mechanic-location', ({ orderId, location }) => {
    // Mechanic app sends real location
    mechanicLocations[orderId] = location;
    const room = `gps:${orderId}`;
    io.to(room).emit('mechanic-location-update', {
      location,
      timestamp: Date.now()
    });
  });

  socket.on('disconnect', () => {
    console.log('❌ Socket disconnected:', socket.id);
  });
});

function startListening(port){
  try {
    server.listen(port, () => console.log(`RepairWale server running on http://localhost:${port}`));
  } catch(e){
    console.error('[START ERROR]', e);
  }
}
startListening(currentPort);

// -----------------------
// Mock Razorpay endpoints (replace with real Razorpay integration)
// -----------------------
// To implement real payments:
//  - install `razorpay` npm package
//  - use your Razorpay key_id and key_secret on server-side to create orders
//  - expose an endpoint like POST /api/create-order that creates an order using Razorpay SDK
//  - verify payment signatures on server-side in a /api/verify-payment endpoint

app.get('/api/razorpay-key', (req, res) => {
  res.json({ ok: true, key: razorpayKeyId || null });
});

app.post('/api/create-order', async (req, res) => {
  const { amount } = req.body || {};
  if (!amount) return res.status(400).json({ ok: false, error: 'amount required' });

  // amount expected in rupees; Razorpay wants paise
  if (razorpayInstance) {
    try {
      const order = await razorpayInstance.orders.create({
        amount: Math.round(amount * 100),
        currency: 'INR',
        receipt: 'rw_' + Date.now(),
        notes: { platform: 'repairwale' }
      });
      return res.json({ ok: true, order });
    } catch (e) {
      console.error('[RAZORPAY] order create failed', e);
      return res.status(500).json({ ok: false, error: 'order_failed' });
    }
  }
  // fallback mock
  const mock = {
    id: `order_mock_${uuidv4()}`,
    amount,
    currency: 'INR',
    status: 'created'
  };
  res.json({ ok: true, order: mock, mock: true });
});

app.post('/api/verify-payment', (req, res) => {
  const { order_id, payment_id, signature } = req.body || {};
  if (!order_id || !payment_id) return res.status(400).json({ ok: false, error: 'order_id and payment_id required' });
  if (razorpayInstance && signature) {
    try {
      const hmac = crypto.createHmac('sha256', razorpayKeySecret);
      hmac.update(order_id + '|' + payment_id);
      const expected = hmac.digest('hex');
      const verified = expected === signature;
      return res.json({ ok: verified, order_id, payment_id, verified });
    } catch (e) {
      console.error('[RAZORPAY] verify failed', e);
      return res.status(500).json({ ok: false, error: 'verify_failed' });
    }
  }
  // fallback always ok
  res.json({ ok: true, order_id, payment_id, verified: true, mock: true });
});

// Final API 404 fallback now that all API routes are defined
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ ok:false, error:'Not found' });
  }
  next();
});
