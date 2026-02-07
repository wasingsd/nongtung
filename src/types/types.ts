export interface Trip {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  status: 'available' | 'limited' | 'sold-out';
  image: string; // Helper for main image (thumbnail)
  gallery: string[]; // Additional images
  tags: string[];
  duration: '1D' | '2D1N' | '3D+';
  type: 'join' | 'private';
  description: string;
  location: string;
  highlights: string[];
  itinerary: { day: string; title: string; desc: string }[];
  whatsIncluded: string[];
  notIncluded: string[];
}

export interface Rental {
  id: string;
  name: string;
  type: 'Tent' | 'Chair' | 'Sleeping' | 'Kitchen' | 'Lighting' | 'Other';
  price: number;       // ราคาต่อหน่วย
  unit: string;        // หน่วย เช่น "Day", "Trip"
  stock: number;       // จำนวนสต็อก
  image: string;
  description: string; // คำอธิบายสั้น
  features: string[];  // คุณสมบัติพิเศษ
}

export interface Transport {
  id: string;
  type: string;      // ประเภทรถ (เช่น รถตู้ VIP, รถแดง)
  price1Day: number; // ราคาสำหรับ 1 วัน
  price2Day: number; // ราคาสำหรับ 2 วัน
  image: string;
  note?: string;     // หมายเหตุเพิ่มเติม
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string; // Changed from summary
  content: string;
  coverImage: string;
  author: string;
  date: string; // Changed from publishedAt for consistency
  readingTime: string;
  tags: string[];
  keywords: string[]; // For SEO
  relatedTripId?: string;
  relatedRentalId?: string;
  mapCoordinates?: {
    start: [number, number];
    end?: [number, number];
    zoom?: number;
  };
}

export interface HomeSettings {
  id: 'home';
  popularAdventureIds: string[]; // IDs of trips to show in POPULAR ADVENTURES section
}

export interface Activity {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;          // Rich text content
  excerpt: string;              // Short description for SEO meta description
  coverImage: string;
  gallery: string[];            // Additional images
  activityType: 'event' | 'workshop' | 'tour' | 'seasonal' | 'special';
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';

  // Event timing (optional - for activities that run all the time)
  startDate?: string;           // ISO date string (optional for always-open activities)
  endDate?: string;             // Optional end date for multi-day events
  time?: string;                // e.g. "09:00 - 17:00"

  // Location
  location: string;
  mapCoordinates?: {
    lat: number;
    lng: number;
  };

  // Pricing
  price?: number;
  priceNote?: string;           // e.g. "ต่อคน", "ต่อกลุ่ม"

  // SEO & Marketing
  keywords: string[];           // SEO keywords
  tags: string[];               // Display tags
  metaTitle?: string;           // Custom meta title (falls back to title)
  metaDescription?: string;     // Custom meta description (falls back to excerpt)

  // Relationships
  relatedTripIds: string[];     // Link to related trips

  // Capacity
  maxParticipants?: number;
  currentParticipants?: number;

  // Additional info
  highlights: string[];
  requirements?: string;        // What participants need to bring/know
  organizer: string;
  contactInfo?: string;

  // Timestamps
  createdAt: string;
  updatedAt: string;
}

