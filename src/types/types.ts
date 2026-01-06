export interface Trip {
  id: string;
  title: string;
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
  type: 'Car' | 'Bike' | 'Van';
  pricePerDay: number;
  image: string;
  features: string[];
  capacity: number;
}

export interface Transport {
  id: string;
  type: string;
  route: string;
  price: number;
  departureTime: string;
  image: string;
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
