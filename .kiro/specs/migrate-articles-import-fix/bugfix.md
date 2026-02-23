# Bugfix Requirements Document

## Introduction

The Vercel build is failing due to an incorrect import path in the migrate-articles API route. The route attempts to import the articles data from `@/app/articles/data`, but the actual file is located at `@/app/(site)/[lang]/articles/data.ts`. This causes a "Module not found" error during the build process, preventing successful deployment.

## Bug Analysis

### Current Behavior (Defect)

1.1 WHEN the migrate-articles route is built on Vercel THEN the system fails with error "Module not found: Can't resolve '@/app/articles/data'"

1.2 WHEN the TypeScript compiler attempts to resolve the import path `@/app/articles/data` THEN the system cannot locate the module because the file structure uses `(site)/[lang]/articles/data.ts`

### Expected Behavior (Correct)

2.1 WHEN the migrate-articles route is built on Vercel THEN the system SHALL successfully resolve the import path and complete the build without errors

2.2 WHEN the TypeScript compiler processes the import statement THEN the system SHALL correctly resolve to `@/app/(site)/[lang]/articles/data` where the articles array and Article interface are exported

### Unchanged Behavior (Regression Prevention)

3.1 WHEN the migrate-articles route processes the articles data THEN the system SHALL CONTINUE TO iterate through all articles and save them to Firestore with the same data transformation logic

3.2 WHEN the route handles successful migration THEN the system SHALL CONTINUE TO return a JSON response with success status and count of migrated articles

3.3 WHEN the route encounters an error during migration THEN the system SHALL CONTINUE TO return a JSON error response with 500 status code
