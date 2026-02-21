@echo off
REM Start both backend and frontend servers on Windows

echo.
echo.
echo ============================================
echo   RepairWale - Full Stack Development
echo ============================================
echo.
echo Starting both Backend and Frontend servers...
echo.

REM Navigate to root directory
cd /d "%~dp0"

REM Create a new terminal window for backend
echo [INFO] Starting Backend Server on port 3000...
start cmd /k "cd server && npm start"

REM Wait a bit for backend to initialize
timeout /t 3 /nobreak

REM Start frontend in another terminal
echo [INFO] Starting Frontend Server on port 5173...
start cmd /k "cd client && npm run dev"

echo.
echo ============================================
echo   Servers launched in separate windows!
echo ============================================
echo.
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:3000
echo.
echo NOTE: Close the command windows to stop the servers
echo.

pause
