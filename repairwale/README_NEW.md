# 🚗 RepairWale — Full-Stack Platform

**An on-demand mechanic repair platform with authentication, service booking, real-time tracking, and Razorpay payments.**

[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18+-blue)](https://react.dev)
[![Express](https://img.shields.io/badge/Express-4.18+-yellow)](https://expressjs.com)

---

## ⚡ Quick Start (Windows)

### 1️⃣ Start Backend
```powershell
# Run this in Terminal 1
start-backend.bat
```

### 2️⃣ Start Frontend  
```powershell
# Run this in Terminal 2
start-frontend.bat
```

### 3️⃣ Open in Browser
Visit: **http://localhost:5173**

---

## 📋 Index (Choose Your Guide)

| Document | Purpose | Read Time |
|----------|---------|-----------|
| **[🔐 AUTH_SETUP.md](./AUTH_SETUP.md)** | Complete authentication system | 10 min |
| **[✅ TESTING_AUTH.md](./TESTING_AUTH.md)** | Step-by-step testing guide | 15 min |
| **[⚡ AUTH_QUICK_REF.md](./AUTH_QUICK_REF.md)** | Quick reference card | 3 min |
| **[💳 RAZORPAY_SETUP.md](./RAZORPAY_SETUP.md)** | Payment integration | 8 min |

---

## ✨ Features

### Authentication ✅
- ✅ Sign Up with validation
- ✅ Sign In with JWT
- ✅ Role selection (Customer/Mechanic)
- ✅ Password hashing (bcrypt)
- ✅ Persistent login (localStorage)
- ✅ Protected routes

### For Customers ✅
- ✅ Browse services
- ✅ Search nearby mechanics
- ✅ Track service in real-time
- ✅ Add to favorites
- ✅ Promo code support
- ✅ Order history
- ✅ Chat with mechanic

### For Mechanics ✅
- ✅ Manage services
- ✅ View incoming requests
- ✅ Update service status
- ✅ Real-time notifications
- ✅ Chat with customers

### Payments ✅
- ✅ Razorpay integration (test & live)
- ✅ 3-step checkout
- ✅ Promo code application
- ✅ Mock payments (for testing)
- ✅ Order verification
- ✅ Receipt generation

### UI/UX ✅
- ✅ Beautiful gradient design
- ✅ Smooth animations
- ✅ Responsive layout
- ✅ Dark theme
- ✅ Loading states
- ✅ Error handling

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│     Web Browser (React + Vite)          │
│     http://localhost:5173              │
├─────────────────────────────────────────┤
│  ├─ Authentication (Sign In/Up)        │
│  ├─ Service Booking                    │
│  ├─ Payment Checkout                   │
│  ├─ Order Tracking                     │
│  └─ Real-time Chat                     │
└────────────────┬────────────────────────┘
                 │
            HTTP + WebSocket
                 │
┌────────────────▼────────────────────────┐
│   Node.js Backend (Express)             │
│   http://localhost:3000                │
├─────────────────────────────────────────┤
│  ├─ Authentication API                 │
│  │  ├─ POST /api/auth/register        │
│  │  ├─ POST /api/auth/login           │
│  │  ├─ POST /api/auth/set-role        │
│  │  └─ GET /api/auth/me               │
│  ├─ Service APIs                       │
│  ├─ Payment APIs                       │
│  │  ├─ POST /api/create-order         │
│  │  └─ POST /api/verify-payment       │
│  ├─ Real-time Chat (Socket.io)        │
│  └─ Static File Serving               │
└────────────────────────────────────────┘
```

---

## 📁 File Structure

```
repairwale/
├── README.md                    ← You are here
├── AUTH_SETUP.md               # Auth system guide
├── TESTING_AUTH.md             # Testing guide
├── AUTH_QUICK_REF.md           # Quick reference
├── RAZORPAY_SETUP.md           # Payment guide
├── start-backend.bat           # Start backend
├── start-frontend.bat          # Start frontend
│
├── server/
│   ├── index.js               # Main backend (847 lines)
│   │   ├── Auth endpoints (lines 149-420)
│   │   ├── Service endpoints (lines 450-700)
│   │   ├── Payment endpoints (lines 780-850)
│   │   └── WebSocket setup
│   ├── package.json
│   ├── .env                   # Environment config
│   └── node_modules/
│
├── client/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── shared/
│   │   │   ├── pages/
│   │   │   │   ├── Login.jsx        (Sign In/Up page)
│   │   │   │   ├── RoleSelectionPage.jsx
│   │   │   │   └── ...
│   │   │   ├── context/
│   │   │   │   └── AuthContext.jsx  (Auth state)
│   │   │   ├── services/
│   │   │   │   ├── api.js          (API calls)
│   │   │   │   └── apiConfig.js    (API config)
│   │   │   └── components/
│   │   │       └── ProtectedRoute.jsx
│   │   ├── customer/
│   │   │   ├── pages/
│   │   │   │   ├── Checkout.jsx
│   │   │   │   ├── ServiceTracking.jsx
│   │   │   │   └── ...
│   │   │   └── components/
│   │   └── mechanic/
│   │       ├── pages/
│   │       └── components/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── node_modules/
│
├── mobile/
│   ├── App.js
│   ├── package.json
│   └── src/
│       ├── screens/
│       ├── navigation/
│       └── components/
│
└── .gitignore
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js v18+ ([Download](https://nodejs.org))
- npm v9+
- Git (optional, for version control)

### Step 1: Navigate to Project
```powershell
cd C:\Users\Lenovo\Desktop\CAPSTONE\repairwale
```

### Step 2: Install Backend
```powershell
cd server
npm install
```

### Step 3: Install Frontend
```powershell
cd ../client
npm install
```

### Step 4: Create .env (Optional for Razorpay)
```powershell
cd ../server
# File: .env
PORT=3000
JWT_SECRET=repairwale-secret-key
# Leave these empty for mock payments:
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

Done! ✅

---

## ▶️ Running the Application

### Option 1: Batch Files (EASIEST)
```powershell
# Terminal 1
start-backend.bat

# Terminal 2
start-frontend.bat
```

### Option 2: Manual Commands
```powershell
# Terminal 1: Backend
cd server
node index.js

# Terminal 2: Frontend
cd client
npm run dev
```

### Expected Output

**Backend:**
```
[RAZORPAY] ⚠ Keys not provided. Using MOCK payments.
RepairWale server running on http://localhost:3000
```

**Frontend:**
```
VITE v5.x.x ready in xxx ms
  ➜ Local: http://localhost:5173
```

---

## 🧪 Testing the Application

### 1. Sign Up
1. Go to **http://localhost:5173**
2. Click "Sign up"
3. Fill form with:
   - Name: Test User
   - Email: test@example.com
   - Phone: 9876543210
   - Password: Test@1234
   - Confirm: Test@1234
   - ☑️ Terms
4. Click "✨ Create Account"
5. ✅ Should redirect to role selection

### 2. Select Role
1. Choose "Customer" or "Mechanic"
2. ✅ Should redirect to dashboard

### 3. Test Features
- **Customer**: Browse services, add to cart, checkout
- **Mechanic**: Manage services, view requests

### 4. Test Payment (Mock)
1. Add items to cart
2. Go to checkout
3. Fill billing details
4. Select "Razorpay" payment
5. Click "Pay ₹XXX"
6. ✅ Mock Razorpay modal appears
7. Accept any card details
8. ✅ Payment succeeds

---

## 📱 API Reference

### Authentication Endpoints

**POST /api/auth/register**
```json
{
  "email": "user@example.com",
  "password": "Password123",
  "fullName": "John Doe"
}
```

**POST /api/auth/login**
```json
{
  "email": "user@example.com",
  "password": "Password123"
}
```

**POST /api/auth/set-role**
```json
{
  "role": "customer or mechanic"
}
```

👉 **Full API docs**: See [AUTH_SETUP.md](./AUTH_SETUP.md)

---

## 🔐 Security

✅ Password hashing with bcrypt  
✅ JWT token authentication (7-day expiry)  
✅ Protected routes with middleware  
✅ Email validation  
✅ Duplicate user prevention  
✅ CORS configuration  

---

## 🛠️ Environment Variables

Create `.env` in `server` folder:

```env
# Server
PORT=3000
JWT_SECRET=your_secret_key

# Razorpay (Optional - leave empty for mock mode)
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

---

## 📊 Database

Currently: **In-Memory** (users array in Node.js)
- Clears when server restarts
- Perfect for testing

For Production: Use MongoDB or PostgreSQL
- Update endpoints to use database queries
- Add persistent data storage

---

## 🚢 Deployment

### Deploy on Render
1. Push to GitHub
2. Create Web Service on [Render](https://render.com)
3. Set build command:
   ```
   cd ../client && npm install && npm run build && cd ../server && npm install
   ```
4. Set start command:
   ```
   node index.js
   ```

### Deploy on Railway
Similar steps to Render - build client, then start server

### Deploy on Vercel + Render
- Deploy frontend on Vercel
- Deploy backend on Render
- Update API URL in frontend

---

## 🐛 Troubleshooting

**Issue:** "Server connection failed"
```
✓ Solution: Make sure backend is running (node server/index.js)
```

**Issue:** Port 3000 in use
```
✓ Solution: Server will fallback to 3001, 3002, etc. Check terminal for actual port
```

**Issue:** Blank page on login
```
✓ Solution: Press F12, check console for errors, clear localStorage with localStorage.clear()
```

**Issue:** Can't sign up
```
✓ Solution: Use unique email each time (data clears on server restart)
```

---

## 📚 Documentation

| Document | Contains |
|----------|----------|
| **AUTH_SETUP.md** | Complete auth system + API reference + security info |
| **TESTING_AUTH.md** | Step-by-step testing scenarios + cURL examples |
| **AUTH_QUICK_REF.md** | Quick reference card + URLs + endpoints |
| **RAZORPAY_SETUP.md** | Payment integration + test cards + troubleshooting |

---

## 🎯 Next Steps

### Immediate
- [ ] Run `start-backend.bat`
- [ ] Run `start-frontend.bat`
- [ ] Test sign up at http://localhost:5173
- [ ] Test checkout with mock payment

### Short Term
- [ ] Get Razorpay credentials for live payments
- [ ] Add MongoDB database
- [ ] Set up Firebase Authentication
- [ ] Deploy to Render/Railway

### Long Term
- [ ] Mobile app (React Native)
- [ ] GPS real-time tracking
- [ ] Advanced analytics
- [ ] Admin dashboard
- [ ] Rating/review system

---

## 💡 Key Technologies

| Layer | Technology | Version |
|-------|-----------|---------|
| **Frontend** | React | 18.x |
| **Build Tool** | Vite | 5.x |
| **Backend** | Node.js + Express | 18+/4.18 |
| **Real-time** | Socket.io | 4.7 |
| **Authentication** | JWT | - |
| **Encryption** | bcrypt | 3.0 |
| **Payment** | Razorpay | 2.9 |

---

## 📞 Support

- **Backend Issues?** Check `server/index.js` and server console
- **Frontend Issues?** Check browser console (F12)
- **Auth Issues?** See [AUTH_SETUP.md](./AUTH_SETUP.md)
- **Payment Issues?** See [RAZORPAY_SETUP.md](./RAZORPAY_SETUP.md)

---

## 🎉 You're All Set!

Everything is configured and ready to use. Start the servers and enjoy! 🚀

**Questions?** Check the [comprehensive guides](#-documentation) above.

