---
description: How to deploy changes to Preview (develop) and Production (main)
---

# Deployment Workflow

This workflow ensures that all changes are tested on a Preview environment before going live to Production.

## 1. Work on `develop` (Preview)
Always write code and commit on the `develop` branch.
```powershell
git checkout develop
# ... make your changes ...
git add .
git commit -m "Your commit message"
```

## 2. Deploy to Preview
Pushing to `develop` automatically triggers a Vercel Preview deployment.
```powershell
// turbo
git push origin develop
```
*Wait for Vercel to build. Check the preview URL provided by Vercel bot in GitHub or your Vercel Dashboard.*

## 3. Promote to Production
If the preview looks good, merge `develop` into `main` to deploy to the live site.
```powershell
git checkout main
git merge develop
// turbo
git push origin main
```

## 4. Return to Development
Switch back to `develop` to continue working on the next feature.
```powershell
git checkout develop
```
