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

Persistent local run (avoid accidental exits)
1. Use two dedicated terminals: one ONLY for the server, one for client builds/dev.
2. Do not reuse the server terminal to run `npm run build` for the client (that will stop the server process if foreground).
3. Optionally use `nodemon` (auto-restart on code changes) or `pm2` (process manager).

Add nodemon:
```powershell
cd C:\Users\Lenovo\Desktop\CAPSTONE\repairwale\server
npm install --save-dev nodemon
# Add to server/package.json scripts: "dev": "nodemon index.js"
npm run dev
```

Add pm2 (persistent + restart on crash):
```powershell
npm install -g pm2
pm2 start C:\Users\Lenovo\Desktop\CAPSTONE\repairwale\server\index.js --name repairwale
pm2 logs repairwale
pm2 save
# To list processes
pm2 ls
```

Deployment options (choose one)

Render (recommended for combined Express + static build):
1. Push repo to GitHub.
2. Create new Web Service in Render pointing to `repairwale/server` folder.
3. Build command:
  ```bash
  cd ../client && npm install && npm run build && cd ../server && npm install
  ```
4. Start command:
  ```bash
  node index.js
  ```
5. Ensure server code serves `../client/dist` (already auto-detected).

Railway / Fly.io similar steps: run build for client then start server.

Vercel split (if you want edge‑optimized static site + separate API):
1. Deploy `client/dist` via Vercel (configure build: `npm run build` inside client).
2. Deploy server separately (Render/Railway). Update client API base URL to deployed server domain.

Environment variables:
- `PORT` (optional) to override default 3000.
- Future: `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET` for payment integration.

Common local exit causes & prevention:
- Starting builds in same terminal -> open new terminal for builds.
- Accidental Ctrl+C -> watch for signal log `[SIGNAL] SIGINT received`.
- Path error (`node index.js` from wrong directory) -> use absolute path or `cd server` first.
- Unhandled errors (now logged) -> check console for `[FATAL]` or `[SERVER ERROR]` lines.

Health check:
```powershell
Invoke-WebRequest -UseBasicParsing http://localhost:3000/health | Select-Object -ExpandProperty Content
```

To run on different port:
```powershell
$env:PORT=4000; node index.js
```

Next deployment enhancements:
- Add real payment order/signature verification route.
- Add persistent data store (MongoDB / Postgres) instead of in-memory arrays.
- Implement geo-indexed search (MongoDB 2dsphere, or Firestore + geohashing library).
- Add rate limiting & request logging (morgan + pino). 


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
