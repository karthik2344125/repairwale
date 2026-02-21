# 🔐 Authentication Quick Reference

## 🚀 Start Both Servers (Windows)

### Option 1: Use Batch Files (Easiest)
```bash
# Terminal 1
start-backend.bat

# Terminal 2  
start-frontend.bat
```

### Option 2: Manual
```bash
# Terminal 1
cd server && node index.js

# Terminal 2
cd client && npm run dev
```

---

## 📍 URLs

| Service | URL | Port |
|---------|-----|------|
| Frontend | http://localhost:5173 | 5173 |
| Backend | http://localhost:3000 | 3000 |
| Backend Fallback | http://localhost:3001-3020 | 3001+ |

---

## 🔑 Authentication Flow

```
1. Sign Up (Register)
   └── POST /api/auth/register
   └── Returns: JWT token + user data
   └── Redirect to: /role-selection

2. Sign In (Login)
   └── POST /api/auth/login
   └── Returns: JWT token + user data
   └── Redirect to: /role-selection

3. Select Role
   └── POST /api/auth/set-role
   └── Redirect to: /service (customer) or /mechanic/dashboard

4. Access Protected Routes
   └── All requests include: Authorization: Bearer {token}
```

---

## 📋 Main Authentication Endpoints

| Endpoint | Method | Auth | Purpose |
|----------|--------|------|---------|
| `/api/auth/register` | POST | ❌ | Sign up new user |
| `/api/auth/login` | POST | ❌ | Sign in existing user |
| `/api/auth/set-role` | POST | ✅ | Save user role |
| `/api/auth/me` | GET | ✅ | Get current user |

---

## 📱 Frontend Files

| File | Purpose |
|------|---------|
| `client/src/shared/pages/Login.jsx` | Sign in/up UI |
| `client/src/shared/context/AuthContext.jsx` | Auth state management |
| `client/src/shared/components/ProtectedRoute.jsx` | Route protection |

---

## 🖥️ Backend Files

| File | Lines | Purpose |
|------|-------|---------|
| `server/index.js` | 1-50 | Setup & config |
| `server/index.js` | 149-420 | Auth endpoints |
| `server/.env` | All | Environment variables |

---

## 🧪 Quick Test Commands

### Test Signup
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123",
    "fullName": "Test User"
  }'
```

### Test Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123"
  }'
```

---

## 💾 LocalStorage Keys

| Key | Contains |
|-----|----------|
| `repairwale_token` | JWT token |
| `repairwale_user` | User object (JSON) |
| `rw_role_locked` | Selected role |

---

## ✅ Validation Rules

| Field | Rule |
|-------|------|
| Email | Valid email format |
| Password | Min 6 characters |
| Full Name | Min 2 characters |
| Phone | Exactly 10 digits |
| Terms | Must be checked (signup) |

---

## 🔒 Security

- ✅ Passwords hashed with bcrypt
- ✅ JWT tokens expire in 7 days
- ✅ Protected routes verify token
- ✅ Duplicate emails prevented
- ✅ Email validation enforced

---

## 🧠 Storage

**Frontend:** localStorage (browser)  
**Backend:** In-memory array (cleared on restart)

For production: Add MongoDB/PostgreSQL

---

## 📊 User Object

```json
{
  "id": "user_12345abc",
  "email": "user@example.com",
  "fullName": "John Doe",
  "role": "customer",
  "createdAt": "2026-02-21T10:30:00Z"
}
```

---

## 🔄 Complete User Journey

```
1. User visits http://localhost:5173 (Login page)
   ↓
2. New user? → Click "Sign up"
   ↓
3. Fill form (name, email, phone, password, terms)
   ↓
4. Click "✨ Create Account"
   ↓
5. Backend: POST /api/auth/register
   - Validates inputs
   - Hashes password
   - Returns JWT + user
   ↓
6. Frontend: Save token + user to localStorage
   ↓
7. Auto-redirect to /role-selection
   ↓
8. Select "Customer" or "Mechanic"
   ↓
9. Backend: POST /api/auth/set-role
   ↓
10. Redirect to: /service (customer) or /mechanic/dashboard
    ↓
11. ✅ Fully authenticated & ready to use!
```

---

## 🆘 Common Errors & Fixes

| Error | Fix |
|-------|-----|
| "Server connection failed" | Start backend: `node server/index.js` |
| "User already exists" | Use different email or restart server |
| "Invalid email" | Enter valid email format |
| "Password must be 6 chars" | Use longer password |
| "Invalid or expired token" | Log out, clear localStorage, log in again |
| "Token required" | Make sure you're logged in |

---

## 📚 Complete Documentation

- **Setup Guide**: `AUTH_SETUP.md`
- **Testing Guide**: `TESTING_AUTH.md`
- **Razorpay Setup**: `RAZORPAY_SETUP.md`

---

## ✨ Key Features

✅ Sign up with email & password  
✅ Sign in with credentials  
✅ Role selection (customer/mechanic)  
✅ Form validation  
✅ Error handling  
✅ Token management  
✅ Protected routes  
✅ Persistent login  
✅ Secure password hashing  

---

## 🎯 Status: READY FOR TESTING ✅

**All backend endpoints configured**  
**All frontend forms implemented**  
**Authentication flow complete**  

Next Steps:
1. Run `start-backend.bat`
2. Run `start-frontend.bat`  
3. Go to http://localhost:5173
4. Test sign up → sign in → role selection
5. ✨ Enjoy!

