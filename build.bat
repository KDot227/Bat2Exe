@echo off
setlocal enabledelayedexpansion
chcp 65001 > nul

bun upgrade --canary

if %errorlevel% neq 0 (
    echo PLEASE DOWNLOAD BUN FROM THE WEBSITE OR WITH CURL
    pause
    exit /b %errorlevel%
)

set "source=src"

pushd %source%

set /p pathtobatfile="Path to Bat file: "
if not exist %pathtobatfile% (
    echo Bat file not found
    pause
    exit
)

if not %pathtobatfile:~-4%==.bat (
    if not %pathtobatfile:~-4%==.cmd (
        echo Not a bat or cmd file
        pause
        exit
    )
)


set "encodedBat="
certutil -encode "%pathtobatfile%" "%temp%\encodedBat.b64"
for /f "usebackq delims=" %%a in ("%temp%\encodedBat.b64") do set "encodedBat=!encodedBat!%%a"

del /q /f "%temp%\encodedBat.b64"

echo %encodedBat%
set "newEnc=%encodedBat:~27%"
set "newEnc2=%newEnc:~0,-25%"
echo %newEnc2%

copy /y to_compile\static\template.js to_compile\template.js

powershell -Command "(gc to_compile\template.js) -replace 'BASE64ENCODEDSTUFFHERE', '%newEnc2%' | Out-File -Encoding ASCII -Force to_compile\template.js"

pause

set "buildDependencies=bun install --save-dev javascript-obfuscator"

set "obfuscateCommand=bun obfuscator.js"

set "buildCommand=bun build --minify --compile to_compile\main.js --outfile ..\main.exe"

%buildDependencies%
%obfuscateCommand%
%buildCommand%

if %errorlevel% neq 0 (
    echo Build failed
    pause
    exit /b %errorlevel%
)

popd

echo yay  (っ｡◝‿◜｡)っ