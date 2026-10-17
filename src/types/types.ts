export interface ItineraryItem {
  day: string;
  title: string;
  desc: string;
  images?: string[];
}

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
  itinerary: ItineraryItem[];
  whatsIncluded: string[];
  notIncluded: string[];
  meetingPoint?: string;
  bestSeason?: string;
  distanceKm?: string;
  elevationGain?: string;
  fitnessLevel?: string;
  packingList?: string[];
  faqs?: { question: string; answer: string }[];
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
  capacity?: string; // จำนวนที่นั่ง/ความจุ เช่น '9-10 ที่นั่ง VIP', '4-5 ที่นั่ง (กระบะ 4WD)', '8-10 ที่นั่ง (สองแถว)'
  note?: string;     // หมายเหตุเพิ่มเติม
}

export interface ArticleSubImage {
  id?: string;
  url: string;
  caption?: string;
  position: 'mid' | 'bottom'; // 'mid' = กลางเนื้อหา, 'bottom' = ล่างเนื้อหา/ท้ายบทความ
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string; // Changed from summary
  content: string;
  coverImage: string;
  subImages?: ArticleSubImage[];
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
  facebookUrl?: string; // Sales closing link
}

export interface LinkedProduct {
  id: string;
  title: string;
  duration?: string;
  price: number;
  image: string;
  location: string;
  url?: string;
}

export interface Reel {
  id: string;
  tiktokId: string;
  title: string;
  location: string;
  views: string;
  likes: string;
  poster: string;
  videoUrl?: string;
  images?: string[];
  type: 'video' | 'photo';
  tiktokUrl: string;
  audioTrack?: string;
  linkedTrip: LinkedProduct;
  order: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
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

export interface FacebookPost {
  id: string;
  message: string;
  permalink_url: string;
  full_picture?: string;
  created_time: string;
  reactions_count?: number;
  comments_count?: number;
  shares_count?: number;
  badge?: string;
  authorName?: string;
  order?: number;
  isActive?: boolean;
  updatedAt?: string;
}

