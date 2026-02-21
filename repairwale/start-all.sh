#!/bin/bash
# Start both backend and frontend servers

echo "🚀 Starting RepairWale services..."
echo ""

# Start backend server in background
echo "📍 Starting Backend Server on port 3000..."
cd ./server
npm start &
BACKEND_PID=$!

# Wait for backend to start
sleep 3

# Start frontend dev server
echo "🎨 Starting Frontend Server on port 5173..."
cd ../client
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Both servers started!"
echo ""
echo "🌐 Frontend: http://localhost:5173"
echo "📡 Backend:  http://localhost:3000"
echo ""
echo "To stop all servers, press Ctrl+C"

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
