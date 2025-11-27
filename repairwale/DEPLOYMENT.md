# RepairWale - Live Deployment Guide

## Quick Deploy Options

### Option 1: Render (Recommended - Free Tier)
1. Push your code to GitHub
2. Go to [render.com](https://render.com)
3. Sign up/Login with GitHub
4. Click "New +" → "Web Service"
5. Connect your repository
6. Render will auto-detect `render.yaml` and configure automatically
7. Click "Create Web Service"
8. Your app will be live at: `https://repairwale.onrender.com`

### Option 2: Railway (Fast & Easy)
1. Go to [railway.app](https://railway.app)
2. Click "Start a New Project"
3. Select "Deploy from GitHub repo"
4. Select your repository
5. Railway auto-configures Node.js apps
6. Add environment variable: `PORT=3000`
7. Your app will be live at: `https://repairwale.up.railway.app`

### Option 3: Vercel (Static + Serverless)
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow prompts
4. Your app will be live at: `https://repairwale.vercel.app`

### Option 4: Netlify
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop the `client/dist` folder
3. Or connect GitHub repo
4. Configure:
   - Build command: `cd client && npm run build`
   - Publish directory: `client/dist`
5. For server: Deploy separately or use Netlify Functions

## Current Setup Status
- ✅ Client build ready (`client/dist`)
- ✅ Server configured (`server/index.js`)
- ✅ Render config created (`render.yaml`)
- ✅ Build script created (`build.sh`)

## Environment Variables Needed (if using Firebase/Razorpay)
```
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project
VITE_RAZORPAY_KEY_ID=your_razorpay_key
```

## Git Commands to Deploy
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

Then follow steps for your chosen platform above.
