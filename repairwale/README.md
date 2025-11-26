# RepairWale — Prototype

This repository contains a small full-stack prototype for the RepairWale app concept.

What you get:
- A simple Express + Socket.io backend that serves a static frontend.
- A static front-end prototype using Leaflet for maps, a mechanics list, a simple request flow, and a chat panel powered by Socket.io.

Prerequisites
- Node.js (v14+ recommended)

Run locally
1. Open a terminal in `repairwale/server`.
2. Install dependencies and start server:

```powershell
cd c:\Users\Lenovo\Desktop\CAPSTONE\repairwale\server
npm install
npm start
```

3. Open http://localhost:3000 in your browser.

Web client (React + Vite)

The web client has been converted to a React + Vite app located in `repairwale/client`.

Development (recommended): run the backend and the Vite dev server in parallel.

```powershell
# from one terminal (backend)
cd C:\Users\Lenovo\Desktop\CAPSTONE\repairwale\server
npm install
npm start

# from another terminal (web client)
cd C:\Users\Lenovo\Desktop\CAPSTONE\repairwale\client
npm install
npm run dev
```

When `vite` is running it will serve the web client (usually on http://localhost:5173). The web app will call backend endpoints at the same origin if you run it through a proxy or you can configure the client to use `http://localhost:3000` for API calls.

Web Firebase setup

1. Copy the example Firebase config into the client and edit it:

```powershell
cd C:\Users\Lenovo\Desktop\CAPSTONE\repairwale\client
copy firebaseConfig.example.js src/firebaseConfig.js
# open src/firebaseConfig.js and paste your Firebase project settings
```

2. Firestore collections used by the web client:
  - `requests` — stores service requests created by users
  - `messages` — public chat messages

3. For quick testing set Firestore to test mode (or add permissive rules) and then run the dev server.


Production build:

```powershell
cd C:\Users\Lenovo\Desktop\CAPSTONE\repairwale\client
npm run build
```

The built assets will be in `repairwale/client/dist`. If you want the Express server to serve the production build, update the server static path to point to this `dist` folder.


Notes & next steps
- This is a prototype. To build the real app:
  - Replace the simple name-based mock auth with Firebase Auth (web or React Native SDK).
  - Store mechanics and requests in Firestore and add geospatial queries.
  - Integrate Google Maps (or continue with Leaflet) and real location tracking from devices.
  - Use Razorpay server-side order creation and front-end checkout flow for payments.
  - Migrate frontend to React Native (Expo) for cross-platform mobile builds — keep the same backend APIs.

Files added
- `server/` — Express + Socket.io server
- `client/` — Static prototype: `index.html`, `app.js`, `styles.css`

If you want, I can:
- Convert the frontend to a React app or an Expo React Native project.
- Add Firebase Auth + Firestore integration (I will need Firebase project config).
- Add a simulated Razorpay checkout flow.
