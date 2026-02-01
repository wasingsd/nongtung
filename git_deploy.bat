@echo off
echo Starting Git commands...
git add .
git commit -m "feat: SEO, GTM, and asset path updates"
git push origin develop
git checkout main
git merge develop
git push origin main
git checkout develop
echo Git commands finished.
