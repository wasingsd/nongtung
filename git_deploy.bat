@echo off
echo Starting Git commands...
call npm config set registry https://registry.npmmirror.com
call npm install
git add .
git commit -m "feat: deployment fixes and mobile updates"
git push origin develop
git checkout main
git merge develop
git push origin main
git checkout develop
echo Git commands finished.
