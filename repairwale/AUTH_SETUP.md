# Authentication System Guide

## ✅ Current Status

The authentication system includes:
- ✅ Backend API endpoints (Node.js + Express + JWT)
- ✅ Frontend Sign-up and Sign-in pages (React)
- ✅ Password hashing (bcrypt)
- ✅ JWT token management
- ✅ Role-based routing

---

## 🚀 Quick Start

### Step 1: Start Backend Server

Open Terminal 1:
```bash
cd c:\Users\Lenovo\Desktop\CAPSTONE\repairwale\server
node index.js
```

**Expected Output:**
```
[RAZORPAY] ⚠ Keys not provided. Using MOCK payments.
[RAZORPAY] To enable live payments: ...
[STATIC] dist exists? false
RepairWale server running on http://localhost:3000
```

The server will use port 3000, or fallback to 3001-3020 if port is in use.

---

### Step 2: Start Frontend

Open Terminal 2:
```bash
cd c:\Users\Lenovo\Desktop\CAPSTONE\repairwale\client
npm run dev
```

Or right-click `index.html` → Open with Live Server

---

## 📋 API Endpoints

### 1. **Register (Sign Up)**
```
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "fullName": "John Doe"
}
```

**Success Response (201):**
```json
{
  "ok": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_12345",
    "email": "user@example.com",
    "fullName": "John Doe",
    "role": null,
    "createdAt": "2026-02-21T10:30:00.000Z"
  }
}
```

**Error Responses:**
- 400: "Email and password are required"
- 400: "Invalid email format"
- 400: "Password must be at least 6 characters long"
- 409: "User with this email already exists"

---

### 2. **Login**
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "ok": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_12345",
    "email": "user@example.com",
    "fullName": "John Doe",
    "role": null,
    "createdAt": "2026-02-21T10:30:00.000Z"
  }
}
```

**Error Responses:**
- 400: "Email and password are required"
- 401: "Invalid email or password"

---

### 3. **Set User Role**
```
POST /api/auth/set-role
Content-Type: application/json
Authorization: Bearer {token}

{
  "role": "customer" or "mechanic"
}
```

**Success Response (200):**
```json
{
  "ok": true,
  "user": {
    "id": "user_12345",
    "email": "user@example.com",
    "fullName": "John Doe",
    "role": "customer"
  }
}
```

---

### 4. **Get Current User Profile**
```
GET /api/auth/me
Authorization: Bearer {token}
```

**Success Response (200):**
```json
{
  "ok": true,
  "user": {
    "id": "user_12345",
    "email": "user@example.com",
    "fullName": "John Doe",
    "role": "customer",
    "createdAt": "2026-02-21T10:30:00.000Z"
  }
}
```

---

## 🧪 Testing with cURL

### Test Signup:
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@example.com",
    "password": "Test@1234",
    "fullName": "Test User"
  }'
```

### Test Login:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@example.com",
    "password": "Test@1234"
  }'
```

### Test Set Role (use token from login/signup):
```bash
curl -X POST http://localhost:3000/api/auth/set-role \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {your_token_here}" \
  -d '{"role": "customer"}'
```

### Test Get Profile:
```bash
curl http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer {your_token_here}"
```

---

## 🔄 Frontend Authentication Flow

### Sign Up Flow:
1. User enters email, password, phone, full name
2. Clicks "Create Account"
3. Frontend sends **POST /api/auth/register**
4. Backend creates user and sends JWT token
5. Frontend stores token in localStorage
6. Auto-redirects to `/role-selection`
7. User selects customer or mechanic role
8. Frontend sends **POST /api/auth/set-role**
9. Redirects to appropriate dashboard

### Sign In Flow:
1. User enters email and password
2. Clicks "Sign In"
3. Frontend sends **POST /api/auth/login**
4. Backend verifies credentials, sends JWT token
5. Frontend stores token in localStorage
6. Auto-redirects to `/role-selection` (or dashboard if role already set)

---

## 📱 Frontend Components

### **Login.jsx** (`client/src/shared/pages/Login.jsx`)
- Sign up form with validation
- Sign in form with validation
- Beautiful gradient UI with animations
- Error and success messages
- Loading states

### **AuthContext.jsx** (`client/src/shared/context/AuthContext.jsx`)
- Manages user authentication state
- Stores user data and JWT token
- Handles login/logout/role selection
- Persists auth across page refreshes

---

## 🔐 Security Features

✅ **Password Hashing**: bcrypt with salt
✅ **JWT Tokens**: 7-day expiration
✅ **Token Verification**: All protected endpoints check token
✅ **Email Validation**: Regex validation
✅ **Duplicate User Check**: Can't register same email twice

---

## 🧠 In-Memory Database

Currently, users are stored in memory (not persisted):
- Server restart = all users cleared
- For production, use MongoDB, PostgreSQL, etc.

To add real database support:
1. Set up database (MongoDB, PostgreSQL, etc.)
2. Replace `users` array with database queries
3. Update `register`, `login`, `set-role`, `auth/me` endpoints

---

## 🐛 Troubleshooting

### Issue: "Server connection failed"
**Causes:**
- Backend not running
- Backend running on different port
- CORS issue

**Solution:**
```bash
# Check backend is running
ps aux | grep "node index.js"

# Check listening port
netstat -tuln | grep LISTEN
```

### Issue: "Invalid email or password"
**Possible causes:**
- Wrong credentials
- User not registered yet
- Email case-sensitive check

**Solution:**
- Double-check email and password
- Try registering new account first

### Issue: "Invalid or expired token"
**Causes:**
- Token expired (7 days)
- Token was tampered with
- Wrong JWT_SECRET on server

**Solution:**
- Log out and log back in
- Clear localStorage: `localStorage.clear()`

---

## 💾 Data Storage

### Frontend (localStorage):
```javascript
localStorage.setItem('repairwale_token', token)
localStorage.setItem('repairwale_user', JSON.stringify(user))
localStorage.setItem('rw_role_locked', role)
```

### Backend (in-memory):
```javascript
const users = [
  {
    id: "user_xxx",
    email: "user@example.com",
    password: "hashed_password",
    fullName: "John Doe",
    role: "customer",
    createdAt: "2026-02-21T10:30:00.000Z"
  }
]
```

---

## 🎯 Next Steps

1. ✅ Start backend: `node server/index.js`
2. ✅ Start frontend: `npm run dev`
3. ✅ Test signup with new account
4. ✅ Test login with same account
5. ✅ Select role (customer/mechanic)
6. ✅ Access dashboard features

---

## 📚 Files Reference

- **Frontend Auth**: `/client/src/shared/pages/Login.jsx`
- **Auth Context**: `/client/src/shared/context/AuthContext.jsx`
- **Protected Routes**: `/client/src/shared/components/ProtectedRoute.jsx`
- **Backend Auth Endpoints**: `/server/index.js` (lines 149-420)
- **JWT Secret Config**: `/server/.env`

