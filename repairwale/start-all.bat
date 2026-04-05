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

REM Ensure dependencies are installed for both apps
if not exist "%~dp0server\node_modules" (
	echo [INFO] Installing backend dependencies...
	call npm --prefix server install
)

if not exist "%~dp0client\node_modules" (
	echo [INFO] Installing frontend dependencies...
	call npm --prefix client install
)

REM Create a new terminal window for backend
echo [INFO] Starting Backend Server on port 3000...
start "RepairWale Backend" cmd /k "cd /d "%~dp0server" && npm start"

REM Wait a bit for backend to initialize
timeout /t 3 /nobreak

REM Start frontend in another terminal
echo [INFO] Starting Frontend Server on port 5173...
start "RepairWale Frontend" cmd /k "cd /d "%~dp0client" && npm run dev -- --host"

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
