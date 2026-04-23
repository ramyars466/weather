@echo off
echo ============================================
echo Starting Weather Backend...
echo ============================================
cd /d "%~dp0backend"
python main.py
pause