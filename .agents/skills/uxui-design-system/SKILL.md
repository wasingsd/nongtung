---
name: uxui-design-system
description: Design principles, UI/UX standards, typography, accessibility, responsive layouts, and interactive component guidelines for modern Thai enterprise web applications. Use when designing, building, or refining user interfaces, web forms, data tables, or design system tokens.
---

# Enterprise UX/UI Design System Skill

This skill provides comprehensive guidelines for constructing, auditing, and polishing modern enterprise UI/UX for Thai web applications.

## Key UI/UX Principles

1. **Information Hierarchy & Visual Balance**:
   - Primary actions must use Brand Green (`#126b46`), secondary actions use subtle outline buttons (`#fff` with `#dbe5de` border).
   - Distinct kicker text (`.page-kicker`) in 10-11px bold uppercase for domain categorization.
   - Clean page headers with clear context description and action buttons.

2. **Typography & Readability**:
   - Primary Font: `"Noto Sans Thai", "Leelawadee UI", Tahoma, sans-serif`.
   - Clear contrast for high legibility (Ink `#15251c` for headings, Muted `#65736a` for secondary labels).
   - Tabular numbers (`font-variant-numeric: tabular-nums`) for currency amounts, quantities, dates, and percentages.

3. **Data Presentation & Tables**:
   - Sticky table headers (`th`) with uppercase 10px tracking.
   - Distinct status badges (`.status-ready`, `.status-review`, `.doc-status.draft`, `.doc-status.sent`).
   - Clean numbered pagination (`Pagination`) without cluttering arrow icons.

4. **Responsive Layout Boundaries**:
   - Container max-width: `1460px` centered for widescreen monitors (2K, 4K).
   - Glassmorphism sticky headers (`backdrop-filter: blur(12px)`).
   - Touch targets >= 44x44px for mobile/tablet responsive mode.
