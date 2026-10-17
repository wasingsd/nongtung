import fs from 'fs';
import path from 'path';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

async function main() {
    const keyPath = path.resolve(process.cwd(), 'serviceAccountKey.json');
    if (!fs.existsSync(keyPath)) {
        console.error('serviceAccountKey.json not found!');
        process.exit(1);
    }

    const key = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
    const app = initializeApp({ credential: cert(key), projectId: key.project_id }, 'syncApp');
    const db = getFirestore(app);

    console.log('Fetching live Firestore data...');
    const [tripsSnap, rentalsSnap, transportSnap, fbSnap] = await Promise.all([
        db.collection('trips').get(),
        db.collection('rentals').get(),
        db.collection('transport').get(),
        db.collection('fb_posts').get(),
    ]);

    const trips = tripsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const rentals = rentalsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const transport = transportSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const fbPosts = fbSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    console.log(`Fetched ${trips.length} trips, ${rentals.length} rentals, ${transport.length} transports, ${fbPosts.length} fb_posts.`);

    // 1. Update src/data/mock.ts
    const mockContent = `export interface Trip {
    id: string;
    title: string;
    subtitle?: string;
    price: number;
    difficulty: 'Easy' | 'Moderate' | 'Hard';
    status: 'available' | 'limited' | 'sold-out';
    image: string;
    tags: string[];
    duration: '1D' | '2D1N' | '3D+' | string;
    type: 'join' | 'private';
    gallery?: string[];
    description?: string;
    location?: string;
    highlights?: string[];
    itinerary?: { day: string; title?: string; desc: string }[];
    whatsIncluded?: string[];
    notIncluded?: string[];
}

export const TRIPS: Trip[] = ${JSON.stringify(trips, null, 4)};

export interface RentalGear {
    id: string;
    name: string;
    type?: string;
    price: number;
    unit: string;
    stock: number;
    image: string;
    description?: string;
    desc?: string;
    features?: string[];
}

export const RENTAL_GEAR: RentalGear[] = ${JSON.stringify(rentals, null, 4)};

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
`;

    fs.writeFileSync(path.resolve(process.cwd(), 'src/data/mock.ts'), mockContent, 'utf8');
    console.log('Updated src/data/mock.ts successfully.');

    // 2. Update default transport in src/lib/firestore-db.ts
    const firestoreDbPath = path.resolve(process.cwd(), 'src/lib/firestore-db.ts');
    let firestoreDbContent = fs.readFileSync(firestoreDbPath, 'utf8');
    const transportJson = JSON.stringify(transport, null, 4);
    const transportRegex = /const MOCK_TRANSPORT: Transport\[\] = \[[\s\S]*?\];/;
    if (transportRegex.test(firestoreDbContent)) {
        firestoreDbContent = firestoreDbContent.replace(transportRegex, `const MOCK_TRANSPORT: Transport[] = ${transportJson};`);
        fs.writeFileSync(firestoreDbPath, firestoreDbContent, 'utf8');
        console.log('Updated MOCK_TRANSPORT in src/lib/firestore-db.ts successfully.');
    }

    // 3. Update src/data/defaultFacebookPosts.ts if posts exist
    if (fbPosts.length > 0) {
        const fbPostsContent = `import { FacebookPost } from '@/types/types';

export const DEFAULT_FB_POSTS: FacebookPost[] = ${JSON.stringify(fbPosts, null, 4)};
`;
        fs.writeFileSync(path.resolve(process.cwd(), 'src/data/defaultFacebookPosts.ts'), fbPostsContent, 'utf8');
        console.log('Updated src/data/defaultFacebookPosts.ts successfully.');
    }

    console.log('All local Firestore data synchronized to static codebase!');
}

main().catch(err => {
    console.error('Sync failed:', err);
    process.exit(1);
});
