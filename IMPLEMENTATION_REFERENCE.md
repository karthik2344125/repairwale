# RepairWale - Implementation Reference Guide

## 🔧 QUICK CODE REFERENCES

### **1. Toast Notification Usage**

```javascript
// Import in any component
import { showSuccess, showError, showInfo, showWarning } from '../services/toast'

// Usage examples
showSuccess('✓ Item added to cart')
showError('❌ Failed to process payment')
showInfo('Loading...')
showWarning('⚠ This action cannot be undone')

// With delay
setTimeout(() => showSuccess('Done!'), 1000)
```

**Files:**
- Service: `src/services/toast.js`
- Component: `src/components/Toast.jsx`
- Usage: Every page that needs user feedback

---

### **2. Promo Code Implementation**

```javascript
// In Checkout.jsx - State
const [promoCode, setPromoCode] = useState('')
const [promoApplied, setPromoApplied] = useState(null)

// Valid codes
const validPromoCodes = {
  'SAVE10': { discount: 0.10, label: '10% off' },
  'SAVE20': { discount: 0.20, label: '20% off' },
  'WELCOME': { discount: 0.15, label: '15% off' },
  'FREESHIP': { discount: 0.05, label: '5% off' }
}

// Apply function
const applyPromoCode = () => {
  const code = promoCode.toUpperCase().trim()
  if (validPromoCodes[code]) {
    setPromoApplied({ code, ...validPromoCodes[code] })
    showSuccess(`Promo applied! ${validPromoCodes[code].label}`)
  } else {
    showError('Invalid promo code')
  }
}

// Calculate total
const { subtotal, discount, tax, total } = calculateTotal()
```

**Lines in Checkout.jsx:**
- Lines 12-24: Promo state setup
- Lines 76-90: Promo functions
- Lines 225-260: UI implementation in step 2

---

### **3. Payment Method Selector**

```javascript
// State
const [paymentMethod, setPaymentMethod] = useState('razorpay')

// Payment methods
const paymentMethods = [
  { id: 'razorpay', label: '💳 Razorpay', desc: 'Cards, Net Banking' },
  { id: 'upi', label: '📱 UPI', desc: 'Google Pay, PhonePe' },
  { id: 'wallet', label: '👛 Wallet', desc: 'Wallet Credits' }
]

// Conditional payment
if(paymentMethod === 'razorpay') {
  // Razorpay logic
} else if(paymentMethod === 'upi') {
  // UPI logic
} else if(paymentMethod === 'wallet') {
  // Wallet logic
}
```

**Lines in Checkout.jsx:**
- Lines 302-360: UI in step 3
- Lines 141-180: Payment logic

---

### **4. Order History Filtering**

```javascript
// State
const [orders, setOrders] = useState([])
const [filter, setFilter] = useState('all')

// Filtering logic
const filteredOrders = orders.filter(order => {
  if (filter === 'completed') return order.status === 'completed'
  if (filter === 'pending') return ['pending', 'in_progress'].includes(order.status)
  if (filter === 'cancelled') return order.status === 'cancelled'
  return true
})

// Status color mapping
const getStatusColor = (status) => {
  const colors = {
    pending: '#fbbf24',
    in_progress: '#60a5fa',
    completed: '#10b981',
    cancelled: '#ef4444'
  }
  return colors[status] || '#9aa0a6'
}
```

**File:** `src/pages/OrderHistory.jsx`

---

### **5. Reviews & Ratings Component**

```javascript
// Import
import Reviews from '../components/Reviews'

// Usage in Service page
<Reviews serviceId="repairwale-services" serviceName="RepairWale Services" />

// Component features
- 5-star rating system
- Review submission form
- Average rating display
- Rating distribution chart
- Verified purchase badge
- LocalStorage persistence

// Data stored in localStorage
localStorage.getItem('rw_reviews') // JSON object with reviews per service
```

**File:** `src/components/Reviews.jsx` (322 lines)

---

### **6. Service Tracking Page**

```javascript
// Route parameter
const { orderId } = useParams()

// Load order
const loadOrder = () => {
  try {
    const stored = JSON.parse(localStorage.getItem('rw_orders') || '[]')
    const found = stored.find(o => o.id === orderId)
    if (found) {
      setOrder(found)
      setTracking(found.tracking || {})
    }
  } catch {}
}

// Service stages
const stages = [
  { id: 'pending', label: 'Order Placed', icon: '📝', color: '#fbbf24' },
  { id: 'in_progress', label: 'In Progress', icon: '⚙️', color: '#60a5fa' },
  { id: 'completed', label: 'Completed', icon: '✅', color: '#10b981' }
]

// Real-time updates
useEffect(() => {
  loadOrder()
  const interval = setInterval(loadOrder, 5000) // Refresh every 5 seconds
  return () => clearInterval(interval)
}, [orderId])
```

**File:** `src/pages/ServiceTracking.jsx` (Route: `/tracking/:orderId`)

---

### **7. LocalStorage Data Structure**

```javascript
// Cart
localStorage.rw_cart = JSON.stringify([
  { id: 'breakdown_fix', title: 'Breakdown Quick Fix', price: 549, qty: 1 }
])

// Orders
localStorage.rw_orders = JSON.stringify([
  {
    id: 'ORD-123456',
    date: '2025-12-16',
    items: [...],
    subtotal: 549,
    discount: 0,
    tax: 99,
    total: 648,
    status: 'pending',
    billing: { fullName, email, phone, address1, city, pincode },
    tracking: { statusUpdates: [], estimatedTime: '45 mins', eta: '15:15' }
  }
])

// Reviews
localStorage.rw_reviews = JSON.stringify({
  'repairwale-services': [
    {
      id: 'REV-1234',
      rating: 5,
      comment: 'Great service!',
      author: 'Customer',
      date: '2025-12-16',
      verified: true
    }
  ]
})

// Checkout session
localStorage.rw_checkout = JSON.stringify({
  items: [...],
  subtotal: 549,
  tax: 99,
  total: 648,
  billing: {...}
})

// User profiles
localStorage.rw_customer = JSON.stringify({
  name: '',
  email: '',
  phone: '',
  vehicles: [],
  addresses: []
})

// Theme
localStorage.rw_theme = 'light' // or 'dark'

// User role (sessionStorage)
sessionStorage.userRole = 'customer' // or 'mechanic', 'garage'
```

---

### **8. Adding Toast to New Pages**

```javascript
// 1. Import at top
import { showSuccess, showError, showInfo } from '../services/toast'

// 2. Use in functions
const handleSubmit = () => {
  try {
    // ... logic ...
    showSuccess('✓ Success message')
  } catch(e) {
    showError('❌ Error message')
  }
}

// 3. In button click
<button onClick={() => {
  showSuccess('Action completed!')
  // ... other logic ...
}}>Click me</button>
```

---

## 🎯 COMMON TASKS

### **Add a New Service to Catalog**

In `src/pages/Service.jsx`, find the `catalog` array and add:

```javascript
{
  id: 'new_service_id',
  title: 'Service Name',
  desc: 'Service description',
  price: 999,
  sla: '30 mins',
  badge: 'Optional badge',
  image: 'https://images.unsplash.com/...'
}
```

---

### **Create New Toast Notification**

In `src/services/toast.js`:

```javascript
// Add new function
export const showCustom = (message, color = '#60a5fa') => {
  showToast(message, 'custom', 3000, color)
}
```

---

### **Add New Navigation Link**

In `src/components/Layout.jsx`, add to appropriate role section:

```javascript
<NavLink to="/new-page" className={({isActive})=> isActive? 'navlink active' : 'navlink'}>
  Icon New Page
</NavLink>
```

---

### **Create New Order**

For testing, manually add to localStorage:

```javascript
const newOrder = {
  id: `ORD-${Date.now()}`,
  date: new Date().toISOString(),
  items: [{id: 'service_id', title: 'Service', qty: 1, price: 549}],
  subtotal: 549,
  tax: 99,
  total: 648,
  status: 'in_progress',
  billing: { /* ... */ },
  tracking: {}
}

const orders = JSON.parse(localStorage.getItem('rw_orders') || '[]')
orders.push(newOrder)
localStorage.setItem('rw_orders', JSON.stringify(orders))
```

---

## 🚀 DEPLOYMENT CHECKLIST

Before deploying to production:

- [ ] Run `npm run build` - no errors
- [ ] Check browser console - no errors
- [ ] Test all payment methods
- [ ] Test promo code application
- [ ] Test all filters in order history
- [ ] Test service tracking refresh
- [ ] Test review submission
- [ ] Verify responsive design on mobile
- [ ] Check all toast notifications appear
- [ ] Verify localStorage persistence
- [ ] Test role-based navigation
- [ ] Check theme switching works
- [ ] Verify all links work correctly

---

## 📊 BUILD STATS

**Latest Build:**
```
✓ 80 modules transformed
✓ dist/index.html (0.49 kB)
✓ dist/assets/ - 174 KB total (gzipped: 57 KB)
✓ Built in 2.85s
✓ No errors
```

**Main Bundle Breakdown:**
- index-d1o1P7zL.js - 174.50 kB (main app)
- MapPage-DSI_PnSz.js - 722.66 kB (Leaflet + Maps)
- CustomerDashboard-BjiYOb8E.js - 32.71 kB
- Service-CDz4zs_-.js - 27.94 kB (with Reviews)
- UserPage-BSurv22G.js - 20.76 kB
- Other pages - 12-15 kB each

---

## 🔐 Environment Variables

**Optional (currently using mocks):**
```
RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret
```

Currently using mock Razorpay endpoints. Replace with live keys for production.

---

## 📞 ERROR TROUBLESHOOTING

**Build fails:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Server won't start:**
```bash
# Check port 3000 is available
# Or specify different port
PORT=3001 npm start
```

**Changes not reflecting:**
```bash
# Clear browser cache
# Hard refresh: Ctrl+Shift+R or Cmd+Shift+R
# Rebuild
npm run build
```

**LocalStorage issues:**
```javascript
// Clear all data
localStorage.clear()
sessionStorage.clear()

// Or specific
localStorage.removeItem('rw_cart')
```

---

## ✨ NEXT SESSION RECOMMENDATIONS

1. **Start with In-App Chat** (highest impact)
   - Enhance existing Chat.jsx component
   - Add Socket.io integration
   - Create chat modal for ServiceTracking
   - Estimated: 4-6 hours

2. **Implement Push Notifications**
   - Create notification service
   - Add Web Notifications API
   - Integrate with tracking updates
   - Estimated: 3-4 hours

3. **Add Favorites System**
   - Quick feature to boost engagement
   - Add heart toggle to services
   - Create favorites page
   - Estimated: 2-3 hours

---

**Document Created:** 2025-12-16
**Status:** Complete - All code references and guides included
**Ready for:** Next development session
