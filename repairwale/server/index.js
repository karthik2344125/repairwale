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
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const { createKnowledgeEngine } = require('./ai/knowledgeEngine');
let Razorpay; // lazy require

// Database
const { connectDB, isDBConnected } = require('./db/connection');
const User = require('./models/User');
const Order = require('./models/Order');
const Message = require('./models/Message');

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

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false, // Disable for dev, enable in production
  crossOriginEmbedderPolicy: false
}));

// Rate limiting
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 requests per window
  message: { ok: false, error: 'Too many authentication attempts, please try again later' },
  standardHeaders: true,
  legacyHeaders: false,
});

const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60, // 60 requests per minute
  message: { ok: false, error: 'Too many requests, please slow down' }
});

app.use(express.json({ limit: '8mb' }));
app.use(morgan('tiny'));
app.use('/api', apiLimiter);
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

const aiKnowledgeEngine = createKnowledgeEngine({
  persistPath: path.join(__dirname, 'db', 'ai_knowledge.json')
});
aiKnowledgeEngine.load();
aiKnowledgeEngine.bootstrapDefaults();

function requireAIAdmin(req, res, next) {
  const adminKey = process.env.AI_ADMIN_KEY;
  if (!adminKey) return next();

  const requestKey = req.headers['x-ai-admin-key'];
  if (requestKey !== adminKey) {
    return res.status(403).json({ ok: false, error: 'Forbidden: invalid AI admin key' });
  }

  next();
}

// Serve static frontend: prefer production build in `client/dist` if present,
// otherwise fall back to serving the raw `client` directory (useful for prototype).
const clientRoot = path.join(__dirname, '..', 'client');
const clientDist = path.join(clientRoot, 'dist');
const servingDist = fs.existsSync(clientDist);
console.log('[STATIC] dist exists?', servingDist, 'path:', servingDist ? clientDist : clientRoot);
const isProduction = process.env.NODE_ENV === 'production';
const frontendDevUrl = process.env.FRONTEND_DEV_URL || 'http://localhost:5173';

// Health endpoints (must be defined before SPA catch-all)
app.get('/health', (req, res) => res.json({ ok: true, service: 'repairwale-server' }));
app.get('/api/health', (req, res) => res.json({ ok: true, service: 'repairwale-server' }));
app.get('/api/status', (req, res) => {
  res.json({
    ok: true,
    service: 'repairwale-server',
    environment: process.env.NODE_ENV || 'development',
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    database: {
      connected: isDBConnected()
    },
    aiKnowledge: {
      ...aiKnowledgeEngine.stats()
    }
  });
});

app.get('/api/ai/knowledge/stats', (req, res) => {
  res.json({ ok: true, stats: aiKnowledgeEngine.stats() });
});

app.post('/api/ai/knowledge/import', requireAIAdmin, (req, res) => {
  try {
    const { documents, reset = false, persist = true, chunkSize = 120, overlap = 24, sourcePrefix = 'dataset' } = req.body || {};

    if (!Array.isArray(documents) || !documents.length) {
      return res.status(400).json({ ok: false, error: 'documents[] is required' });
    }

    if (documents.length > 1000) {
      return res.status(400).json({ ok: false, error: 'Too many documents in one request (max 1000)' });
    }

    const sanitized = documents.map((doc, i) => ({
      source: doc.source || `${sourcePrefix}-${i + 1}`,
      title: String(doc.title || `Document ${i + 1}`),
      tags: Array.isArray(doc.tags) ? doc.tags.slice(0, 20) : [],
      content: String(doc.content || '').slice(0, 100000)
    })).filter((doc) => doc.content.trim().length > 0);

    if (!sanitized.length) {
      return res.status(400).json({ ok: false, error: 'No valid document content found' });
    }

    const result = aiKnowledgeEngine.ingestDocuments(sanitized, {
      resetBefore: Boolean(reset),
      sourcePrefix,
      chunkSize: Math.max(50, Math.min(Number(chunkSize) || 120, 300)),
      overlap: Math.max(0, Math.min(Number(overlap) || 24, 80))
    });

    if (persist) {
      aiKnowledgeEngine.save();
    }

    res.json({ ok: true, result, stats: aiKnowledgeEngine.stats() });
  } catch (error) {
    console.error('[AI] Import failed:', error);
    res.status(500).json({ ok: false, error: 'Failed to import AI knowledge documents' });
  }
});

app.post('/api/ai/knowledge/search', (req, res) => {
  try {
    const { query, topK = 5 } = req.body || {};
    if (!query || !String(query).trim()) {
      return res.status(400).json({ ok: false, error: 'query is required' });
    }

    const matches = aiKnowledgeEngine.search(String(query), Number(topK) || 5);
    res.json({ ok: true, matches });
  } catch (error) {
    console.error('[AI] Search failed:', error);
    res.status(500).json({ ok: false, error: 'Failed to search AI knowledge base' });
  }
});

app.post('/api/ai/chat', (req, res) => {
  try {
    const { message, topK = 4 } = req.body || {};
    if (!message || !String(message).trim()) {
      return res.status(400).json({ ok: false, error: 'message is required' });
    }

    const response = aiKnowledgeEngine.answerQuestion(String(message), Number(topK) || 4);
    res.json({ ok: true, ...response });
  } catch (error) {
    console.error('[AI] Chat failed:', error);
    res.status(500).json({ ok: false, error: 'AI chat failed' });
  }
});

if (isProduction) {
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
} else {
  // In development, always use Vite dev server so source edits hot-reload immediately.
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/socket.io')) return next();
    const target = `${frontendDevUrl}${req.originalUrl || '/'}`;
    return res.redirect(307, target);
  });
}

// API 404 fallback (moved to end below after route definitions)

// Mock mechanics data
const mechanics = [
  { id: 'm1', name: 'Ravi Auto Repair', lat: 28.6139, lng: 77.2090, rating: 4.6 },
  { id: 'm2', name: 'Sai Mechanics', lat: 28.6200, lng: 77.2100, rating: 4.4 },
  { id: 'm3', name: 'QuickFix Auto', lat: 28.6100, lng: 77.2000, rating: 4.7 }
];

const servicesCatalog = [
  {
    id: 'svc-breakdown-quick-fix',
    title: 'Breakdown Quick Fix',
    category: 'Emergency',
    price: 549,
    duration: '30-45 min',
    description: 'Rapid roadside diagnosis and temporary repair to get you moving.'
  },
  {
    id: 'svc-flat-tyre-assist',
    title: 'Flat Tyre Assist',
    category: 'Emergency',
    price: 399,
    duration: '20-35 min',
    description: 'On-site tyre replacement or puncture support.'
  },
  {
    id: 'svc-battery-jumpstart',
    title: 'Battery Jump-Start',
    category: 'Emergency',
    price: 299,
    duration: '15-25 min',
    description: 'Quick battery start support with basic electrical checks.'
  },
  {
    id: 'svc-basic-maintenance',
    title: 'Basic Service',
    category: 'Maintenance',
    price: 1299,
    duration: '60-90 min',
    description: 'General inspection, fluids top-up, and essential tune-up.'
  },
  {
    id: 'svc-comprehensive-maintenance',
    title: 'Comprehensive Service',
    category: 'Maintenance',
    price: 2299,
    duration: '90-150 min',
    description: 'Complete preventive maintenance and deep vehicle health check.'
  }
];
const runtimeMechanics = {}; // dynamic mechanic presence updates from app

function getMechanicPool() {
  const merged = [...mechanics];
  Object.values(runtimeMechanics).forEach((item) => {
    const idx = merged.findIndex((m) => m.id === item.id);
    if (idx >= 0) merged[idx] = { ...merged[idx], ...item };
    else merged.push(item);
  });
  return merged.filter((m) => m.isAvailable !== false);
}

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

function toUserId(user) {
  return user.id || user._id.toString();
}

async function getUserById(userId) {
  if (isDBConnected()) {
    return User.findById(userId);
  }
  return users.find(u => u.id === userId) || null;
}

// Register new user
app.post('/api/auth/register', authLimiter, [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('fullName').trim().isLength({ min: 2 })
], async (req, res) => {
  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ ok: false, error: errors.array()[0].msg });
    }
    const { email, password, fullName } = req.body;

    // Check if user already exists
    let existingUser;
    if (isDBConnected()) {
      existingUser = await User.findOne({ email: email.toLowerCase() });
    } else {
      existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    }
    
    if (existingUser) {
      return res.status(409).json({ 
        ok: false, 
        error: 'User with this email already exists' 
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser;
    if (isDBConnected()) {
      // Use MongoDB
      newUser = new User({
        email: email.toLowerCase(),
        password: hashedPassword,
        fullName: fullName.trim(),
        role: null
      });
      await newUser.save();
    } else {
    // Fallback to in-memory
      newUser = {
        id: `user_${uuidv4()}`,
        email: email.toLowerCase(),
        password: hashedPassword,
        fullName: fullName.trim(),
        role: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      users.push(newUser);
    }

    // Generate JWT token
    const userId = toUserId(newUser);
    const token = jwt.sign(
      { 
        id: userId,
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
        id: userId,
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
app.post('/api/auth/login', authLimiter, [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty()
], async (req, res) => {
  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ ok: false, error: 'Invalid input' });
    }

    const { email, password } = req.body;

    // Find user
    let user;
    if (isDBConnected()) {
      user = await User.findOne({ email: email.toLowerCase() });
    } else {
      user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    }
    
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
    const userId = toUserId(user);
    const token = jwt.sign(
      { 
        id: userId, 
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
        id: userId,
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
    const user = await getUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ 
        ok: false, 
        error: 'User not found' 
      });
    }

    user.role = role;
    if (isDBConnected()) {
      await user.save();
    } else {
      user.updatedAt = new Date().toISOString();
    }

    const userId = toUserId(user);

    console.log(`✅ User role updated: ${user.email} → ${role}`);

    res.json({
      ok: true,
      user: {
        id: userId,
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
    const user = await getUserById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ 
        ok: false, 
        error: 'User not found' 
      });
    }

    const userId = toUserId(user);

    res.json({
      ok: true,
      user: {
        id: userId,
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

app.get('/api/services', (req, res) => {
  res.json({ ok: true, services: servicesCatalog });
});

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
const dispatchRequests = []; // customer dispatch lifecycle
const dispatchTimers = {}; // { requestId: timeoutId }

function upsertMechanicRequest(mechanicId, request) {
  if (!mechanicRequests[mechanicId]) mechanicRequests[mechanicId] = [];
  const existingIndex = mechanicRequests[mechanicId].findIndex((r) => r.id === request.id);
  if (existingIndex >= 0) {
    mechanicRequests[mechanicId][existingIndex] = request;
  } else {
    mechanicRequests[mechanicId].push(request);
  }
}

function removeMechanicRequest(mechanicId, requestId) {
  const list = mechanicRequests[mechanicId] || [];
  mechanicRequests[mechanicId] = list.filter((r) => r.id !== requestId);
}

function toMechanicPreview(dispatch, mechanic, distanceKm) {
  return {
    id: dispatch.id,
    customerId: dispatch.customerId,
    customerName: dispatch.customerName,
    problem: dispatch.problem,
    location: dispatch.location.text,
    distance: `${distanceKm.toFixed(1)} km`,
    price: dispatch.estimatedPrice || 0,
    status: dispatch.status,
    createdAt: dispatch.createdAt,
    lat: dispatch.location.lat,
    lng: dispatch.location.lng,
    serviceItems: dispatch.serviceItems,
    rebroadcasted: dispatch.rebroadcasted || false
  }
}

function clearDispatchTimer(requestId) {
  const timer = dispatchTimers[requestId];
  if (timer) {
    clearTimeout(timer);
    delete dispatchTimers[requestId];
  }
}

function scheduleDispatchTimeout(dispatch) {
  clearDispatchTimer(dispatch.id);

  dispatchTimers[dispatch.id] = setTimeout(() => {
    const target = dispatchRequests.find((r) => r.id === dispatch.id);
    if (!target || target.status !== 'pending') {
      clearDispatchTimer(dispatch.id);
      return;
    }

    const expandedNearby = getNearbyMechanics(target.location.lat, target.location.lng, 25).slice(0, 12);
    target.rebroadcasted = true;
    target.events.push({ type: 'rebroadcast', at: Date.now(), message: 'No acceptance yet. Expanding search radius to more mechanics.' });

    expandedNearby.forEach((m) => {
      const preview = toMechanicPreview(target, m, Number(m.distance || 0));
      upsertMechanicRequest(m.id, preview);
      io.to(`mechanic:${m.id}`).emit('dispatch:new-request', preview);
    });

    io.to(`customer:${target.customerId}`).emit('dispatch:rebroadcast', target);
    io.to(`dispatch:${target.id}`).emit('dispatch:rebroadcast', target);

    dispatchTimers[target.id] = setTimeout(() => {
      const current = dispatchRequests.find((r) => r.id === target.id);
      if (!current || current.status !== 'pending') {
        clearDispatchTimer(target.id);
        return;
      }

      current.status = 'expired';
      current.events.push({ type: 'expired', at: Date.now(), message: 'No mechanics accepted this request in time.' });
      io.to(`customer:${current.customerId}`).emit('dispatch:expired', current);
      io.to(`dispatch:${current.id}`).emit('dispatch:expired', current);
      clearDispatchTimer(current.id);
    }, 60000);
  }, 25000);
}

app.post('/api/dispatch/create', (req, res) => {
  try {
    const {
      customerId,
      customerName,
      customerPhone,
      lat,
      lng,
      serviceItems,
      problem,
      locationText,
      estimatedPrice,
      orderId
    } = req.body || {};

    if (!customerName || !problem) {
      return res.status(400).json({ ok: false, error: 'customerName and problem are required' });
    }

    const requestId = `REQ-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const userLat = Number(lat) || 28.6139;
    const userLng = Number(lng) || 77.2090;
    const nearby = getNearbyMechanics(userLat, userLng, 15).slice(0, 6);

    const newDispatch = {
      id: requestId,
      orderId: orderId || null,
      customerId: customerId || 'guest-customer',
      customerName,
      customerPhone: customerPhone || '',
      location: {
        lat: userLat,
        lng: userLng,
        text: locationText || 'Customer location'
      },
      serviceItems: Array.isArray(serviceItems) ? serviceItems : [],
      problem,
      estimatedPrice: Number(estimatedPrice) || 0,
      status: 'pending',
      createdAt: Date.now(),
      assignedMechanicId: null,
      assignedMechanicName: null,
      events: [{ type: 'created', at: Date.now(), message: 'Request created and sent to nearby mechanics' }]
    };

    dispatchRequests.push(newDispatch);

    nearby.forEach((m) => {
      const preview = toMechanicPreview(newDispatch, m, Number(m.distance || 0));
      upsertMechanicRequest(m.id, preview);
      io.to(`mechanic:${m.id}`).emit('dispatch:new-request', preview);
    });

    scheduleDispatchTimeout(newDispatch);

    io.to(`customer:${newDispatch.customerId}`).emit('dispatch:created', {
      requestId,
      nearbyMechanics: nearby.length,
      createdAt: newDispatch.createdAt
    });

    res.json({ ok: true, request: newDispatch, nearbyMechanics: nearby.map((m) => ({ id: m.id, name: m.name, distance: m.distance })) });
  } catch (error) {
    console.error('[DISPATCH] create failed:', error);
    res.status(500).json({ ok: false, error: 'Failed to create dispatch request' });
  }
});

app.get('/api/dispatch/customer/:requestId', (req, res) => {
  const request = dispatchRequests.find((r) => r.id === req.params.requestId);
  if (!request) {
    return res.status(404).json({ ok: false, error: 'Dispatch request not found' });
  }
  res.json({ ok: true, request });
});

app.post('/api/dispatch/accept', (req, res) => {
  try {
    const { requestId, mechanicId } = req.body || {};
    if (!requestId || !mechanicId) {
      return res.status(400).json({ ok: false, error: 'requestId and mechanicId required' });
    }

    const dispatch = dispatchRequests.find((r) => r.id === requestId);
    if (!dispatch) return res.status(404).json({ ok: false, error: 'Dispatch not found' });
    if (dispatch.status !== 'pending') {
      return res.status(409).json({ ok: false, error: 'Request already accepted or closed', request: dispatch });
    }

    const mechanic = mechanics.find((m) => m.id === mechanicId);
    dispatch.status = 'accepted';
    dispatch.assignedMechanicId = mechanicId;
    dispatch.assignedMechanicName = mechanic?.name || `Mechanic ${mechanicId}`;
    dispatch.acceptedAt = Date.now();
    dispatch.events.push({ type: 'accepted', at: Date.now(), message: `${dispatch.assignedMechanicName} accepted the request` });
    clearDispatchTimer(dispatch.id);

    Object.keys(mechanicRequests).forEach((mId) => {
      if (mId !== mechanicId) removeMechanicRequest(mId, requestId);
    });

    const ownRequest = (mechanicRequests[mechanicId] || []).find((r) => r.id === requestId);
    if (ownRequest) {
      ownRequest.status = 'active';
      ownRequest.acceptedAt = dispatch.acceptedAt;
      ownRequest.assignedMechanicName = dispatch.assignedMechanicName;
      upsertMechanicRequest(mechanicId, ownRequest);
    }

    io.to(`customer:${dispatch.customerId}`).emit('dispatch:accepted', dispatch);
    io.to(`dispatch:${requestId}`).emit('dispatch:accepted', dispatch);

    res.json({ ok: true, request: dispatch });
  } catch (error) {
    console.error('[DISPATCH] accept failed:', error);
    res.status(500).json({ ok: false, error: 'Failed to accept dispatch request' });
  }
});

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

    const dispatch = dispatchRequests.find((d) => d.id === requestId);
    if (dispatch && dispatch.status === 'pending') {
      const mechanic = mechanics.find((m) => m.id === mechanicId);
      dispatch.status = 'accepted';
      dispatch.assignedMechanicId = mechanicId;
      dispatch.assignedMechanicName = mechanic?.name || `Mechanic ${mechanicId}`;
      dispatch.acceptedAt = Date.now();
      dispatch.events.push({ type: 'accepted', at: Date.now(), message: `${dispatch.assignedMechanicName} accepted the request` });
      clearDispatchTimer(dispatch.id);

      Object.keys(mechanicRequests).forEach((mId) => {
        if (mId !== mechanicId) removeMechanicRequest(mId, requestId);
      });

      io.to(`customer:${dispatch.customerId}`).emit('dispatch:accepted', dispatch);
      io.to(`dispatch:${requestId}`).emit('dispatch:accepted', dispatch);
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

    removeMechanicRequest(mechanicId, requestId);

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

app.post('/api/mechanic/presence/update', (req, res) => {
  try {
    const { mechanicId, name, lat, lng, isAvailable = true, rating, serviceAreaKm = 15 } = req.body || {};
    if (!mechanicId) return res.status(400).json({ ok: false, error: 'mechanicId required' });

    const existing = runtimeMechanics[mechanicId] || {};
    runtimeMechanics[mechanicId] = {
      ...existing,
      id: mechanicId,
      name: name || existing.name || `Mechanic ${mechanicId}`,
      lat: Number(lat) || existing.lat || 28.6139,
      lng: Number(lng) || existing.lng || 77.2090,
      rating: Number(rating) || existing.rating || 4.5,
      isAvailable: Boolean(isAvailable),
      serviceAreaKm: Number(serviceAreaKm) || existing.serviceAreaKm || 15,
      updatedAt: Date.now()
    };

    io.to(`mechanic:${mechanicId}`).emit('mechanic:presence-updated', runtimeMechanics[mechanicId]);
    res.json({ ok: true, mechanic: runtimeMechanics[mechanicId] });
  } catch (error) {
    console.error('[MECHANIC] presence update failed:', error);
    res.status(500).json({ ok: false, error: 'Failed to update mechanic presence' });
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
  return getMechanicPool().map(m => ({
    ...m,
    distance: calculateDistance(userLat, userLng, m.lat, m.lng)
  })).filter(m => m.distance <= radiusKm);
}

function getCustomerLocationForOrder(orderId) {
  const dispatch = dispatchRequests.find((r) => r.id === orderId || r.orderId === orderId)
  if (dispatch?.location?.lat && dispatch?.location?.lng) {
    return { lat: Number(dispatch.location.lat), lng: Number(dispatch.location.lng) }
  }
  return null
}

function buildMechanicLocationPayload(orderId, location) {
  const payload = {
    location,
    timestamp: location?.timestamp || Date.now()
  }

  const customerLoc = getCustomerLocationForOrder(orderId)
  if (customerLoc && typeof location?.lat === 'number' && typeof location?.lng === 'number') {
    const distance = calculateDistance(location.lat, location.lng, customerLoc.lat, customerLoc.lng)
    payload.distance = Number(distance.toFixed(2))
    payload.eta = `${Math.max(1, Math.round(distance * 2.5))} min`
  }

  return payload
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

  socket.on('dispatch:join', ({ role, id, requestId }) => {
    if (role === 'mechanic' && id) socket.join(`mechanic:${id}`);
    if (role === 'customer' && id) socket.join(`customer:${id}`);
    if (requestId) socket.join(`dispatch:${requestId}`);
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

    if (mechanicLocations[orderId]) {
      io.to(room).emit('mechanic-location-update', buildMechanicLocationPayload(orderId, mechanicLocations[orderId]));
    }
    
    // Simulate mechanic location updates (in production, this would come from mechanic's app)
    const interval = setInterval(() => {
      const existing = mechanicLocations[orderId];
      const existingTs = Number(existing?.timestamp || 0);
      const hasFreshRealLocation = existing && (Date.now() - existingTs) < 15000;

      if (hasFreshRealLocation) {
        io.to(room).emit('mechanic-location-update', buildMechanicLocationPayload(orderId, existing));
        return;
      }

      const baseLocation = existing || {
        lat: 28.6139 + (Math.random() - 0.5) * 0.1,
        lng: 77.2090 + (Math.random() - 0.5) * 0.1
      };
      
      // Simulate movement towards customer
      const location = {
        lat: baseLocation.lat + (Math.random() - 0.5) * 0.001,
        lng: baseLocation.lng + (Math.random() - 0.5) * 0.001,
        timestamp: Date.now()
      };
      
      mechanicLocations[orderId] = location;

      io.to(room).emit('mechanic-location-update', buildMechanicLocationPayload(orderId, location));
    }, 5000); // Update every 5 seconds

    const stopTrackingHandler = ({ orderId: stopOrderId } = {}) => {
      if (stopOrderId && stopOrderId !== orderId) return;
      clearInterval(interval);
      socket.off('stop-tracking', stopTrackingHandler);
    };

    socket.on('stop-tracking', stopTrackingHandler);

    socket.on('disconnect', () => {
      clearInterval(interval);
      socket.off('stop-tracking', stopTrackingHandler);
    });
  });

  socket.on('update-mechanic-location', ({ orderId, location }) => {
    // Mechanic app sends real location
    mechanicLocations[orderId] = location;
    const room = `gps:${orderId}`;
    io.to(room).emit('mechanic-location-update', buildMechanicLocationPayload(orderId, location));
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
      io.to(`gps:${orderId}`).emit('mechanic-location-update', buildMechanicLocationPayload(orderId, mechanicLocations[orderId]));
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

// Start server with database connection
async function startServer() {
  try {
    // Connect to database first (optional, continues without DB if not available)
    await connectDB();
    
    // Then start listening
    startListening(currentPort);
  } catch (error) {
    console.error('[STARTUP ERROR]', error);
    console.log('[STARTUP] Starting server without database...');
    startListening(currentPort);
  }
}

startServer();

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
