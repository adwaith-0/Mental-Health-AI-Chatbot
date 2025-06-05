# Get the current directory
$rootDir = Split-Path -Parent $MyInvocation.MyCommand.Path

# Start the backend server
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$rootDir'; node server.js"

# Start the frontend server
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$rootDir\client'; npm start" 