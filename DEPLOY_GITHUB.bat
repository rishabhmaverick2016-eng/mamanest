@echo off
title Push MamaNest to GitHub for Free 24/7 Hosting
echo ==========================================================
echo   MamaNest - 1-Click GitHub Pages Deploy Helper
echo ==========================================================
echo.
echo Step 1: Open GitHub to create a new repository:
echo         Recommended name: "mamanest" or "mama-haven"
echo         Public repository is recommended for free GitHub Pages.
echo.
echo Opening https://github.com/new in your browser...
start https://github.com/new
echo.
echo Step 2: After creating the repo, copy the repository URL
echo         (e.g., https://github.com/rishabhmaverick2016-eng/mamanest.git)
echo.
set /p REPO_URL="Paste GitHub Repo URL here: "
if "%REPO_URL%"=="" goto end

git remote remove origin >nul 2>&1
git branch -M main
git remote add origin %REPO_URL%
echo.
echo Pushing MamaNest to GitHub...
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ==========================================================
    echo SUCCESS! Files pushed to GitHub!
    echo.
    echo FINAL STEP to activate your free 24/7 link for your Wife:
    echo 1. Open your repository on GitHub.
    echo 2. Click "Settings" (gear icon) -^> "Pages" (left sidebar).
    echo 3. Under "Branch", select "main" and click "Save".
    echo.
    echo Within 1 minute, GitHub will give you a live HTTPS link, e.g.:
    echo https://YourUsername.github.io/mamanest/
    echo.
    echo Send that link to your wife to add to her phone home screen!
    echo ==========================================================
) else (
    echo.
    echo [Notice] If the push failed, please make sure the repository exists
    echo on GitHub and you are signed in.
)

pause
:end
