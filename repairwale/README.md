# 🚗 RepairWale - On-Demand Mechanic Platform

Full-stack platform connecting customers with mechanics for roadside assistance and vehicle repairs.

## 🚀 Quick Start

**Prerequisites:** Node.js 16+

### Option 1: Root Workspace Command (Recommended)

```powershell
cd repairwale
npm install
npm run install:all
npm run dev
```

This starts backend and frontend together.

### Option 2: Use Batch Files (Windows)

```powershell
# Start everything
start-all.bat

# Or start individually
start-backend.bat    # Terminal 1
start-frontend.bat   # Terminal 2
```

### Option 3: Manual Start

```powershell
# Terminal 1 - Backend
cd server
npm install
npm start

# Terminal 2 - Frontend
cd client
npm install
npm run dev
```

**Access:** http://localhost:5173

---

## 📁 Project Structure

```
repairwale/
├── client/          # React + Vite frontend
├── server/          # Express + Socket.io backend
├── mobile/          # React Native mobile app
└── README.md        # This file
```

---

## ✨ Features

### Authentication
- JWT-based auth with bcrypt password hashing
- Role-based access (Customer/Mechanic)
- Protected routes

### For Customers
- Browse services & mechanics
- Interactive map view
- Real-time service tracking
- Chat with mechanic
- Razorpay payment integration
- Order history & favorites

### For Mechanics  
- Manage services
- Accept/update requests
- Real-time notifications
- Chat with customers
- Dashboard with stats

### Tech Stack
- **Frontend:** React 18, Vite, React Router, Leaflet Maps, Socket.io-client
- **Backend:** Express, Socket.io, JWT, bcrypt, Mongoose
- **Mobile:** React Native, Expo
- **Database:** MongoDB (ready, needs connection)
- **Payment:** Razorpay

---

## 🔧 Configuration

### Environment Variables

Copy `server/.env.example` to `server/.env` and set values as needed.

**Server (`server/.env`):**
```env
PORT=3000
JWT_SECRET=your_secure_secret_here
MONGODB_URI=your_mongodb_connection_string
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

### Database Setup (Free)

1. Create MongoDB Atlas account (free tier)
2. Create cluster
3. Get connection string
4. Add to `server/.env` as `MONGODB_URI`

---

## 📱 Mobile App

```powershell
cd mobile
npm install
npx expo start
```

Scan QR code with Expo Go app on your phone.

---

## 🤖 AI Chatbot Training (Large Dataset Ready)

The chatbot now supports server-side knowledge ingestion and retrieval.

### 1. Prepare Dataset

Use JSON array or JSONL format with records like:

```json
{
	"source": "faq-pricing",
	"title": "Pricing FAQ",
	"tags": ["pricing", "services"],
	"content": "Your long text content here..."
}
```

Sample file: `server/db/ai_knowledge.sample.json`

### 2. Import Dataset

```powershell
cd server
npm run ai:import -- .\db\ai_knowledge.sample.json --reset
```

For large datasets, split into multiple JSON/JSONL files and run imports in batches.

### 3. Runtime APIs

- `POST /api/ai/chat` - ask a question
- `POST /api/ai/knowledge/import` - ingest docs (supports reset)
- `POST /api/ai/knowledge/search` - retrieve top matches
- `GET /api/ai/knowledge/stats` - index statistics

Optional admin protection: set `AI_ADMIN_KEY` in `server/.env` and send header `x-ai-admin-key` for import endpoint.

### 4. Retrieval Mode (Option 1 Implemented)

The chatbot now uses **hybrid retrieval**:

- lexical token overlap scoring
- local embedding vector similarity (hashed embedding)

This improves semantic matching even when user wording differs from dataset text.

### 5. Evaluation Suite (Option 3 Implemented)

Run benchmark scoring with QA dataset:

```powershell
cd server
npm run ai:evaluate -- .\db\ai_eval.sample.json 4
```

Outputs:

- `retrievalHitRate` (expected source found in top-k)
- `answerKeywordScore` (answer includes expected terms)
- `combinedScore`

---

## 🚀 Deployment (100% Free Options)

### Backend + Frontend (All-in-one)
**Render.com** (Free tier)
- Auto-deploy from GitHub
- Built-in SSL
- 0 config needed

### Frontend Only
**Vercel/Netlify** (Free tier)
- Deploy client folder
- Point to separate backend API

### Database
**MongoDB Atlas** (Free tier)
- 512MB storage
- Shared cluster

---

## 🔒 Security Features

- Strong JWT secret generation
- Rate limiting (express-rate-limit)
- Helmet.js security headers
- Input validation (express-validator)
- Password hashing (bcrypt)
- CORS configuration

---

## 📝 Development

```powershell
# Build client for production
cd client
npm run build

# Preview production build
npm run preview

# Check for errors
npm audit

# Fix vulnerabilities
npm audit fix
```

---

## 🐛 Troubleshooting

**Port already in use:**
```powershell
# Server auto-tries ports 3000-3020
# Or manually set:
$env:PORT=4000; npm start
```

**Database not connecting:**
- Check MONGODB_URI in .env
- Verify network access in MongoDB Atlas (allow 0.0.0.0/0)
- App works without DB (data stored in memory)

**Payment not working:**
- Add Razorpay keys to .env
- Without keys, uses mock payment mode

---

## 📄 License

ISC

---

**Last Updated:** March 2026 
