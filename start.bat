@echo off
echo Starting Weather Intelligence Platform...
cd /d "%~dp0backend"

echo Starting backend on port 8000...
start "WeatherBackend" cmd /k "python main.py"

cd /d "%~dp0frontend"
echo Starting frontend on port 3000...
start "WeatherFrontend" cmd /k "npm run dev"

echo.
echo Both servers should start. Use http://localhost:3000 to view the dashboard.
echo NOTE: If backend fails, install dependencies first:
echo   pip install fastapi uvicorn httpx pydantic python-dotenv
pause