# RepairWale Mobile App 📱

A complete React Native mobile application for RepairWale - roadside assistance platform built with Expo.

## 🚀 Features

### ✅ Complete Authentication
- Login & Signup screens
- Role selection (Customer/Mechanic)
- AsyncStorage for session persistence

### 🔧 Mechanic Features
- **Dashboard**: View stats, pending requests, earnings
- **Services Management**: Add, edit, enable/disable services
- **Profile**: Manage account settings
- **Bottom Tab Navigation**: Easy navigation between screens

### 👤 Customer Features (Coming Soon)
- Find nearby mechanics
- Request services
- Track orders
- Favorites

### 🎨 Design
- Responsive mobile-first design
- Dark theme matching web app
- Smooth animations and transitions
- Touch-friendly UI elements

## 📦 Installation

### Prerequisites
- Node.js 16+ installed
- Expo CLI installed globally
- iOS Simulator (Mac) or Android Studio (Windows/Mac/Linux)
- Physical device with Expo Go app (optional)

### Step 1: Install Expo CLI
```powershell
npm install --global expo-cli
```

### Step 2: Navigate to Mobile Folder
```powershell
cd c:\Users\Lenovo\Desktop\CAPSTONE\repairwale\mobile
```

### Step 3: Install Dependencies
```powershell
npm install
```

### Step 4: Start Expo Dev Server
```powershell
npm start
```

or

```powershell
expo start
```

## 📱 Running on Devices

### Option 1: Physical Device (Easiest)
1. Install **Expo Go** app from App Store (iOS) or Play Store (Android)
2. Scan the QR code shown in terminal/browser
3. App will load on your device

### Option 2: Android Emulator
1. Install Android Studio
2. Create an Android Virtual Device (AVD)
3. Start the emulator
4. In Expo Dev Tools, press `a` for Android

### Option 3: iOS Simulator (Mac only)
1. Install Xcode from App Store
2. Install iOS Simulator
3. In Expo Dev Tools, press `i` for iOS

## 🗂️ Project Structure

```
mobile/
├── App.js                          # Main app entry
├── src/
│   ├── components/
│   │   ├── Button.js              # Reusable button component
│   │   └── StatCard.js            # Stats display card
│   ├── context/
│   │   └── AuthContext.js         # Authentication state
│   ├── navigation/
│   │   └── AppNavigator.js        # Navigation setup
│   ├── screens/
│   │   ├── LoginScreen.js         # Login/Signup
│   │   ├── RoleSelectionScreen.js # Choose role
│   │   ├── MechanicDashboardScreen.js  # Mechanic dashboard
│   │   ├── MechanicServicesScreen.js   # Services management
│   │   └── ProfileScreen.js       # User profile
│   └── utils/
│       └── colors.js              # Color palette
├── package.json
└── README.md
```

## 🎯 How to Use

### First Time Setup
1. Launch the app
2. **Sign Up** with email and password
3. **Select Role**: Choose "Mechanic" or "Customer"
4. You're ready to go!

### Mechanic Flow
1. **Dashboard**: View your stats and pending requests
2. **Accept/Reject**: Tap on requests to accept or reject them
3. **Services**: Manage the services you offer
4. **Profile**: View your profile and settings

## 🔧 Development

### Hot Reload
Changes are automatically reflected - just save your files!

### Clear Cache
```powershell
expo start --clear
```

### Reset AsyncStorage
1. Open app
2. Shake device (or press `Ctrl+M` in Android emulator)
3. Select "Debug" → "Clear AsyncStorage"

## 📚 Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: React Navigation (Stack + Bottom Tabs)
- **Storage**: AsyncStorage
- **State**: React Context API
- **UI**: Custom components with Linear Gradient

## 🐛 Troubleshooting

### App won't start
```powershell
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules
npm install
```

### "Unable to resolve module"
```powershell
expo start --clear
```

### Device not showing in Expo
- Ensure phone and computer are on same WiFi network
- Check firewall settings
- Try USB connection with `expo start --tunnel`

## 📸 Screens Included

- ✅ Login & Signup
- ✅ Role Selection
- ✅ Mechanic Dashboard
- ✅ Services Management
- ✅ Profile

## 🎉 You're All Set!

Run `npm start` and start building! 🚀
