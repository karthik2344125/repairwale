@echo off
REM Start RepairWale Backend Server
REM This script starts the Node.js backend on port 3000

echo.
echo ========================================
echo  🔧 RepairWale Backend Server Startup
echo ========================================
echo.

cd server

REM Check if node_modules exists
if not exist node_modules (
    echo 📦 Installing dependencies...
    call npm install
    echo ✓ Dependencies installed
    echo.
)

REM Start the server
echo 🚀 Starting backend server...
echo.
node index.js

pause
