# Content-Media Veracity & Geographic Semantic Alignment Standards

## 1. Strict Geographic & Semantic Alignment for Media
- **Never use unrelated or arbitrary placeholder images**: Never use generic video reel stills (`/videos/reel-*.jpg`) or random scenery as placeholders for specific destinations, services, or gear.
- **Specific Landmarks & Peaks**: When an article, trip, or table mentions a specific location (e.g., ดอยหลวงเชียงดาว, กิ่วแม่ปาน, วัดผาลาด Monk's Trail, ดอยม่อนจอง, ผาดอกเสี้ยว, ดอยผ้าห่มปก, สันป่าเกี๊ยะ), all associated cover images, sub-images, and table thumbnails MUST represent that exact mountain, trail, or landmark.
- **Specific Service & Equipment Matching**:
  - Articles about VIP Van Rental (รถตู้ VIP / Toyota Commuter) MUST display actual VIP vans and van interiors, never empty forest photos.
  - Articles about Camping Gear Rental (เช่าอุปกรณ์แคมป์ปิ้ง / K2 / Coleman) MUST display clean, authentic camping tents, chairs, cookware, and camping equipment.
  - Articles about Corporate Outing / Teambuilding MUST display actual group outdoor activities (e.g., rafting on Mae Taeng river, team challenges).

## 2. Asset Integrity & Offline Stability
- Store curated and authentic photos locally under `public/images/articles/` or `public/images/fb/` with semantic, descriptive filenames (e.g., `monks-trail-wat-pha-lat.jpg`, `kew-mae-pan-boardwalk.jpg`, `vip-commuter-van.jpg`).
- Do not rely on ephemeral social media CDN links that expire after token expiry.

## 3. Double Verification on Ingest
- Whenever articles, blog posts, or trips are updated in `data.ts`, immediately synchronize and verify the active database (Firestore) to guarantee that both static defaults and runtime data remain 100% consistent.
