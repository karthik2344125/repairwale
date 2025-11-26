# RepairWale Mobile (Expo) — Prototype

This is a minimal Expo React Native prototype that demonstrates Firebase Auth + Firestore usage and communicates with the backend for real-time notifications.

Setup
1. Install Expo CLI (if not installed):

```powershell
npm install --global expo-cli
```

2. Copy the firebase config example and edit with your Firebase project values:

```powershell
cd C:\Users\Lenovo\Desktop\CAPSTONE\repairwale\mobile
copy firebaseConfig.example.js firebaseConfig.js
# then edit firebaseConfig.js and set SERVER_URL to your backend (use LAN IP when testing on real device)
```

3. Install dependencies and start Expo:

```powershell
npm install
expo start
```

Notes
- `SERVER_URL` in `firebaseConfig.js` should point to your backend. For Android emulator use `http://10.0.2.2:3000`. For iOS Simulator use `http://localhost:3000`. For physical devices use your machine's LAN IP like `http://192.168.1.100:3000`.
- The app uses `react-native-maps`. With Expo you should run `expo install react-native-maps` to ensure a compatible version.
- Firestore rules must allow reads/writes for testing or configure auth rules properly.

Payment & testing notes
- The mobile app contains a simulated payment flow. It calls the server endpoint `/api/create-order` which currently returns a mock order. Replace this with real Razorpay order creation on the server and integrate Razorpay Checkout on the mobile app for production.
- To test payments in this prototype:
	1. Ensure the backend is running (`repairwale/server` with `npm start`).
	2. Set `SERVER_URL` in `firebaseConfig.js` to your backend address (use `http://10.0.2.2:3000` for Android emulator).
	3. Create a Firestore collection `requests` and allow test writes (or use relaxed rules while testing).


Next steps I can do for you
- Add an Expo-managed authentication UI (email/password + phone) and navigation between screens.
- Implement chat using Firestore realtime messages or socket.io-based chat with message UI.
- Add Razorpay mobile checkout integration (requires server-side order creation).
