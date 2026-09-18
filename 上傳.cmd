@echo off
setlocal
cd /d "%~dp0"

node.exe "%~dp0scripts\publish-private-data.mjs" --input "%~dp0private\data.xlsx" --force
if errorlevel 1 (
  echo.
  echo ERROR: Commit ^& Push failed. Review the message above and press any key to close this window.
  pause >nul
  exit /b 1
)
