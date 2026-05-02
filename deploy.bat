@echo off
git pull origin main
git add .
git commit -m "update"
git push origin main
echo Deploy ho gaya!
pause