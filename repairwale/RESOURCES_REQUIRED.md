# RepairWale - Required Resources & Setup Guide

## 🚀 Current Status

✅ **Backend Server:** Running on http://localhost:3000  
✅ **Frontend Server:** Running on http://localhost:5173  
✅ **API Endpoints:** Working properly  
⚠️ **Payments:** Using MOCK mode (Razorpay keys not configured)  
⚠️ **Firebase:** Using demo credentials (needs real project setup)

---

## 📋 Required Resources Checklist

### 1. **Environment Variables**

#### Backend (.env in `server/` folder)
```env
# Server Configuration
PORT=3000

# JWT Secret (CHANGE IN PRODUCTION!)
JWT_SECRET=repairwale-secret-key-change-in-production

# Razorpay Configuration (Optional for now - using MOCK payments)
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

# Email Configuration (Optional)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_email@example.com
SMTP_PASSWORD=your_password
```

#### Frontend (.env.local in `client/` folder)
```env
# Backend API Configuration
VITE_API_URL=http://localhost:3000/api
VITE_API_PORT=3000
VITE_API_HOST=localhost
```

---

### 2. **Firebase Setup** (Required for Authentication)

#### Current Status:
- Using demo/placeholder Firebase credentials
- **Action Required:** Create a real Firebase project

#### Steps to Setup Firebase:

1. **Create Firebase Project:**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Add Project"
   - Enter project name: "RepairWale" or similar
   - Disable Google Analytics (optional)

2. **Enable Authentication:**
   - Go to Authentication → Sign-in method
   - Enable Email/Password authentication
   - Enable Google Sign-in (optional)
   - Enable Phone authentication (optional for mobile)

3. **Create Firestore Database:**
   - Go to Firestore Database
   - Create database in test mode (for development)
   - Set location (e.g., asia-south1 for India)

4. **Get Configuration:**
   - Go to Project Settings → General
   - Scroll down to "Your apps"
   - Click Web icon (</>) to add a web app
   - Register app as "RepairWale Web"
   - Copy the firebaseConfig object

5. **Update Configuration File:**
   - Edit `client/src/firebaseConfig.js`
   - Replace demo credentials with your real config:
   ```javascript
   export default {
     apiKey: "YOUR_ACTUAL_API_KEY",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789012",
     appId: "1:123456789012:web:abc123def456"
   };
   ```

6. **Setup Firestore Collections:**
   Required collections:
   - `users` - User profiles and data
   - `requests` - Service requests
   - `messages` - Chat messages
   - `mechanics` - Mechanic profiles
   - `reviews` - Service reviews

---

### 3. **Razorpay Payment Gateway** (Optional - For Live Payments)

#### Current Status:
- Using MOCK payments (no real transactions)
- Works for development and testing

#### To Enable Real Payments:

1. **Create Razorpay Account:**
   - Go to [Razorpay Dashboard](https://dashboard.razorpay.com/)
   - Sign up / Login
   - Complete KYC verification (required for live mode)

2. **Get API Keys:**
   - Go to Settings → API Keys
   - Generate Test Keys (for development)
   - Generate Live Keys (for production, after KYC)

3. **Update Backend .env:**
   ```env
   RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
   RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxx
   ```

4. **Restart Backend Server:**
   ```powershell
   cd c:\Users\Lenovo\Desktop\CAPSTONE\repairwale
   .\start-backend.bat
   ```

---

### 4. **Google Maps API** (Required for Location Services)

#### Current Status:
- Using Leaflet (OpenStreetMap) - works without API key
- For Google Maps features, need API key

#### To Enable Google Maps:

1. **Create Google Cloud Project:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create new project: "RepairWale"

2. **Enable APIs:**
   - Enable Maps JavaScript API
   - Enable Places API
   - Enable Geocoding API
   - Enable Directions API

3. **Create API Key:**
   - Go to APIs & Services → Credentials
   - Create API Key
   - Restrict key (recommended):
     - HTTP referrers: `localhost:*`, `127.0.0.1:*`
     - API restrictions: Select only required APIs

4. **Add to Frontend:**
   - Update `.env.local`:
   ```env
   VITE_GOOGLE_MAPS_API_KEY=YOUR_API_KEY_HERE
   ```

---

### 5. **Node.js Dependencies**

#### Backend Dependencies:
```json
{
  "bcryptjs": "^3.0.3",        // Password hashing
  "cors": "^2.8.5",             // Cross-origin requests
  "dotenv": "^17.3.1",          // Environment variables
  "express": "^4.18.2",         // Web framework
  "jsonwebtoken": "^9.0.3",     // JWT authentication
  "morgan": "^1.10.0",          // HTTP logging
  "nodemailer": "^8.0.1",       // Email service
  "razorpay": "^2.9.6",         // Payment gateway
  "socket.io": "^4.7.2",        // Real-time communication
  "uuid": "^9.0.0"              // Unique IDs
}
```

#### Frontend Dependencies:
```json
{
  "react": "18.2.0",
  "react-dom": "18.2.0",
  "react-router-dom": "^6.14.1",
  "firebase": "^9.23.0",
  "socket.io-client": "^4.7.2",
  "leaflet": "^1.9.4",
  "@react-google-maps/api": "^2.20.2",
  "vite": "^5.1.0",
  "@vitejs/plugin-react": "^4.2.0"
}
```

**Installation Status:** ✅ All dependencies installed and working

---

### 6. **Database/Storage**

#### Current Status:
- Using in-memory storage (data lost on server restart)
- Suitable for development only

#### For Production:
Need to implement persistent storage. Options:

**Option A: Firestore (Recommended)**
- Already integrated with Firebase
- Real-time updates
- Easy to use
- Good for mobile apps

**Option B: MongoDB**
- More flexible queries
- Better for complex data
- Need separate setup

**Option C: PostgreSQL**
- Relational database
- ACID compliant
- Need separate setup

---

## 🔧 API Endpoints Available

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/set-role` - Set user role
- `GET /api/auth/me` - Get current user

### Mechanics
- `GET /api/mechanics` - Get all mechanics
- `GET /api/mechanic/requests` - Get mechanic's requests
- `POST /api/mechanic/accept-request` - Accept service request
- `POST /api/mechanic/reject-request` - Reject service request
- `POST /api/mechanic/complete-job` - Complete job
- `GET /api/mechanic/stats` - Get mechanic statistics

### Service Requests
- `POST /api/request` - Create service request

### Payments
- `GET /api/razorpay-key` - Get Razorpay public key
- `POST /api/create-order` - Create payment order
- `POST /api/verify-payment` - Verify payment

### Health Check
- `GET /health` - Server health check

---

## 🚦 How to Start Development

### Quick Start (Windows):
```powershell
cd c:\Users\Lenovo\Desktop\CAPSTONE\repairwale

# Start everything (recommended)
.\start-all.bat

# OR start individually
.\start-backend.bat   # Terminal 1
.\start-frontend.bat  # Terminal 2
```

### Access Points:
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3000/api
- **Health Check:** http://localhost:3000/health

---

## ⚠️ Important Notes

### For Development (Current Setup):
- ✅ Firebase demo credentials work for testing
- ✅ MOCK payments work without Razorpay
- ✅ Leaflet maps work without Google Maps API
- ✅ In-memory storage works for testing

### For Production:
- ❌ Must setup real Firebase project
- ❌ Must setup Razorpay (if accepting payments)
- ❌ Must implement persistent database
- ❌ Must secure JWT_SECRET
- ❌ Must setup proper CORS origins
- ❌ Must enable HTTPS
- ❌ Must add rate limiting
- ❌ Must add proper error logging

---

## 📱 Mobile App Resources

The mobile app (in `mobile/` folder) requires:
- React Native / Expo setup
- Same Firebase configuration
- Android/iOS development environment
- Google Maps API (for mobile)

---

## 🔐 Security Checklist

- [ ] Change JWT_SECRET to strong random value
- [ ] Enable Firebase security rules
- [ ] Restrict API keys (domain/IP restrictions)
- [ ] Enable HTTPS in production
- [ ] Add rate limiting (express-rate-limit)
- [ ] Validate all user inputs
- [ ] Sanitize data before storing
- [ ] Enable CORS only for trusted domains
- [ ] Keep dependencies updated
- [ ] Add request logging and monitoring

---

## 📚 Additional Documentation

- [30 Second Guide](./30_SECOND_GUIDE.md)
- [Auth Setup Guide](./AUTH_SETUP.md)
- [Testing Guide](./TESTING_AUTH.md)
- [Razorpay Setup](./RAZORPAY_SETUP.md)
- [Main README](./README.md)

---

## 🆘 Need Help?

### Common Issues:

**Backend not starting:**
- Check if port 3000 is available
- Run `npm install` in server folder
- Check for errors in terminal

**Frontend not loading:**
- Check if port 5173 is available
- Run `npm install` in client folder
- Clear browser cache

**API calls failing:**
- Check backend is running
- Check console for CORS errors
- Verify API URL in apiConfig.js

**Firebase errors:**
- Check firebaseConfig.js has valid credentials
- Check Firebase project is active
- Enable Authentication in Firebase Console

---

**Last Updated:** February 22, 2026  
**Status:** Development Environment Ready ✅
