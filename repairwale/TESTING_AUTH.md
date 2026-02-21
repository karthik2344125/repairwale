# 📊 Sign In/Sign Up Testing Checklist

## 🎯 Task Overview

This document provides step-by-step instructions to test the complete authentication flow.

---

## ✅ Prerequisites

- ✓ Node.js installed
- ✓ npm installed
- ✓ Backend `.env` file created (with RAZORPAY keys optional)
- ✓ All dependencies installed via `npm install`

---

## 🚀 Start Up Instructions

### Terminal 1: Start Backend
```bash
# Option A: Use the startup script (Windows)
start-backend.bat

# Option B: Manual startup
cd server
node index.js
```

**Expected Output:**
```
[RAZORPAY] ⚠ Keys not provided. Using MOCK payments.
[RAZORPAY] To enable live payments: ...
✓ Theme applied
✓ Root element found
RepairWale server running on http://localhost:3000
```

---

### Terminal 2: Start Frontend  
```bash
# Option A: Use the startup script (Windows)
start-frontend.bat

# Option B: Manual startup
cd client
npm run dev
```

**Expected Output:**
```
> repairwale-client@0.1.0 dev
> vite

  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  press h + enter to show help
```

---

## 🧪 Test Scenarios

### Test 1: Sign Up (Create New Account)

**Steps:**
1. Open browser → http://localhost:5173/
2. You should see the Login page with **"Create your account"**
3. Click **"Sign up"** link at the bottom
4. Fill form:
   - **Full Name:** `Test User`
   - **Email:** `testuser@example.com` (use unique email!)
   - **Phone:** `9876543210`
   - **Password:** `Test@1234`
   - **Confirm Password:** `Test@1234`
   - **Terms & Conditions:** Check the checkbox
5. Click **"✨ Create Account"** button
6. Should see: `🎉 Account created successfully!`
7. Auto-redirect to `/role-selection` page

**Expected Backend Console Output:**
```
✅ New user registered: testuser@example.com
```

**✅ Sign Up Passed** - Go to Test 2

---

### Test 2: Sign In (Login)

**Steps:**
1. You're now on Role Selection page
2. Click back or navigate to http://localhost:5173/login
3. Enter credentials:
   - **Email:** `testuser@example.com`
   - **Password:** `Test@1234`
4. Click **"🚀 Sign In"** button
5. Should see: `✓ Welcome back!`
6. Auto-redirect to `/role-selection` page

**Expected Backend Console Output:**
```
✅ User logged in: testuser@example.com
```

**✅ Sign In Passed** - Go to Test 3

---

### Test 3: Role Selection (Select Customer)

**Steps:**
1. You're on the Role Selection page
2. Click **"Continue as Customer"** button
3. Should redirect to `/service` page (main customer dashboard)
4. You should see the service listing and map

**Expected Backend Console Output:**
```
✅ User role updated: testuser@example.com → customer
```

**✅ Role Selection Passed** - Go to Test 4

---

### Test 4: Test Invalid Login

**Steps:**
1. Log out by navigating to http://localhost:5173/login
2. (Note: May need to clear localStorage for testing logout)
3. Try login with wrong password:
   - **Email:** `testuser@example.com`
   - **Password:** `WrongPassword`
4. Click **"🚀 Sign In"**
5. Should see error: `⚠️ Invalid email or password`

**✅ Error Handling Passed** - Go to Test 5

---

### Test 5: Test Duplicate Email Sign Up

**Steps:**
1. Go to login page
2. Click **"Sign up"** at the bottom
3. Try to register with existing email:
   - **Email:** `testuser@example.com` (already exists!)
   - Other fields filled normally
4. Click **"✨ Create Account"**
5. Should see error: `⚠️ User with this email already exists`

**✅ Duplicate Check Passed** - Go to Test 6

---

### Test 6: Test Form Validation

Test each validation:

**Invalid Email:**
- Email: `notanemail`
- Should show: `⚠️ Invalid email format`

**Short Password:**
- Password: `12345` (less than 6 chars)
- Should show: `⚠️ Password must be at least 6 characters`

**Mismatched Passwords:**
- Password: `Test@1234`
- Confirm: `Different`
- Should show: `⚠️ Passwords do not match`

**Invalid Phone:**
- Phone: `123` (less than 10 digits)
- Should show: `⚠️ Phone must be 10 digits`

**✅ Validation Passed** - Continue to Integration Test

---

## 🔌 Integration Testing

### Check Browser Console (F12)

On successful login, you should see:
```
[API] Connected to backend: http://localhost:3000/api
✓ App rendered successfully
```

### Check LocalStorage (F12 → Application → LocalStorage)

After login, should have:
```
repairwale_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
repairwale_user: {"id":"user_xxx","email":"testuser@example.com",...}
rw_role_locked: "customer"
```

### Check Backend Console

All successful operations should log:
```
✅ New user registered: ...
✅ User logged in: ...
✅ User role updated: ...
```

---

## 🧬 API Endpoint Tests (using cURL or Postman)

### Test Register Endpoint
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "Pass@1234",
    "fullName": "New User"
  }'
```

**Expected Response:**
```json
{
  "ok": true,
  "token": "eyJ...",
  "user": {
    "id": "user_xxx",
    "email": "newuser@example.com",
    "fullName": "New User",
    "role": null,
    "createdAt": "2026-02-21T..."
  }
}
```

### Test Login Endpoint
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@example.com",
    "password": "Test@1234"
  }'
```

### Test Set Role Endpoint
```bash
# First get a token from login endpoint, then:
curl -X POST http://localhost:3000/api/auth/set-role \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"role": "mechanic"}'
```

---

## ✨ Feature Checklist

- [ ] Sign up with new email works
- [ ] Sign up with existing email shows error
- [ ] Sign in with correct credentials works
- [ ] Sign in with wrong password shows error
- [ ] Form validation works (email, password, phone)
- [ ] Password confirmation validation works
- [ ] Role selection saves role
- [ ] User data persists after refresh
- [ ] Token is stored in localStorage
- [ ] Backend logs all operations

---

## 🐛 Troubleshooting

### Issue: "Server connection failed"
```
✗ Symptom: Can't connect to backend
✓ Solution: 
  1. Check backend is running: `node index.js`
  2. Check it's on port 3000 or 3001 (check terminal)
  3. Try http://localhost:3000 in browser directly
```

### Issue: "Email already exists" on new email
```
✗ Symptom: Can't register new user
✓ Solution:
  1. Clear backend (restart server) - it's in-memory
  2. Or use different email each time
```

### Issue: Blank page after signup
```
✗ Symptom: Redirects but page shows nothing
✓ Solution:
  1. Clear browser cache (Ctrl+Shift+Del)
  2. Check F12 console for errors
  3. Clear localStorage: localStorage.clear()
```

### Issue: "Invalid or expired token"
```
✗ Symptom: Can't proceed after login
✓ Solution:
  1. Log out and log back in
  2. Clear localStorage
  3. Restart backend
```

---

## 📝 Notes

- **In-Memory Database**: User data is cleared when server restarts
- **Token Expiration**: JWT tokens expire after 7 days
- **Password Security**: All passwords are hashed with bcrypt
- **No Email Verification**: Currently no email confirmation required
- **Phone Storage**: Phone is validated but not stored (optional for future)

---

## 🎉 Success Criteria

All these should work:
- ✅ Can sign up with new account
- ✅ Can sign in with correct credentials
- ✅ Can select role (customer/mechanic)
- ✅ Redirects to correct dashboard
- ✅ User data persists on refresh
- ✅ Invalid credentials show error
- ✅ Form validation works
- ✅ Backend logs all operations

**If all tests pass, Authentication System is WORKING! 🎊**

