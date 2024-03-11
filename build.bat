@echo off
setlocal enabledelayedexpansion
chcp 65001 > nul

set "source=src"

pushd %source%

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