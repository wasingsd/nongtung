# 🏔️ Nongtung Adventure - Development Plan
> **Last Updated:** 2026-02-02
> **Version:** 2.0
> **Project Status:** Active Development

---

## 📋 สารบัญ (Table of Contents)
1. [ภาพรวมโครงการ (Project Overview)](#-ภาพรวมโครงการ)
2. [สถาปัตยกรรมระบบ (System Architecture)](#-สถาปัตยกรรมระบบ)
3. [แผนพัฒนาหน้าบ้าน (Frontend Roadmap)](#-แผนพัฒนาหน้าบ้าน-frontend)
4. [แผนพัฒนาหลังบ้าน (Admin Panel Roadmap)](#-แผนพัฒนาหลังบ้าน-admin-panel)
5. [แผนพัฒนาระบบ (Systems & Infrastructure)](#-แผนพัฒนาระบบ-systems--infrastructure)
6. [Sprint Log & Changelog](#-sprint-log--changelog)

---

## 🎯 ภาพรวมโครงการ

### วิสัยทัศน์ (Vision)
สร้างแพลตฟอร์มดิจิทัลสำหรับ **Nongtung Adventure** ให้เป็นผู้นำด้านบริการท่องเที่ยวเชิงผจญภัยในภาคเหนือ ด้วยระบบที่รองรับการขยายตัว (Scalable) และประสบการณ์ผู้ใช้ระดับพรีเมียม

### เป้าหมายหลัก (Core Objectives)
- **Scalability**: ระบบรองรับการขยายตัวของธุรกิจ (ทริปจอย, ทริปองค์กร, อุปกรณ์เช่า)
- **Premium UX**: ประสบการณ์ผู้ใช้ที่ "ว้าว" ตั้งแต่แรกเห็น
- **SEO-First**: โครงสร้างที่เอื้อต่อการติดอันดับ Google Organic Search
- **Operational Efficiency**: ระบบหลังบ้านที่จัดการได้ง่าย ไม่ต้องพึ่งโปรแกรมเมอร์

### เทคโนโลยีหลัก (Tech Stack)
| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | TailwindCSS 4 |
| Database | Firebase Firestore |
| Hosting | Vercel |
| Icons | Lucide React |
| Rich Text | React Quill (New) |

---

## 🏗️ สถาปัตยกรรมระบบ

```
┌─────────────────────────────────────────────────────────────────┐
│                        NONGTUNG PLATFORM                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────┐    ┌──────────────────┐                   │
│  │   FRONTEND       │    │   ADMIN PANEL    │                   │
│  │   (Public)       │    │   (Protected)    │                   │
│  │                  │    │                  │                   │
│  │  • Home          │    │  • Trips CRUD    │                   │
│  │  • Trips         │    │  • Rental CRUD   │                   │
│  │  • Rental        │    │  • Transport     │                   │
│  │  • Transport     │    │  • Articles      │                   │
│  │  • Journal       │    │  • Settings      │                   │
│  │  • Corporate     │    │  • Corporate     │                   │
│  └────────┬─────────┘    └────────┬─────────┘                   │
│           │                       │                             │
│           └───────────┬───────────┘                             │
│                       │                                         │
│  ┌────────────────────▼─────────────────────┐                   │
│  │            SERVER ACTIONS                │                   │
│  │     (Next.js API / Form Actions)         │                   │
│  └────────────────────┬─────────────────────┘                   │
│                       │                                         │
│  ┌────────────────────▼─────────────────────┐                   │
│  │          FIREBASE FIRESTORE              │                   │
│  │  Collections: trips, rentals, transport, │                   │
│  │  articles, quotes, settings              │                   │
│  └──────────────────────────────────────────┘                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🌐 แผนพัฒนาหน้าบ้าน (Frontend)

### Phase F1: Core Pages ✅ COMPLETED
> สร้างหน้าหลักพื้นฐานทั้งหมด

| Task | Status | Notes |
|------|--------|-------|
| Homepage (`/`) | ✅ Done | Hero, Popular Adventures, Services Grid |
| Trips Listing (`/trips`) | ✅ Done | Filter by duration, type, difficulty |
| Trip Detail (`/trips/[id]`) | ✅ Done | Gallery, Itinerary, Pricing, CTA |
| Rental Listing (`/rental`) | ✅ Done | Category filter, Stock display |
| Rental Detail (`/rental/[id]`) | ✅ Done | Features, Pricing per unit |
| Transport (`/transport`) | ✅ Done | Vehicle types, Price comparison |
| Corporate (`/corporate`) | ✅ Done | Inquiry form, Benefits showcase |
| Articles Listing (`/articles`) | ✅ Done | Card grid, Tags |
| Article Detail (`/articles/[slug]`) | ✅ Done | Full content, Related trips |

---

### Phase F2: Premium UX Enhancement ✅ COMPLETED
> ยกระดับ Visual Design ให้ดูพรีเมียม

| Task | Status | Notes |
|------|--------|-------|
| Global Typography System | ✅ Done | Urbanist (Headings), Kanit (Body) |
| Color Palette Refinement | ✅ Done | Primary #f07d3a, Forest #2e3022 |
| Hero Section Redesign | ✅ Done | Full-screen immersive style |
| Card Components | ✅ Done | Rounded corners, Hover effects |
| Button System | ✅ Done | Pill style, Micro-animations |
| Responsive Navigation | ✅ Done | Glass morphism navbar, Mobile menu |
| Footer Enhancement | ✅ Done | Social links, Newsletter signup |
| Dark Mode Support | ✅ Done | System-aware toggle |

---

### Phase F3: Article Experience Upgrade ✅ COMPLETED
> ปรับปรุงหน้าบทความให้ทันสมัยระดับ Premium

| Task | Status | Notes |
|------|--------|-------|
| Immersive Hero Header | ✅ Done | Full viewport, Gradient overlay |
| Premium Typography for Prose | ✅ Done | Drop caps, Better line height |
| Floating Sidebar Actions | ✅ Done | Share, Save buttons |
| Author Block Design | ✅ Done | Avatar, Status indicator |
| Map Integration Widget | ✅ Done | Trekking route visualization |
| Related Trip CTA Card | ✅ Done | Dark theme, Premium styling |
| Newsletter Widget | ✅ Done | Inline email subscription |
| Tags Footer | ✅ Done | Clickable tag chips |

---

### Phase F4: Conversion Optimization 🔄 IN PROGRESS
> เพิ่มองค์ประกอบที่ช่วยปิดการขาย

| Task | Status | Notes |
|------|--------|-------|
| Contact Us → Facebook Link | ✅ Done | Header button links to FB page |
| LINE Chat Widget | ✅ Done | Floating button with pulse animation |
| Testimonials Section | ✅ Done | 3 customer reviews with premium dark theme |
| Trust Badges | ✅ Done | Replaced old statistics section |
| Trip Booking CTA Enhancement | 🔲 Todo | Sticky footer on mobile |
| Price Comparison Tables | 🔲 Todo | For rental packages |

---

### Phase F5: SEO & Performance 🔄 IN PROGRESS
> ปรับแต่งเพื่อติดอันดับ Google

| Task | Status | Notes |
|------|--------|-------|
| robots.txt Setup | ✅ Done | AI bots allowed |
| llms.txt for AI Search | ✅ Done | ChatGPT, Claude, Perplexity |
| Sitemap Enhancement | ✅ Done | Added articles, corporate pages |
| Enhanced Structured Data | ✅ Done | TravelAgency, LocalBusiness schema |
| Meta Tags Management | 🔲 Todo | Dynamic OG images per page |
| Image Optimization | 🔄 Partial | Using next/image |
| Core Web Vitals Audit | 🔲 Todo | Target: All Green |

---

## 🔧 แผนพัฒนาหลังบ้าน (Admin Panel)

### Phase A1: Basic CRUD ✅ COMPLETED
> ระบบจัดการข้อมูลพื้นฐาน

| Task | Status | Notes |
|------|--------|-------|
| Admin Authentication | ✅ Done | Cookie-based session |
| Trip Create/Edit/Delete | ✅ Done | Full form with all fields |
| Rental Create/Edit/Delete | ✅ Done | Stock management |
| Transport Create/Edit/Delete | ✅ Done | Price tiers |
| Article Create/Edit/Delete | ✅ Done | Slug auto-generation |
| Corporate Inquiry View | ✅ Done | Status toggle (pending/done) |

---

### Phase A2: Admin UI Overhaul ✅ COMPLETED
> ปรับปรุง UI ระบบหลังบ้านให้ทันสมัย

| Task | Status | Notes |
|------|--------|-------|
| Dedicated Admin Layout | ✅ Done | Separate from frontend |
| Premium Header Design | ✅ Done | Search, Notifications, User info |
| Sidebar Navigation | ✅ Done | Icons, Active state, Grouping |
| Mobile Bottom Navigation | ✅ Done | Simplified for touch |
| Hide Public Navbar on Admin | ✅ Done | Path-based detection |
| Hide Public Footer on Admin | ✅ Done | Clean admin workspace |

---

### Phase A3: Home Settings Editor ✅ COMPLETED
> ตัวจัดการหน้าแรกแบบ Interactive

| Task | Status | Notes |
|------|--------|-------|
| Featured Adventures Selector | ✅ Done | Gallery picker UI |
| Drag-and-Drop Reordering | ✅ Done | GripVertical handle |
| Quick Remove from Featured | ✅ Done | X button per item |
| Auto-fill Current Display | ✅ Done | One-click import |
| Publish Changes Button | ✅ Done | Server action + revalidation |

---

### Phase A4: Rich Text Article Editor ✅ COMPLETED
> ระบบเขียนบทความแบบ WYSIWYG

| Task | Status | Notes |
|------|--------|-------|
| React Quill Integration | ✅ Done | react-quill-new package |
| Toolbar Configuration | ✅ Done | Headers, Lists, Links, Images |
| Two-Column Layout | ✅ Done | Content left, Settings right |
| Cover Image Preview | ✅ Done | Live thumbnail |
| SEO Fields Section | ✅ Done | Excerpt, Keywords, Tags |
| Related Trip Linking | ✅ Done | Trip ID input |
| Save & Publish Flow | ✅ Done | Unified button |

---

### Phase A5: Trips Page Premium Design ✅ COMPLETED
> หน้าจัดการทริปแบบใหม่

| Task | Status | Notes |
|------|--------|-------|
| Premium Page Header | ✅ Done | Title, Description, CTA |
| Searchable Table | ✅ Done | Filter input |
| Trip Image Thumbnails | ✅ Done | In table rows |
| Status Badges | ✅ Done | available/limited/sold-out |
| Hover Action Buttons | ✅ Done | Edit, Delete on hover |
| Empty State Design | ✅ Done | Illustration + CTA |
| Remove Placeholder Stats | ✅ Done | Not tracking yet |

---

### Phase A6: Articles Page Premium Design ✅ COMPLETED
> หน้าจัดการบทความแบบใหม่

| Task | Status | Notes |
|------|--------|-------|
| Refined Page Header | ✅ Done | Consistent with Trips |
| Searchable Table | ✅ Done | Filter by title |
| Author & Date Display | ✅ Done | Clean typography |
| Live Preview Link | ✅ Done | External link icon |
| Delete with Confirmation | ✅ Done | Loading state spinner |

---

### Phase A7: Transport & Rental Revamp 🔲 PLANNED
> อัปเกรดหน้าจัดการรถและอุปกรณ์

| Task | Status | Notes |
|------|--------|-------|
| Transport Page Redesign | 🔲 Todo | Match Trips style |
| Rental Page Redesign | 🔲 Todo | Match Trips style |
| Stock Alert Indicators | 🔲 Todo | Low stock warning |
| Category Filter | 🔲 Todo | Quick filter by type |
| Bulk Actions | 🔲 Todo | Multi-select delete |

---

### Phase A8: Corporate Dashboard 🔲 PLANNED
> หน้าจัดการ Inquiry จากองค์กร

| Task | Status | Notes |
|------|--------|-------|
| Premium Table Design | 🔲 Todo | Match new style |
| Inquiry Detail Modal | 🔲 Todo | Full info popup |
| Quick Notes Field | 🔲 Todo | Internal comments |
| Export to CSV | 🔲 Todo | For reporting |
| Email Notification | 🔲 Todo | Alert on new inquiry |

---

## ⚙️ แผนพัฒนาระบบ (Systems & Infrastructure)

### Phase S1: Core Infrastructure ✅ COMPLETED
> โครงสร้างพื้นฐานของระบบ

| Task | Status | Notes |
|------|--------|-------|
| Next.js 16 Setup | ✅ Done | App Router |
| TypeScript Configuration | ✅ Done | Strict mode |
| TailwindCSS 4 Setup | ✅ Done | Custom theme |
| Firebase Firestore Setup | ✅ Done | Collections defined |
| Vercel Deployment | ✅ Done | Auto-deploy on push |
| Git Workflow | ✅ Done | develop → main |

---

### Phase S2: Authentication & Security ✅ COMPLETED
> ระบบความปลอดภัย

| Task | Status | Notes |
|------|--------|-------|
| Admin Login Page | ✅ Done | Password protected |
| Session Management | ✅ Done | Jose JWT in cookies |
| Middleware Protection | ✅ Done | /adminnongtung/* routes |
| Logout Action | ✅ Done | Clear session |

---

### Phase S3: Server Actions ✅ COMPLETED
> API Actions สำหรับ CRUD

| Task | Status | Notes |
|------|--------|-------|
| Trip Actions | ✅ Done | create, update, delete |
| Rental Actions | ✅ Done | create, update, delete |
| Transport Actions | ✅ Done | create, update, delete |
| Article Actions | ✅ Done | create, update, delete |
| Settings Actions | ✅ Done | updateHomeSettings |
| Quote Actions | ✅ Done | save, updateStatus |

---

### Phase S4: Data Revalidation ✅ COMPLETED
> ระบบ Cache และ Revalidation

| Task | Status | Notes |
|------|--------|-------|
| Path Revalidation on CRUD | ✅ Done | revalidatePath() |
| Homepage Revalidation | ✅ Done | On settings change |
| Article Path Revalidation | ✅ Done | On slug change |

---

### Phase S5: Analytics & Tracking 🔄 IN PROGRESS
> ระบบติดตาม Traffic และ Conversion

| Task | Status | Notes |
|------|--------|-------|
| Google Analytics 4 | ✅ Done | Script in layout |
| Google Tag Manager | ✅ Done | Container installed |
| Facebook Pixel | ✅ Done | PageView events |
| TikTok Pixel | 🔲 Todo | Link in Bio tracking |
| Event Tracking Setup | 🔲 Todo | CTA clicks, Form submits |
| Conversion Goals | 🔲 Todo | Define in GA4 |

---

### Phase S6: Booking & Inventory 🔲 PLANNED
> ระบบจองและจัดการสต็อก

| Task | Status | Notes |
|------|--------|-------|
| Rental Stock Tracking | 🔲 Todo | Real-time availability |
| Trip Slot Management | 🔲 Todo | Capacity per date |
| Booking Request Form | 🔲 Todo | LINE notification |
| Payment Integration | 🔲 Todo | PromptPay QR / Bank Transfer |
| Booking Status Dashboard | 🔲 Todo | Admin view |

---

### Phase S7: Multi-language Support 🔲 FUTURE
> รองรับหลายภาษา

| Task | Status | Notes |
|------|--------|-------|
| i18n Framework Setup | 🔲 Todo | next-intl or similar |
| Thai Content | ✅ Done | Primary language |
| English Content | 🔲 Todo | For international tourists |
| Language Switcher | 🔲 Todo | In navbar |
| SEO per Language | 🔲 Todo | hreflang tags |

---

## 📝 Sprint Log & Changelog

### Sprint 2026-02-02 (Current)
- ✅ Admin Layout Overhaul (Header, Sidebar, Mobile Nav)
- ✅ Home Settings Interactive Editor
- ✅ Rich Text Article Editor (WYSIWYG)
- ✅ Premium Article Page Design
- ✅ Trips Page Stats Removal
- ✅ Contact Us → Facebook Link

### Sprint 2026-01-30
- ✅ UI Style Guide Documentation
- ✅ Simplified English Terminology
- ✅ Rental Stock Display Enhancement

### Sprint 2026-01-29
- ✅ Admin Trip Edit 404 Fix
- ✅ Slug Sanitization

### Sprint 2026-01-27
- ✅ Admin Menu Separation
- ✅ Backend Isolation

---

## 📌 Quick Reference

### Development Commands
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Deploy to Preview (develop branch)
git add . && git commit -m "message" && git push origin develop

# Deploy to Production (main branch)
git checkout main && git merge develop && git push origin main
```

### Key Files
| Purpose | Path |
|---------|------|
| Root Layout | `src/app/layout.tsx` |
| Admin Layout | `src/app/adminnongtung/layout.tsx` |
| Home Settings | `src/components/admin/HomeSettingsEditor.tsx` |
| Article Editor | `src/components/admin/ArticleForm.tsx` |
| Rich Text Editor | `src/components/admin/RichTextEditor.tsx` |
| Firestore Functions | `src/lib/firestore-db.ts` |
| Server Actions | `src/app/actions/*.ts` |
| Types Definition | `src/types/types.ts` |

---

## ✅ Legend

| Symbol | Meaning |
|--------|---------|
| ✅ Done | Task completed |
| 🔄 In Progress | Currently working on |
| 🔲 Todo | Planned, not started |
| ⚠️ Blocked | Has dependencies |

---

*Document maintained by Development Team. For questions, contact the project lead.*
