@echo off
REM Start RepairWale Frontend Development Server
REM This script starts the React dev server with Vite

echo.
echo ========================================
echo  ⚛️  RepairWale Frontend Dev Server
echo ========================================
echo.

cd client

REM Check if node_modules exists
if not exist node_modules (
    echo 📦 Installing dependencies...
    call npm install
    echo ✓ Dependencies installed
    echo.
)

REM Start Vite dev server
echo 🚀 Starting frontend dev server...
echo    It will open on http://localhost:5173
echo.
call npm run dev

pause
