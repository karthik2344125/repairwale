# 🏗️ RepairWale Project Structure
## Complete & Organized File Structure (Feb 2026)

```
repairwale/client/src/
├── 📁 customer/                    # Customer-specific features
│   ├── 📁 components/
│   │   └── LiveGPSTracker.jsx     # Real-time GPS tracking component
│   └── 📁 pages/
│       ├── Checkout.jsx            # Payment & checkout flow
│       ├── CustomerHome.jsx        # Customer dashboard/landing
│       ├── CustomerProfile.jsx     # Customer profile management ✨ PREMIUM
│       ├── Favorites.jsx           # Saved/favorited services
│       ├── OnboardingCustomer.jsx  # Customer onboarding wizard
│       ├── OrderHistory.jsx        # Past orders & tracking
│       └── ServiceTracking.jsx     # Live service tracking page
│
├── 📁 mechanic/                    # Mechanic-specific features
│   ├── 📁 components/              # (Empty - ready for future components)
│   └── 📁 pages/
│       ├── MechanicHome.jsx        # Mechanic dashboard ✨ PREMIUM
│       ├── MechanicProfile.jsx     # Mechanic profile & settings ✨ PREMIUM
│       └── MechanicServices.jsx    # Service pricing management ✨ PREMIUM
│
├── 📁 shared/                      # Shared across all users
│   ├── 📁 components/
│   │   ├── AISupport.jsx          # AI chatbot support
│   │   ├── Button.jsx             # Reusable button component
│   │   ├── Chat.jsx               # Real-time messaging
│   │   ├── Layout.jsx             # App layout wrapper
│   │   ├── MechanicsMap.jsx       # Map view for mechanics
│   │   ├── ProtectedRoute.jsx     # Route authentication wrapper
│   │   ├── RealTimeChat.jsx       # Enhanced chat component
│   │   └── Reviews.jsx            # Reviews & ratings system
│   │
│   ├── 📁 context/
│   │   └── AuthContext.jsx        # Global authentication state
│   │
│   ├── 📁 pages/
│   │   ├── Login.jsx              # Login/Signup page
│   │   ├── MechanicsMapPage.jsx   # Main map page for finding mechanics
│   │   ├── RoleSelectionPage.jsx  # Choose Customer/Mechanic role
│   │   ├── Service.jsx            # Browse services catalog
│   │   └── TermsAndConditions.jsx # Legal T&C page
│   │
│   └── 📁 services/
│       ├── api.js                 # API utilities
│       ├── apiConfig.js           # API configuration
│       ├── cart.js                # Shopping cart logic
│       ├── favorites.js           # Favorites management
│       ├── profile.js             # Profile data handling
│       ├── roleData.js            # Role-specific data (mechanic/customer)
│       ├── theme.js               # Theme management
│       └── toast.js               # Toast notifications
│
├── App.css                         # Global styles
├── App.jsx                         # Main app component & routing
├── firebase.js                     # Firebase SDK initialization
├── firebaseConfig.js               # Firebase configuration
├── icons.jsx                       # Icon components
├── main.jsx                        # App entry point
└── PROJECT_STRUCTURE.md            # This file
```

---

## 🎨 Premium Theme Applied

The following pages have the **premium dark theme** with:
- Background: `#0B1220` (Deep midnight navy)
- Accent: `#4A9EFF` (Bright blue highlights)
- Gradient effects & smooth animations
- Enhanced hover states & shadows

**Premium Pages:**
- ✨ CustomerProfile
- ✨ MechanicHome
- ✨ MechanicProfile
- ✨ MechanicServices

---

## 🔄 Routing Structure

### Public Routes (No Auth Required)
- `/role-selection` - Choose user type
- `/login` - Authentication page
- `/terms` - Terms & Conditions

### Protected Routes (Auth Required)

**Customer Routes:**
- `/customer` - Customer home dashboard
- `/customer/profile` - Profile management
- `/service` - Browse services
- `/map` - Find mechanics on map
- `/favorites` - Saved services
- `/checkout` - Payment flow
- `/orders` - Order history
- `/tracking/:orderId` - Track active service

**Mechanic Routes:**
- `/mechanic/dashboard` - Mechanic home dashboard
- `/mechanic/profile` - Profile & availability settings
- `/mechanic/services` - Manage service pricing

**Onboarding:**
- `/onboarding` - First-time user setup (auth required, no role needed yet)

---

## 📦 Key Dependencies

- **React 18.2** - UI framework
- **React Router 6** - Navigation
- **Firebase** - Authentication & real-time features
- **Vite** - Build tool & dev server
- **Leaflet** - Maps (via MechanicsMap component)

---

## 🚀 Development Commands

```bash
# Start dev server (auto-refresh on save)
npm run dev          # Frontend: http://localhost:5177

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## ✅ Code Quality Status

- ✅ No compilation errors
- ✅ No duplicate files
- ✅ All routes properly configured
- ✅ Clean folder structure
- ✅ All imports resolved correctly
- ✅ Premium theme consistently applied

---

## 📝 Notes

1. **Empty Folders:** `mechanic/components/` is empty but kept for future components
2. **Obsolete Files Removed:** Old MapPage.jsx and EnhancedMap references cleaned up
3. **Dev Server Running:** Frontend on port 5177, Backend on port 3001
4. **Hot Reload:** Save any file and refresh browser to see changes instantly

Last Updated: February 28, 2026
