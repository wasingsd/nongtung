import { Trip, Rental, Transport, Article } from '@/types/types';



export const rentals: Rental[] = [
    {
        id: '1',
        name: 'Tent Standard',
        type: 'Tent',
        price: 350,
        unit: 'Night',
        stock: 50,
        image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=1000',
        description: 'เต็นท์นอนมาตรฐาน 2-3 คน กันน้ำ กันลม',
        features: ['Waterproof', 'Easy Setup', 'Sleeps 3'],
    },
    {
        id: '2',
        name: 'Camping Chair',
        type: 'Chair',
        price: 50,
        unit: 'Day',
        stock: 100,
        image: 'https://images.unsplash.com/photo-1596435678311-6411516e87d5?q=80&w=1000',
        description: 'เก้าอี้สนามพับได้ พกพาสะดวก',
        features: ['Foldable', 'Lightweight'],
    }
];

export const transports: Transport[] = [
    {
        id: '1',
        type: 'VIP Van 9 Seats',
        price1Day: 2000,
        price2Day: 3800,
        image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800',
        note: 'บริการ 10 ชม./วัน (ไม่รวมน้ำมัน)'
    },
    {
        id: '2',
        type: 'Red Truck 4WD',
        price1Day: 1500,
        price2Day: 2800,
        image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800',
        note: 'เหมาะสำหรับขึ้นดอยสูง'
    }
];

export const articles: Article[] = [
    {
        id: '1',
        slug: 'top-10-street-foods',
        title: 'Top 10 Street Foods in Bangkok',
        summary: 'A guide to the best delicious street food you must try in Bangkok.',
        content: `
      <h2>1. Pad Thai</h2>
      <p>The classic Thai stir-fried noodle dish.</p>
      <h2>2. Som Tum</h2>
      <p>Spicy green papaya salad.</p>
      <p>Bangkok's street food scene is legendary...</p>
    `,
        coverImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000&auto=format&fit=crop',
        author: 'Foodie Jane',
        publishedAt: '2024-01-15'
    },
    {
        id: '2',
        slug: 'hidden-temples',
        title: 'Hidden Temples of the North',
        summary: 'Discover the serene and less crowded temples in Northern Thailand.',
        content: '<p>While the White Temple is famous, there are many others...</p>',
        coverImage: 'https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=1000&auto=format&fit=crop',
        author: 'Travel Tom',
        publishedAt: '2024-02-10'
    }
];
