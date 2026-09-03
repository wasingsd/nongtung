---
name: "Nongtung Adventure"
description: "Northern Thailand outdoor adventure, guided trekking, camping gear rental & 4WD transport design system"
colors:
  primary: "#D66E3A"
  primary-deep: "#B54F23"
  primary-light: "#E08556"
  forest: "#262A22"
  forest-light: "#444B3D"
  accent: "#8DA165"
  ochre: "#C89F65"
  surface: "#FAF9F4"
  surface-card: "#FFFFFF"
  background: "#fdfdfb"
  foreground: "#2e3022"
  card-bg: "#ffffff"
  line: "#06c755"
typography:
  scale:
    micro: "8px"
    badge: "9px"
    kicker: "10px"
    caption-tight: "11px"
    xs: "12px"
    sm: "14px"
    base: "16px"
    lg: "18px"
    xl: "20px"
    "2xl": "24px"
    "3xl": "30px"
    "4xl": "36px"
    "5xl": "48px"
    "6xl": "60px"
    "7xl": "72px"
    "8xl": "96px"
    numeral: "128px"
  display:
    fontFamily: "Urbanist, sans-serif"
    fontSize: "clamp(2.5rem, 5vw, 4rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Urbanist, sans-serif"
    fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Urbanist, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Kanit, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Kanit, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
rounded:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  3xl: "64px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.full}"
    padding: "14px 28px"
  button-primary-hover:
    backgroundColor: "{colors.primary-deep}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.forest}"
    rounded: "{rounded.full}"
    padding: "14px 28px"
  card:
    backgroundColor: "{colors.card-bg}"
    rounded: "{rounded.lg}"
    padding: "24px"
---

# Design System

## Overview

The Nongtung Adventure design language fuses Northern Thai rugged mountain wilderness with modern, premium outdoor aesthetics. Every screen evokes mist-covered mountain ridges, earthy clay, deep forest canopy, and warm sunrise amber while prioritizing swift user comprehension, intuitive booking paths, and effortless mobile ergonomics.

## Colors

The palette is derived directly from the landscapes of Northern Thailand:
- **Primary (`#D66E3A`)**: Adventure Orange, inspired by sunrise over mountain ridges and trekking trail markers. Used for primary CTAs, active tags, and accent highlights.
- **Primary Deep (`#B54F23`)**: Terracotta Clay, used for hover and pressed states of primary buttons.
- **Forest Dark (`#262A22`)**: Deep evergreen foliage and nocturnal mountain silhouettes. Used for dominant headings, high-contrast text, dark section backgrounds, and the footer.
- **Forest Light (`#444B3D`)**: Moss and mountain mist foliage. Used for secondary labels, muted icons, and border accents.
- **Olive Accent (`#8DA165`)**: New-growth trail foliage. Used for eco-badges, difficulty ratings (moderate/easy), and subtle highlights.
- **Ochre (`#C89F65`)**: Mountain mineral and dry straw. Used for star ratings, badges, and warm borders.
- **Surface (`#FAF9F4`)**: Warm parchment off-white, providing organic softness and eliminating sterile clinical white.
- **LINE Green (`#06c755`)**: Direct messaging CTA color for LINE Official Account integration.

## Typography

Typography creates dynamic pacing between English headings and Thai/English body text:
- **Headings (`Urbanist`)**: Bold, confident sans-serif with subtle geometric rhythm and tight tracking (`-0.02em` to `-0.03em`). Creates punchy, memorable editorial impact.
- **Body & Controls (`Kanit`)**: Highly readable Thai/English modern sans-serif. Exceptional legibility at small sizes, generous x-height, and neutral character suitable for detailed gear specs, day-by-day itineraries, and prices.
- **Numeric & Pricing**: Uses `font-variant-numeric: tabular-nums` for prices, elevation stats, and gear counts to maintain strict vertical alignment.

## Layout

- **Container Boundaries**: Centered `max-w-7xl` (1280px) for general content, extending to `1440px` for immersive media grids.
- **Rhythm & Spacing**: Generous section breathing room (`py-16` to `py-24` on desktop, `py-10` to `py-14` on mobile). Alternate between warm off-white surface sections (`bg-surface`) and deep forest immersion sections (`bg-forest text-white`) to give the page visual cadence.
- **Grid Architecture**: 1 column on mobile, 2 columns on tablet, 3-4 columns on desktop with consistent gap scales (`gap-6` to `gap-8`).

## Elevation & Depth

- Avoid harsh multi-layered CSS drop-shadows.
- Use soft, ambient, natural shadow: `.immersive-shadow` (`box-shadow: 0 10px 50px -12px rgba(46, 48, 34, 0.08)`).
- Layer depth using tonal surface contrast (e.g. placing white cards on `#FAF9F4` surface or `#262A22` forest surface) rather than heavy drop shadows.
- Subtle frosted glass headers with `backdrop-blur-md` and light border `border-black/5` or `border-white/10`.

## Shapes

- **Border Radii**: Warm, organic, rounded geometry.
  - Buttons & Badges: Pill shape (`rounded-full`).
  - Cards: `rounded-2xl` (16px) or `rounded-3xl` (24px).
  - Hero and featured sections: `rounded-[2.5rem]` to `rounded-[3rem]`.
- **Form Controls**: Generous rounded corners (`rounded-xl` / 12px) with 44px+ touch targets and clear focus rings (`ring-2 ring-primary/40`).

## Components

- **Buttons**:
  - Primary: High-contrast orange with white text, bold, uppercase tracking, subtle hover lift and brightness shift.
  - Secondary: Ghost or border button with gentle forest-light border and hover fill.
  - Floating LINE CTA: Bottom-right fixed widget with pulsing online beacon.
- **Cards**: Clean, borderless or delicately bordered (`border border-black/[0.06]`), image zoom on card hover (`group-hover:scale-105`), with pill tags positioned top-left over media.
- **Timeline / Itinerary**: Connected vertical line with numbered nodes or elevation milestone markers, replacing plain bullet points.
- **Filter Bars**: Horizontal scrolling chip bar on mobile (`no-scrollbar`), sticky on top when scrolling through trip catalogs.

## Do's and Don'ts

### Do's
- DO preserve organic earth and forest color harmony at all times.
- DO ensure all mobile touch targets meet or exceed 44x44px.
- DO support bilingual content seamlessly without text truncation or awkward layout breaking.
- DO use subtle, purposeful micro-interactions (smooth hover lifts, smooth accordion transitions).
- DO format Thai Baht currency and dates cleanly and consistently.

### Don'ts
- DON'T use thick colored left borders (`border-l-4`) on cards (AI-tell anti-pattern).
- DON'T use generic cold gray backgrounds (`#f3f4f6`); always use warm organic surface (`#FAF9F4` or `#FDFDFB`).
- DON'T use harsh neon colors or uncalibrated gradients.
- DON'T use small clickable areas or crowded form fields on mobile.
- DON'T display raw unformatted error messages to users.
