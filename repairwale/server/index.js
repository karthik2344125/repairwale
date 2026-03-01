require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const morgan = require('morgan');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
let Razorpay; // lazy require

// JWT secret (in production, use environment variable)
const JWT_SECRET = process.env.JWT_SECRET || 'repairwale-secret-key-change-in-production';

const app = express();
const server = http.createServer(app);

// Enhanced CORS configuration for development
const corsOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:5500',
  'http://127.0.0.1:5500',
  'http://localhost:5501',
  'http://127.0.0.1:5501',
  'http://localhost:8000',
  'http://127.0.0.1:8000',
  'http://localhost:8080',
  'http://127.0.0.1:8080',
  /http:\/\/localhost:\d+/,
  /http:\/\/127\.0\.0\.1:\d+/,
  /http:\/\/192\.168\.[0-9]+\.[0-9]+:\d+/,
];

const io = new Server(server, {
  cors: {
    origin: true,  // Allow all origins in development
    methods: ['GET','POST'],
    credentials: true
  }
});

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

app.use(cors({
  origin: true,  // Allow all origins in development
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
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
    console.log('[RAZORPAY] ✓ Initialized with live credentials (Key ID: ' + razorpayKeyId.substring(0, 10) + '...)');
  } catch (e) {
    console.error('[RAZORPAY] ✗ Initialization failed', e);
    console.error('[RAZORPAY] Make sure "razorpay" npm package is installed');
  }
} else {
  console.warn('[RAZORPAY] ⚠ Keys not provided. Using MOCK payments.');
  console.warn('[RAZORPAY] To enable live payments:');
  console.warn('[RAZORPAY]   1. Create .env file in server folder');
  console.warn('[RAZORPAY]   2. Add: RAZORPAY_KEY_ID=your_key_id');
  console.warn('[RAZORPAY]   3. Add: RAZORPAY_KEY_SECRET=your_key_secret');
  console.warn('[RAZORPAY]   4. Restart server');
}

const fs = require('fs');

// Serve static frontend: prefer production build in `client/dist` if present,
// otherwise fall back to serving the raw `client` directory (useful for prototype).
const clientRoot = path.join(__dirname, '..', 'client');
const clientDist = path.join(clientRoot, 'dist');
const servingDist = fs.existsSync(clientDist);
console.log('[STATIC] dist exists?', servingDist, 'path:', servingDist ? clientDist : clientRoot);

// Health endpoints (must be defined before SPA catch-all)
app.get('/health', (req, res) => res.json({ ok: true, service: 'repairwale-server' }));
app.get('/api/health', (req, res) => res.json({ ok: true, service: 'repairwale-server' }));

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
  { id: 'm3', name: 'QuickFix Auto', lat: 28.6100, lng: 77.2000, rating: 4.7 }
];

// In-memory users database (in production, use a real database)
const users = [];

// In-memory orders database (in production, use a real database)
const orders = [];

// ==================== AUTHENTICATION ENDPOINTS ====================

// Input validation helper
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  return password && password.length >= 6;
}

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ ok: false, error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ ok: false, error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
}

// Register new user
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, fullName } = req.body;

    // Validate input
    if (!email || !password || !fullName) {
      return res.status(400).json({ 
        ok: false, 
        error: 'Email, password, and full name are required' 
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ 
        ok: false, 
        error: 'Invalid email format' 
      });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({ 
        ok: false, 
        error: 'Password must be at least 6 characters long' 
      });
    }

    if (fullName.trim().length < 2) {
      return res.status(400).json({ 
        ok: false, 
        error: 'Full name must be at least 2 characters long' 
      });
    }

    // Check if user already exists
    const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      return res.status(409).json({ 
        ok: false, 
        error: 'User with this email already exists' 
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = {
      id: `user_${uuidv4()}`,
      email: email.toLowerCase(),
      password: hashedPassword,
      fullName: fullName.trim(),
      role: null, // Role will be set later
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    users.push(newUser);

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: newUser.id, 
        email: newUser.email,
        fullName: newUser.fullName
      }, 
      JWT_SECRET, 
      { expiresIn: '7d' }
    );

    console.log(`✅ New user registered: ${newUser.email}`);

    // Return user data without password
    res.status(201).json({
      ok: true,
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        fullName: newUser.fullName,
        role: newUser.role,
        createdAt: newUser.createdAt
      }
    });

  } catch (error) {
    console.error('[REGISTER ERROR]', error);
    res.status(500).json({ 
      ok: false, 
      error: 'Server error during registration' 
    });
  }
});

// Login user
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ 
        ok: false, 
        error: 'Email and password are required' 
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ 
        ok: false, 
        error: 'Invalid email format' 
      });
    }

    // Find user
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return res.status(401).json({ 
        ok: false, 
        error: 'Invalid email or password' 
      });
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ 
        ok: false, 
        error: 'Invalid email or password' 
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email,
        fullName: user.fullName,
        role: user.role
      }, 
      JWT_SECRET, 
      { expiresIn: '7d' }
    );

    console.log(`✅ User logged in: ${user.email}`);

    // Return user data without password
    res.json({
      ok: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        createdAt: user.createdAt
      }
    });

  } catch (error) {
    console.error('[LOGIN ERROR]', error);
    res.status(500).json({ 
      ok: false, 
      error: 'Server error during login' 
    });
  }
});

// Update user role
app.post('/api/auth/set-role', authenticateToken, async (req, res) => {
  try {
    const { role } = req.body;

    // Validate role
    const validRoles = ['customer', 'mechanic'];
    if (!role || !validRoles.includes(role)) {
      return res.status(400).json({ 
        ok: false, 
        error: 'Valid role is required (customer or mechanic)' 
      });
    }

    // Find and update user
    const user = users.find(u => u.id === req.user.id);
    if (!user) {
      return res.status(404).json({ 
        ok: false, 
        error: 'User not found' 
      });
    }

    user.role = role;
    user.updatedAt = new Date().toISOString();

    console.log(`✅ User role updated: ${user.email} → ${role}`);

    res.json({
      ok: true,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role
      }
    });

  } catch (error) {
    console.error('[SET-ROLE ERROR]', error);
    res.status(500).json({ 
      ok: false, 
      error: 'Server error updating role' 
    });
  }
});

// Get current user profile
app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    const user = users.find(u => u.id === req.user.id);
    
    if (!user) {
      return res.status(404).json({ 
        ok: false, 
        error: 'User not found' 
      });
    }

    res.json({
      ok: true,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        createdAt: user.createdAt
      }
    });

  } catch (error) {
    console.error('[ME ERROR]', error);
    res.status(500).json({ 
      ok: false, 
      error: 'Server error fetching profile' 
    });
  }
});

// ==================== END AUTHENTICATION ====================

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

// -------- Mechanic-specific API endpoints --------

// In-memory storage for mechanic data (in production, use a database)
const mechanicRequests = {}; // { mechanicId: [requests] }
const mechanicStats = {}; // { mechanicId: { todayJobs, todayEarnings, monthlyJobs, monthlyEarnings } }

// Get requests for a specific mechanic
app.get('/api/mechanic/requests', (req, res) => {
  try {
    const mechanicId = req.query.mechanicId || 'default-mechanic';
    const requests = mechanicRequests[mechanicId] || [];
    res.json({ ok: true, requests });
  } catch (error) {
    console.error('[MECHANIC] Error fetching requests:', error);
    res.status(500).json({ ok: false, error: 'Failed to fetch requests' });
  }
});

// Accept a service request
app.post('/api/mechanic/accept-request', (req, res) => {
  try {
    const { mechanicId, requestId } = req.body;
    if (!mechanicId || !requestId) {
      return res.status(400).json({ ok: false, error: 'mechanicId and requestId required' });
    }

    const requests = mechanicRequests[mechanicId] || [];
    const requestIndex = requests.findIndex(r => r.id === requestId);
    
    if (requestIndex === -1) {
      return res.status(404).json({ ok: false, error: 'Request not found' });
    }

    requests[requestIndex].status = 'accepted';
    requests[requestIndex].acceptedAt = Date.now();
    mechanicRequests[mechanicId] = requests;

    // Notify customer via socket
    io.emit('request-accepted', { requestId, mechanicId });

    res.json({ ok: true, request: requests[requestIndex] });
  } catch (error) {
    console.error('[MECHANIC] Error accepting request:', error);
    res.status(500).json({ ok: false, error: 'Failed to accept request' });
  }
});

// Reject a service request
app.post('/api/mechanic/reject-request', (req, res) => {
  try {
    const { mechanicId, requestId } = req.body;
    if (!mechanicId || !requestId) {
      return res.status(400).json({ ok: false, error: 'mechanicId and requestId required' });
    }

    const requests = mechanicRequests[mechanicId] || [];
    mechanicRequests[mechanicId] = requests.filter(r => r.id !== requestId);

    res.json({ ok: true });
  } catch (error) {
    console.error('[MECHANIC] Error rejecting request:', error);
    res.status(500).json({ ok: false, error: 'Failed to reject request' });
  }
});

// Complete a job
app.post('/api/mechanic/complete-job', (req, res) => {
  try {
    const { mechanicId, requestId, earnings } = req.body;
    if (!mechanicId || !requestId) {
      return res.status(400).json({ ok: false, error: 'mechanicId and requestId required' });
    }

    const requests = mechanicRequests[mechanicId] || [];
    const requestIndex = requests.findIndex(r => r.id === requestId);
    
    if (requestIndex !== -1) {
      requests[requestIndex].status = 'completed';
      requests[requestIndex].completedAt = Date.now();
      mechanicRequests[mechanicId] = requests;
    }

    // Update stats
    if (!mechanicStats[mechanicId]) {
      mechanicStats[mechanicId] = { todayJobs: 0, todayEarnings: 0, monthlyJobs: 0, monthlyEarnings: 0 };
    }
    
    mechanicStats[mechanicId].todayJobs += 1;
    mechanicStats[mechanicId].monthlyJobs += 1;
    mechanicStats[mechanicId].todayEarnings += earnings || 0;
    mechanicStats[mechanicId].monthlyEarnings += earnings || 0;

    res.json({ ok: true, stats: mechanicStats[mechanicId] });
  } catch (error) {
    console.error('[MECHANIC] Error completing job:', error);
    res.status(500).json({ ok: false, error: 'Failed to complete job' });
  }
});

// Get mechanic stats
app.get('/api/mechanic/stats', (req, res) => {
  try {
    const mechanicId = req.query.mechanicId || 'default-mechanic';
    const stats = mechanicStats[mechanicId] || {
      todayJobs: 0,
      todayEarnings: 0,
      monthlyJobs: 0,
      monthlyEarnings: 0,
      rating: 4.7,
      totalReviews: 0
    };
    res.json({ ok: true, stats });
  } catch (error) {
    console.error('[MECHANIC] Error fetching stats:', error);
    res.status(500).json({ ok: false, error: 'Failed to fetch stats' });
  }
});

// -------- End Mechanic API endpoints --------

// In-memory storage for chat and tracking
const chatHistory = {}; // { orderId: [messages] }
const mechanicLocations = {}; // { orderId: { lat, lng, timestamp } }
const userLocations = {}; // { userId: { lat, lng, timestamp } }
const userToSocket = {}; // { userId: socketId }

// Helper: Calculate distance between two coordinates (Haversine formula)
function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Helper: Get mechanics near a location
function getNearbyMechanics(userLat, userLng, radiusKm = 10) {
  return mechanics.map(m => ({
    ...m,
    distance: calculateDistance(userLat, userLng, m.lat, m.lng)
  })).filter(m => m.distance <= radiusKm);
}

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
    // Clean up user location
    Object.keys(userToSocket).forEach(userId => {
      if (userToSocket[userId] === socket.id) {
        delete userToSocket[userId];
        delete userLocations[userId];
      }
    });
  });

  // ============ REAL-TIME LOCATION TRACKING ============
  
  socket.on('user:location', (data) => {
    const { userId, lat, lng, timestamp } = data;
    
    // Store user location
    userLocations[userId] = { lat, lng, timestamp };
    userToSocket[userId] = socket.id;
    
    // Join user-specific room
    socket.join(`user:${userId}`);
    socket.join('location:updates');
    
    // Get nearby mechanics
    const nearby = getNearbyMechanics(lat, lng, 15); // 15km radius
    
    // Send nearby mechanics to user
    socket.emit('mechanics:nearby', nearby);
    
    // Broadcast user location to nearby mechanics
    io.to('location:updates').emit('user:location-update', {
      userId,
      lat,
      lng,
      timestamp
    });
    
    console.log(`📍 User ${userId} at (${lat.toFixed(4)}, ${lng.toFixed(4)}) - ${nearby.length} nearby mechanics`);
  });

  socket.on('mechanic:location', (data) => {
    const { mechanicId, lat, lng, orderId, timestamp } = data;
    
    // Update mechanic location
    if (orderId) {
      mechanicLocations[orderId] = { lat, lng, timestamp };
    }
    
    socket.join(`mechanic:${mechanicId}`);
    
    // Broadcast mechanic location update
    io.to('location:updates').emit('mechanic:location-update', {
      mechanicId,
      lat,
      lng,
      timestamp,
      orderId
    });
    
    console.log(`🔧 Mechanic ${mechanicId} at (${lat.toFixed(4)}, ${lng.toFixed(4)})`);
  });

  socket.on('request:nearby-mechanics', (data) => {
    const { lat, lng, radius = 10 } = data;
    const nearby = getNearbyMechanics(lat, lng, radius);
    socket.emit('mechanics:nearby', nearby);
  });

  socket.on('request:user-location', (userId) => {
    const location = userLocations[userId];
    if (location) {
      socket.emit('user:location-found', { userId, ...location });
    } else {
      socket.emit('user:location-not-found', { userId });
    }
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
// Payment Endpoints
// =====================================

app.get('/api/razorpay-key', (req, res) => {
  const key = razorpayKeyId || null;
  const mode = razorpayInstance ? 'live' : 'mock';
  console.log(`[RAZORPAY-KEY] Requested | Mode: ${mode}`);
  res.json({ ok: true, key, mode });
});

app.post('/api/create-order', async (req, res) => {
  const { amount } = req.body || {};
  if (!amount) return res.status(400).json({ ok: false, error: 'amount required' });

  console.log(`[ORDER] Creating order | Amount: ₹${amount}`);

  // Simple order ID - minimal data
  const orderId = `order_${uuidv4()}`;
  const amountInPaise = Math.round(amount * 100);

  if (razorpayInstance) {
    try {
      const razorpayOrder = await razorpayInstance.orders.create({
        amount: amountInPaise,
        currency: 'INR',
        receipt: orderId
      });
      console.log(`[ORDER] ✓ Created | Order ID: ${orderId} | Razorpay: ${razorpayOrder.id}`);
      return res.json({ 
        ok: true, 
        order: {
          id: orderId,
          razorpayOrderId: razorpayOrder.id,
          amount: amount,
          currency: 'INR'
        }
      });
    } catch (e) {
      console.error('[ORDER] ✗ Failed to create', e.message);
      return res.status(500).json({ ok: false, error: 'order_failed' });
    }
  }
  
  // Mock mode
  const mockOrderId = `order_mock_${uuidv4()}`;
  console.log(`[ORDER] ⚠ Mock | Order ID: ${orderId}`);
  res.json({ 
    ok: true, 
    order: {
      id: orderId,
      razorpayOrderId: mockOrderId,
      amount: amount,
      currency: 'INR'
    }
  });
});

app.post('/api/verify-payment', (req, res) => {
  const { order_id, payment_id, signature } = req.body || {};
  if (!order_id || !payment_id) {
    return res.status(400).json({ ok: false, error: 'order_id and payment_id required' });
  }
  
  console.log(`[VERIFICATION] Verifying | Order: ${order_id} | Payment: ${payment_id}`);

  if (razorpayInstance && signature) {
    try {
      const hmac = crypto.createHmac('sha256', razorpayKeySecret);
      hmac.update(order_id + '|' + payment_id);
      const expected = hmac.digest('hex');
      const verified = expected === signature;
      console.log(`[VERIFICATION] ${verified ? '✓ Valid' : '✗ Invalid'}`);
      return res.json({ ok: verified, verified: verified });
    } catch (e) {
      console.error('[VERIFICATION] ✗ Failed', e.message);
      return res.status(500).json({ ok: false, error: 'verify_failed' });
    }
  }
  
  // Mock mode - always accept
  console.log(`[VERIFICATION] ⚠ Mock | Payment accepted`);
  res.json({ ok: true, verified: true });
});

// ==================== ORDER RETRIEVAL ENDPOINTS ====================

// Get all orders for a user
app.get('/api/orders', (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ ok: false, error: 'userId query parameter required' });
  }
  
  const userOrders = orders.filter(o => o.userId === userId);
  console.log(`[ORDERS] Fetched ${userOrders.length} orders for user ${userId}`);
  
  res.json({ 
    ok: true, 
    orders: userOrders.map(o => ({
      id: o.id,
      status: o.status,
      amount: o.amountInRupees,
      currency: o.currency,
      promoCode: o.promoCode,
      itemCount: o.items ? o.items.length : 0,
      billing: o.billing,
      createdAt: o.createdAt,
      updatedAt: o.updatedAt
    })),
    total: userOrders.length
  });
});

// Get a specific order by ID
app.get('/api/orders/:orderId', (req, res) => {
  const { orderId } = req.params;
  const order = orders.find(o => o.id === orderId);
  
  if (!order) {
    console.log(`[ORDER] Not found: ${orderId}`);
    return res.status(404).json({ ok: false, error: 'Order not found' });
  }
  
  console.log(`[ORDER] Fetched: ${orderId}`);
  res.json({ 
    ok: true, 
    order: {
      id: order.id,
      status: order.status,
      amount: order.amountInRupees,
      subtotal: order.subtotal,
      discount: order.discount,
      tax: order.tax,
      currency: order.currency,
      promoCode: order.promoCode,
      billing: order.billing,
      items: order.items,
      paymentDetails: order.paymentDetails,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt
    }
  });
});

// Get all orders (admin view) - useful for dashboard
app.get('/api/admin/orders', (req, res) => {
  const { status, limit = 50 } = req.query;
  
  let filtered = orders;
  if (status) {
    filtered = orders.filter(o => o.status === status);
  }
  
  const limited = filtered.slice(-parseInt(limit)).reverse();
  console.log(`[ADMIN-ORDERS] Fetched ${limited.length} orders (filtered by status: ${status || 'all'})`);
  
  res.json({ 
    ok: true, 
    orders: limited.map(o => ({
      id: o.id,
      userId: o.userId,
      status: o.status,
      amount: o.amountInRupees,
      customerName: o.billing?.fullName || 'Unknown',
      customerPhone: o.billing?.phone || 'N/A',
      itemCount: o.items ? o.items.length : 0,
      createdAt: o.createdAt
    })),
    total: filtered.length
  });
});

// ==================== UPI PAYMENT ENDPOINT ====================

app.post('/api/create-upi-order', async (req, res) => {
  const { amount, phone } = req.body || {};
  if (!amount || !phone) return res.status(400).json({ ok: false, error: 'amount and phone required' });

  console.log(`[UPI-ORDER] Creating | Amount: ₹${amount} | Phone: ${phone}`);

  const upiOrderId = `upi_${uuidv4()}`;
  const upiLink = `upi://pay?pa=repairwale@bank&pn=RepairWale&am=${amount}&tr=${upiOrderId}&tn=Payment`;
  
  console.log(`[UPI-ORDER] ✓ Created | Order ID: ${upiOrderId}`);

  res.json({ 
    ok: true, 
    order: {
      id: upiOrderId,
      amount: amount,
      currency: 'INR',
      upiLink: upiLink,
      phone: phone
    }
  });
});

app.post('/api/verify-upi-payment', (req, res) => {
  const { orderId, transactionId, phone } = req.body || {};
  if (!orderId || !transactionId) {
    return res.status(400).json({ ok: false, error: 'orderId and transactionId required' });
  }

  console.log(`[UPI-VERIFY] Verifying | Order: ${orderId} | Tx: ${transactionId}`);
  
  // Mock verification
  console.log(`[UPI-VERIFY] ✓ Payment verified`);
  res.json({ 
    ok: true, 
    verified: true
  });
});

// ==================== WALLET PAYMENT ENDPOINT ====================

const walletBalance = {};

app.get('/api/wallet/balance', (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ ok: false, error: 'userId required' });

  const balance = walletBalance[userId] || 10000;
  console.log(`[WALLET] Balance | User: ${userId} | Balance: ₹${balance}`);

  res.json({ 
    ok: true, 
    balance: balance
  });
});

app.post('/api/process-wallet-payment', async (req, res) => {
  const { amount, userId } = req.body || {};
  if (!amount || !userId) {
    return res.status(400).json({ ok: false, error: 'amount and userId required' });
  }

  console.log(`[WALLET] Processing | User: ${userId} | Amount: ₹${amount}`);

  const balance = walletBalance[userId] || 10000;
  if (balance < amount) {
    console.log(`[WALLET] ✗ Insufficient balance`);
    return res.status(400).json({ 
      ok: false, 
      error: 'insufficient_balance'
    });
  }

  walletBalance[userId] = balance - amount;
  console.log(`[WALLET] ✓ Payment processed | New balance: ₹${walletBalance[userId]}`);

  res.json({ 
    ok: true, 
    newBalance: walletBalance[userId],
    previousBalance: balance
  });
});

// ==================== PAYMENT METHOD STATUS CHECK ====================

app.get('/api/payment-methods/available', (req, res) => {
  const { userId } = req.query;
  
  // Check which payment methods are available
  const methods = {
    razorpay: {
      enabled: true,
      name: 'Razorpay',
      description: 'Credit/Debit Card, Net Banking, UPI',
      icon: '💳',
      status: razorpayInstance ? 'live' : 'mock'
    },
    upi: {
      enabled: true,
      name: 'UPI',
      description: 'Google Pay, PhonePe, Paytm, WhatsApp Pay',
      icon: '📱',
      status: 'available'
    },
    wallet: {
      enabled: true,
      name: 'RepairWale Wallet',
      description: 'Instant payment with wallet credits',
      icon: '👛',
      status: 'available',
      balance: userId ? (walletBalance[userId] || 10000) : null
    }
  };

  console.log(`[PAYMENT-METHODS] Checked available methods${userId ? ` for user ${userId}` : ''}`);
  res.json({ ok: true, methods });
});

// Final API 404 fallback now that all API routes are defined
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ ok:false, error:'Not found' });
  }
  next();
});
