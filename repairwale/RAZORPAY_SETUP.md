# Razorpay Payment Integration Guide

## Current Status
✅ Backend integration is **ready**  
✅ Frontend checkout is **complete**  
⚠️ Currently running in **MOCK MODE** (test payments)

---

## 🚀 Testing with Mock Payments (Current Setup)

Your system is already configured to accept mock payments! The checkout will work without live Razorpay credentials.

### To Test the Checkout:

1. **Start Backend:**
   ```bash
   cd server
   node index.js
   ```
   
   You should see:
   ```
   [RAZORPAY] ⚠ Keys not provided. Using MOCK payments.
   RepairWale server running on http://localhost:3000
   ```

2. **Start Frontend:**
   ```bash
   cd client
   npm run dev
   ```
   Or right-click `index.html` → Open with Live Server

3. **Test Checkout Flow:**
   - Add items to cart
   - Go to checkout
   - Fill in billing details
   - Select "Razorpay" payment method
   - Click "Pay"
   - A **mock Razorpay modal** will appear
   - Enter any test card details (doesn't matter, it's fake)
   - The system will accept it ✓

---

## 💳 Setting Up Live Payments (Production)

### Step 1: Get Razorpay Credentials

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Sign up or log in
3. Navigate to **Settings → API Keys**
4. Copy your:
   - **Key ID** (starts with `rzp_test_` or `rzp_live_`)
   - **Key Secret** (keep this safe!)

### Step 2: Add Credentials to Server

Edit `server/.env`:

```env
# TEST MODE (sandbox)
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxxxx

# OR PRODUCTION MODE (live)
RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxxxx
```

### Step 3: Restart Backend

```bash
cd server
node index.js
```

You should see:
```
[RAZORPAY] ✓ Initialized with live credentials (Key ID: rzp_test_...)
```

### Step 4: Test with Razorpay Test Cards

Use these test cards in your checkout:

| Card Type | Number | Expiry | CVV | Status |
|-----------|--------|--------|-----|--------|
| Visa Success | 4111 1111 1111 1111 | Any future | Any 3 digits | ✓ Success |
| Visa Failure | 4111 1111 1111 1112 | Any future | Any 3 digits | ✗ Failure |
| Mastercard | 5555 5555 5555 4444 | Any future | Any 3 digits | ✓ Success |

---

## 📋 Payment Flow Overview

### Frontend (React):
1. **Checkout.jsx** loads Razorpay script dynamically
2. User fills billing details (Step 1)
3. User confirms order (Step 2)  
4. User selects payment method (Step 3)
5. Clicks "Pay" → sends amount to backend

### Backend (Node.js):
1. **POST `/api/create-order`** receives amount → creates Razorpay order
2. Frontend loads Razorpay modal window
3. User completes payment in modal
4. **POST `/api/verify-payment`** verifies signature with Razorpay
5. Returns success/failure to frontend

---

## 🔧 Configuration Files

### Server `.env` File:
```env
PORT=3000                          # Server port
JWT_SECRET=your_secret_key        # JWT signing secret
RAZORPAY_KEY_ID=rzp_test_xxx       # Razorpay Key ID
RAZORPAY_KEY_SECRET=xxx            # Razorpay Secret
```

### Frontend API Config (`client/src/shared/services/apiConfig.js`):
- Automatically routes to `http://localhost:3000/api`
- Falls back to current origin if needed

### Payment Endpoints:
- `GET /api/razorpay-key` → Returns Key ID and mode (live/mock)
- `POST /api/create-order` → Creates payment order
- `POST /api/verify-payment` → Verifies payment signature

---

## 🐛 Troubleshooting

### Issue: "Can't connect to backend"
```
Solution: Make sure backend is running on port 3000
Check: node server/index.js shows no errors
```

### Issue: "Using MOCK payments" message
```
Solution: Your RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET are empty
- This is NORMAL for development!
- To use real payments, add your credentials to server/.env
- Restart backend: node index.js
```

### Issue: "Failed to load Razorpay script"
```
Solution: Check internet connection
Razorpay CDN must be accessible: checkout.razorpay.com/v1/checkout.js
```

### Issue: "Payment verified. Redirecting..." then error
```
Solution: Your Razorpay credentials may be invalid
- Check Key ID and Secret in .env
- Ensure you have the right mode (test vs live)
- Restart server after changing .env
```

---

## 📊 Monitoring Payments

### In Browser Console (F12):
```
[API] Connected to backend: http://localhost:3000/api
[ORDER] Creating order...
[VERIFICATION] Verifying payment...
```

### In Server Terminal:
```
[RAZORPAY] ✓ Initialized with live credentials
[ORDER] Creating order | Amount: ₹999
[ORDER] ✓ Created | Order ID: order_xxxxx
[VERIFICATION] Verifying | Order: order_xxxxx | Payment: pay_xxxxx
[VERIFICATION] ✓ Valid | Signature match: true
```

---

## 🔐 Security Notes

1. **Never commit `.env`** to git (add to `.gitignore`)
2. **Keep RAZORPAY_KEY_SECRET private** - don't expose in frontend
3. **Always verify signatures server-side** (already implemented)
4. **Use HTTPS in production** (Razorpay requires it for live)

---

## 📚 Next Steps

1. ✅ Test with mock payments first
2. ✅ Get Razorpay credentials from dashboard
3. ✅ Add to `.env` file
4. ✅ Test with test cards
5. ✅ Ready for production!

---

## 🆘 Need Help?

- **Razorpay Docs:** https://razorpay.com/docs/
- **API Status:** https://status.razorpay.com/
- **Support:** https://razorpay.com/support/

