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
  summary: string;
  content: string; // Markdown or HTML
  coverImage: string;
  author: string;
  publishedAt: string;
}
