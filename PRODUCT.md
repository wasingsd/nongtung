# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary Outdoor Adventurers & Hikers**: Thai and international outdoor enthusiasts looking for guided trekking, hiking, camping, and natural discovery trips in Northern Thailand (Chiang Mai, Chiang Rai, Mae Hong Son, Nan).
- **Camping & Trekking Equipment Renters**: Individuals and groups needing high-quality outdoor gear (tents, sleeping bags, trekking poles, cooking gear) without having to purchase expensive equipment.
- **Corporate & Group Outing Organizers**: HR and team leaders looking for corporate retreat packages, team building, and customized adventure itineraries in nature.
- **Local Transport Seekers**: Adventurers requiring reliable 4WD / 4x4 mountain transportation, trail transfers, and local experienced drivers for rugged routes.

## Product Purpose

Nongtung Adventure is a digital adventure tourism and gear rental platform dedicated to Northern Thailand. It empowers travelers to explore pristine mountain trails safely, rent reliable outdoor equipment seamlessly, coordinate dedicated off-road transport, and organize corporate team experiences with local indigenous guides and community-first eco-tourism principles.

## Positioning

The premier Northern Thailand adventure platform uniting curated guided trekking expeditions, professional camping equipment rental, dedicated 4WD mountain transportation, and authentic community connections under an earth-toned, modern, trustworthy digital brand.

## Operating Context

- Bilingual Thai and English interface serving domestic Thai explorers as well as international tourists visiting Northern Thailand.
- Frequently accessed on mobile devices (smartphones) by travelers in transit, at airports, or during travel planning in cafe settings.
- Integration with direct LINE Official Account chat (`@nongtung`) for rapid local Thai customer engagement, quotation finalization, and booking confirmation.
- Direct connectivity with Firebase Firestore for dynamic adventure trips, rental inventory, articles, and corporate inquiries.

## Capabilities and Constraints

- **Capabilities**:
  - Multilingual routing (`/[lang]/...`) supporting `th` and `en` locales.
  - Comprehensive Trip explorer with multi-attribute filtering (duration, difficulty, elevation, price).
  - Detailed Trip dossier pages with day-by-day itineraries, packing lists, photo lightboxes, and instant booking/quote triggers.
  - Rental equipment catalog with category filtering, date range selection, and quantity computation.
  - Mountain 4WD transport booking with route estimation, vehicle specifications, and driver details.
  - Corporate & Group inquiry forms with custom participant sizing and budget specification.
  - Knowledge Journal / Articles with rich editorial layouts and related adventure cross-selling.
  - Admin management suite (`/(admin)/...`) for managing trips, rental inventory, articles, and inquiries.
- **Constraints**:
  - Next.js 16 (App Router) with Turbopack and TailwindCSS v4.
  - Firebase Firestore as the persistence layer.
  - Mobile responsiveness is paramount (touch targets >= 44px, sticky booking bars, thumb-friendly navigation).

## Brand Commitments

- **Name**: Nongtung Adventure (น้องตุ้ง แอดเวนเจอร์)
- **Identity Tone**: Premium Adventure & Northern Nature (Modern yet deeply rooted in forest and earth aesthetics).
- **Core Palette**: Primary Adventure Orange (`#D66E3A`), Deep Terracotta (`#B54F23`), Forest Dark (`#262A22`), Forest Light (`#444B3D`), Olive Accent (`#8DA165`), Warm Ochre (`#C89F65`), Warm Surface (`#FAF9F4`).
- **Typography**: Display/Headings in `Urbanist` (bold, tracking-tighter, energetic), Body/Content in `Kanit` (warm, highly legible Thai and English sans-serif).

## Evidence on Hand

- Verified routes and actual mountain itineraries in Chiang Mai / Chiang Rai (Doi Luang Chiang Dao, Mon Jong, Mae Tuen, Doi Pui).
- Real rental inventory catalog (Nordisk, Naturehike tents, sleeping bags, Coleman lanterns).
- TikTok social proof and community testimonials in `src/components/TikTokRTB.tsx` and `Testimonials.tsx`.
- Complete design system guidelines in `UI_STYLE_GUIDE.md`.

## Product Principles

1. **Uncompromising Clarity on Adventure Essentials**: Every trip and rental item clearly presents difficulty level, duration, included gear, physical readiness requirements, and transparent pricing.
2. **Frictionless Mobile Booking Flow**: Smooth, intuitive paths to action from discovery to LINE / inquiry with persistent thumb-accessible triggers.
3. **Deep Nature Aesthetics without Slop**: Premium, organic colors and natural textures that evoke the Northern Thai wilderness without relying on generic AI clichés (no heavy side-tabs, harsh borders, or unstyled cards).
4. **Authentic Community Respect**: Highlight local guides, environmental conservation, Leave-No-Trace principles, and respectful interaction with local mountain communities.

## Accessibility & Inclusion

- Adherence to WCAG 2.1 AA standards for color contrast, especially for forest green and orange accents against light/dark backgrounds.
- Screen-reader accessible forms with visible labels, descriptive aria tags, and polite status announcements.
- Touch-friendly minimum target size of 44x44px for all mobile interactive elements.
- Fluid typography and responsive scaling supporting browser text zoom up to 200%.
