@echo off
echo ========================================
echo FitBuddy - Installation Script
echo ========================================
echo.

echo Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js found: 
node --version
echo.

echo Checking npm installation...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: npm is not installed!
    pause
    exit /b 1
)

echo npm found:
npm --version
echo.

echo ========================================
echo Installing dependencies...
echo This may take a few minutes...
echo ========================================
echo.

call npm install

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Installation failed!
    echo Please check the error messages above.
    pause
    exit /b 1
)

echo.
echo ========================================
echo Installation Complete!
echo ========================================
echo.
echo To start the app, run:
echo   npm start
echo.
echo Then:
echo - Press 'a' for Android
echo - Press 'i' for iOS
echo - Press 'w' for Web
echo - Or scan QR code with Expo Go app
echo.
echo Demo Login:
echo   Username: emilys
echo   Password: emilyspass
echo.
echo ========================================
pause
