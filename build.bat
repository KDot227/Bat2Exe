@echo off
setlocal enabledelayedexpansion
chcp 65001 > nul

bun upgrade --canary

if %errorlevel% neq 0 (
    echo PLEASE DOWNLOAD BUN FROM THE WEBSITE OR WITH CURL
    pause
    exit /b %errorlevel%
)

cls

set /p hideConsole=Hide console window? (y/n): 

if %hideConsole% == y (
    set "hideConsole=--hide"
) else (
    set "hideConsole="
)

set /p removeFiles=Remove files after build? (y/n):
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

set "source=src"

pushd %source%

set "buildDependencies=bun install --save-dev javascript-obfuscator"

set "obfuscateCommand=bun obfuscator.js"

set "buildCommand=bun build --minify --compile to_compile\main.js --outfile ..\main.exe"

%buildDependencies%
if %errorlevel% neq 0 (
    echo Build dependencies failed
    pause
    exit /b %errorlevel%
)
%obfuscateCommand%
if %errorlevel% neq 0 (
    echo Obfuscate failed
    pause
    exit /b %errorlevel%
)
%buildCommand%
if %errorlevel% neq 0 (
    echo Build failed
    pause
    exit /b %errorlevel%
)

popd

echo finished

pause
exit