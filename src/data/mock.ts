export interface Trip {
    id: string;
    title: string;
    price: number;
    difficulty: 'Easy' | 'Moderate' | 'Hard';
    status: 'available' | 'limited' | 'sold-out';
    image: string;
    tags: string[];
    duration: '1D' | '2D1N' | '3D+';
    type: 'join' | 'private';
}

export const TRIPS: Trip[] = [
    { id: 't1', title: 'Doi Luang Chiang Dao 2D1N', price: 3500, difficulty: 'Hard', status: 'limited', image: 'https://images.unsplash.com/photo-1533240332313-0dbdd3199061?auto=format&fit=crop&q=80&w=800', tags: ['Join-in', 'Hiking'], duration: '2D1N', type: 'join' },
    { id: 't2', title: 'Private Camp: Doi Pui Secret Spot', price: 4500, difficulty: 'Easy', status: 'available', image: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&q=80&w=800', tags: ['Private', 'Glamping'], duration: '2D1N', type: 'private' },
    { id: 't3', title: 'Kiw Mae Pan Trail 1 Day', price: 1200, difficulty: 'Moderate', status: 'sold-out', image: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&q=80&w=800', tags: ['One Day', 'Nature'], duration: '1D', type: 'join' },
    { id: 't4', title: 'Doi Mon Jong 2D1N', price: 2900, difficulty: 'Moderate', status: 'available', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800', tags: ['Join-in', 'Hiking'], duration: '2D1N', type: 'join' },
    { id: 't5', title: 'Mae Hong Son Loop 3D2N', price: 8500, difficulty: 'Easy', status: 'available', image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=800', tags: ['Private', 'Road Trip'], duration: '3D+', type: 'private' }
];

export interface RentalGear {
    id: string;
    name: string;
    price: number;
    unit: string;
    stock: number;
    image: string;
    desc: string;
}

export const RENTAL_GEAR: RentalGear[] = [
    { id: 'r1', name: 'Coleman Tough Screen 2-Room', price: 800, unit: 'Day', stock: 5, image: 'https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?auto=format&fit=crop&q=80&w=600', desc: 'เต็นท์ครอบครัว กันฝนเยี่ยม' },
    { id: 'r2', name: 'Helinox Chair One', price: 150, unit: 'Day', stock: 20, image: 'https://images.unsplash.com/photo-1595246140625-573b715d1128?auto=format&fit=crop&q=80&w=600', desc: 'เก้าอี้เบา นั่งสบาย' },
    { id: 'r3', name: 'Sleeping Bag (0°C)', price: 100, unit: 'Day', stock: 30, image: 'https://images.unsplash.com/photo-1622359670089-35c8b6719532?auto=format&fit=crop&q=80&w=600', desc: 'ถุงนอนกันหนาว สะอาด' },
    { id: 'r4', name: 'Cooking Set (M)', price: 200, unit: 'Day', stock: 10, image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&q=80&w=600', desc: 'ชุดหม้อสนามสำหรับ 4 คน' }
];

export interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    status: 'ready' | 'preorder';
    image: string;
    badge: string;
}

export const PRODUCTS: Product[] = [
    { id: 'p1', name: 'Coleman Tough Screen 2-Room', price: 18900, category: 'Tent', status: 'ready', image: 'https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?auto=format&fit=crop&q=80&w=600', badge: 'Ready to Ship' },
    { id: 'p2', name: 'Helinox Chair One - Black', price: 3900, category: 'Furniture', status: 'preorder', image: 'https://images.unsplash.com/photo-1595246140625-573b715d1128?auto=format&fit=crop&q=80&w=600', badge: 'Pre-order 14 Days' },
    { id: 'p3', name: 'Snow Peak Titanium Mug', price: 1250, category: 'Kitchen', status: 'ready', image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&q=80&w=600', badge: 'Best Seller' },
    { id: 'p4', name: 'DOD KinoKoko Tent', price: 22000, category: 'Tent', status: 'preorder', image: 'https://images.unsplash.com/photo-1496947850313-7743325fa58c?auto=format&fit=crop&q=80&w=600', badge: 'New Arrival' },
    { id: 'p5', name: 'Barebones Railroad Lantern', price: 2800, category: 'Lighting', status: 'ready', image: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?auto=format&fit=crop&q=80&w=600', badge: 'In Stock' },
    { id: 'p6', name: 'Nordisk Asgard 12.6', price: 35000, category: 'Tent', status: 'preorder', image: 'https://images.unsplash.com/photo-1628047915354-944519967201?auto=format&fit=crop&q=80&w=600', badge: 'Pre-order Only' }
];
