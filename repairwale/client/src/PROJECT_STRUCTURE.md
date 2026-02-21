# RepairWale - Role-Based Project Structure

## 📁 New Folder Organization

The project is now organized by roles for better maintainability and scalability.

```
src/
├── shared/                     # Shared across all roles
│   ├── components/             # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Toast.jsx  
│   │   ├── Layout.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── AISupport.jsx
│   │   ├── Chat.jsx
│   │   ├── RealTimeChat.jsx
│   │   └── Reviews.jsx
│   ├── pages/                  # Pages used by multiple roles
│   │   ├── Login.jsx
│   │   ├── RoleSelectionPage.jsx
│   │   ├── Service.jsx         # Service browse/dashboard
│   │   ├── MapPage.jsx         # Map view (different per role)
│   │   ├── UserPage.jsx        # Profile management
│   │   └── TermsAndConditions.jsx
│   ├── context/                # React Context providers
│   │   └── AuthContext.jsx
│   └── services/               # Business logic & API calls
│       ├── api.js
│       ├── apiConfig.js
│       ├── cart.js
│       ├── favorites.js
│       ├── profile.js
│       ├── roleData.js
│       ├── theme.js
│       └── toast.js
│
├── customer/                   # Customer-specific features
│   ├── pages/
│   │   ├── CustomerHome.jsx    # Customer dashboard
│   │   ├── Checkout.jsx        # Service checkout
│   │   ├── Favorites.jsx       # Saved mechanics/services
│   │   ├── OrderHistory.jsx    # Past orders
│   │   ├── ServiceTracking.jsx # Live order tracking
│   │   └── OnboardingCustomer.jsx
│   └── components/             # Customer-only components
│       ├── MechanicList.jsx    # List of mechanics
│       ├── SimpleMapView.jsx   # Map display component
│       ├── SimpleMapTracker.jsx
│       └── LiveGPSTracker.jsx  # Real-time GPS tracking
│
├── mechanic/                   # Mechanic-specific features
│   ├── pages/                  # (Create mechanic pages here)
│   └── components/             # Mechanic-only components
│       ├── RequestList.jsx     # Incoming service requests
│       ├── RequestDetails.jsx  # Request info display
│       └── RequestForm.jsx     # Create/edit requests
│
├── App.jsx                     # Main app entry with routing
├── App.css                     # Global styles
├── main.jsx                    # React DOM renderer
├── firebase.js                 # Firebase configuration
├── firebaseConfig.js
└── icons.jsx                   # Icon components
```

## 🎯 Import Path Rules

### From `shared/` files:
```jsx
// Same folder
import Button from './Button'

// Other shared folders
import { useAuth } from '../context/AuthContext'
import { showSuccess } from '../services/toast'

// Root level
import { icons } from '../../icons'
import { db } from '../../firebase'
```

### From `customer/` files:
```jsx
// Customer components
import MechanicList from '../components/MechanicList'

// Shared components/services
import Button from '../../shared/components/Button'
import { useAuth } from '../../shared/context/AuthContext'
import { showSuccess } from '../../shared/services/toast'
```

### From `mechanic/` files:
```jsx
// Mechanic components
import RequestList from '../components/RequestList'

// Shared components/services
import Button from '../../shared/components/Button'
import { useAuth } from '../../shared/context/AuthContext'
```

### From `App.jsx` (root):
```jsx
import { AuthProvider } from './shared/context/AuthContext'
import Layout from './shared/components/Layout'
import Login from './shared/pages/Login'
import Checkout from './customer/pages/Checkout'
```

## 🔄 How Files are Interconnected

### Authentication Flow
1. `App.jsx` wraps everything in `<AuthProvider>` from `shared/context/AuthContext`
2. All pages use `useAuth()` hook to access user & role
3. `ProtectedRoute` component guards role-specific pages

### Component Reusability
- **Shared components** (`Button`, `Toast`, `Layout`) → Used by ALL roles
- **Role-specific components** → Used only within that role or by `shared/pages`

### Data Flow
```
User Action → Component → Service (shared/services/) → API → Backend
                ↓
              Context (AuthContext) updates
                ↓
          Protected Routes re-evaluate
                ↓
            Navigate to correct page
```

## 🚀 Adding New Features

### For Customer Features:
1. Create page in `customer/pages/`
2. Create components in `customer/components/`
3. Import shared services from `../../shared/services/`
4. Add route in `App.jsx`

### For Mechanic Features:
1. Create page in `mechanic/pages/`
2. Create components in `mechanic/components/`
3. Use `../../shared/` imports for shared functionality

### For Shared Features:
1. Add component to `shared/components/`
2. Add service to `shared/services/`
3. Can be imported by ANY role

## 📦 Building & Running

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## ✅ Benefits of This Structure

✨ **Clear Separation**: Each role has its own folder
🔗 **Interconnected**: Shared components accessible to all
📈 **Scalable**: Easy to add new roles or features
🧪 **Testable**: Isolated components per role
📝 **Maintainable**: Know exactly where to find code
🎯 **Type Safety**: Import paths are explicit

---

**Last Updated**: February 19, 2026
