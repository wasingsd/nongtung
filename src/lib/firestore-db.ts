// Firestore Database - replaces JSON file-based db.ts for Vercel compatibility
import { db } from './firebase';
import {
    collection,
    doc,
    getDocs,
    getDoc,
    setDoc,
    deleteDoc,
    query,
    orderBy
} from 'firebase/firestore';
// Collection names
const COLLECTIONS = {
    TRIPS: 'trips',
    RENTALS: 'rentals',
    TRANSPORT: 'transport',
    QUOTES: 'quotes',
    ARTICLES: 'articles',
    ACTIVITIES: 'activities',
    SETTINGS: 'settings'
} as const;

import { Trip, Rental, Transport, Article, Activity, HomeSettings } from '../types/types';

import { articles as staticArticles } from '../app/articles/data';

// --- ARTICLES ---
export async function getArticles(): Promise<Article[]> {
    // Return static articles first (for SEO content), potentially merge with DB later
    return staticArticles.map(a => ({ ...a, id: a.slug } as Article));
}

export async function getArticle(slug: string): Promise<Article | null> {
    // Try static first
    const staticArticle = staticArticles.find(a => a.slug === slug);
    if (staticArticle) {
        return { ...staticArticle, id: staticArticle.slug } as Article;
    }

    try {
        // Since we query by slug, we can't use getDoc directly unless ID is slug
        // Let's assume ID might not be slug for flexibility, so we query
        const q = query(
            collection(db, COLLECTIONS.ARTICLES),
            // We need to fetch all and filter or set up an index. 
            // For small scale, fetch all is fine or query by field if indexed.
            // But usually getDoc by ID (slug) is best if we enforce ID=slug.
        );
        // Better approach: Use ID = slug when saving.
        const docRef = doc(db, COLLECTIONS.ARTICLES, slug);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as Article;
        }
        return null;
    } catch (error) {
        console.error('Error fetching article:', error);
        return null;
    }
}

export async function saveArticle(article: Article): Promise<void> {
    try {
        // Use slug as ID for friendly URLs and easy lookup
        const docRef = doc(db, COLLECTIONS.ARTICLES, article.slug);
        await setDoc(docRef, {
            slug: article.slug,
            title: article.title,
            excerpt: article.excerpt,
            content: article.content,
            coverImage: article.coverImage,
            author: article.author,
            date: article.date,
            readingTime: article.readingTime,
            tags: article.tags || [],
            keywords: article.keywords || [],
            relatedTripId: article.relatedTripId || '',
            relatedRentalId: article.relatedRentalId || '',
        });
    } catch (error) {
        console.error('Error saving article:', error);
        throw error;
    }
}

export async function deleteArticle(slug: string): Promise<void> {
    try {
        const docRef = doc(db, COLLECTIONS.ARTICLES, slug);
        await deleteDoc(docRef);
    } catch (error) {
        console.error('Error deleting article:', error);
        throw error;
    }
}

export interface Quote {
    id: string;
    companyName: string;
    contactPerson: string;
    phone: string;
    groupSize: string;
    expectedDate: string | null; // Saved as ISO string or timestamp
    requirements?: string;
    status: 'pending' | 'done';
    createdAt: string; // ISO string
}

// --- TRIPS ---
import { TRIPS as MOCK_TRIPS, RENTAL_GEAR as MOCK_RENTALS } from '@/data/mock';

// Helper to map mock trip to full Trip type
const mapMockTrip = (t: any): Trip => ({
    ...t,
    gallery: [t.image],
    description: t.subtitle || 'Experience the beauty of Northern Thailand with this amazing adventure.',
    location: 'Chiang Mai',
    highlights: ['Scenic Views', 'Professional Guide', 'Safety Equipment'],
    itinerary: [
        { day: 'Day 1', title: 'Start Adventure', desc: 'Meeting at Chiang Mai city and travel to the destination.' },
        { day: 'Day 2', title: 'Explore & Return', desc: 'Morning hike and return to the city.' }
    ],
    whatsIncluded: ['Guide', 'Meals', 'Transportation'],
    notIncluded: ['Personal expenses', 'Alcohol'],
});

export async function getTrips(): Promise<Trip[]> {
    try {
        const q = query(collection(db, COLLECTIONS.TRIPS));
        const snapshot = await getDocs(q);
        if (snapshot.empty) {
            // If DB is empty or (more likely) query failed silently, try generic catch or return empty
            // But if permission error, it throws.
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Trip));
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Trip));
    } catch (error: any) {
        // Fallback to mock data if permission error or other failure
        console.warn('⚠️ Firestore getTrips failed (likely permission), using mock data:', error.message);
        return MOCK_TRIPS.map(mapMockTrip);
    }
}

export async function getTrip(id: string): Promise<Trip | null> {
    try {
        const docRef = doc(db, COLLECTIONS.TRIPS, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as Trip;
        }

        // If not in DB, check mocks
        const mock = MOCK_TRIPS.find(t => t.id === id);
        if (mock) return mapMockTrip(mock);

        return null;
    } catch (error: any) {
        console.warn('⚠️ Firestore getTrip failed, checking mocks:', error.message);
        const mock = MOCK_TRIPS.find(t => t.id === id);
        return mock ? mapMockTrip(mock) : null;
    }
}

export async function saveTrip(trip: Trip): Promise<void> {
    try {
        const docRef = doc(db, COLLECTIONS.TRIPS, trip.id);
        await setDoc(docRef, {
            title: trip.title,
            subtitle: trip.subtitle || '',
            price: trip.price,
            difficulty: trip.difficulty,
            status: trip.status,
            image: trip.image,
            gallery: trip.gallery || [],
            tags: trip.tags || [],
            duration: trip.duration,
            type: trip.type,
            description: trip.description,
            location: trip.location,
            highlights: trip.highlights || [],
            itinerary: trip.itinerary || [],
            whatsIncluded: trip.whatsIncluded || [],
            notIncluded: trip.notIncluded || [],
        });
    } catch (error) {
        console.error('Error saving trip:', error);
        throw error;
    }
}

export async function deleteTrip(id: string): Promise<void> {
    try {
        const docRef = doc(db, COLLECTIONS.TRIPS, id);
        await deleteDoc(docRef);
    } catch (error) {
        console.error('Error deleting trip:', error);
        throw error;
    }
}

// --- RENTALS ---
// Helper to map mock rental
const mapMockRental = (r: any): Rental => ({
    id: r.id,
    name: r.name,
    type: 'Other', // Default
    price: r.price,
    unit: r.unit,
    stock: r.stock,
    image: r.image,
    description: r.desc,
    features: ['High Quality', 'Clean', 'Ready to use']
});

export async function getRentals(): Promise<Rental[]> {
    try {
        const q = query(collection(db, COLLECTIONS.RENTALS));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Rental));
    } catch (error: any) {
        console.warn('⚠️ Firestore getRentals failed, using mocks:', error.message);
        return MOCK_RENTALS.map(mapMockRental);
    }
}

export async function getRental(id: string): Promise<Rental | null> {
    try {
        const docRef = doc(db, COLLECTIONS.RENTALS, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as Rental;
        }

        const mock = MOCK_RENTALS.find(r => r.id === id);
        if (mock) return mapMockRental(mock);

        return null;
    } catch (error: any) {
        console.warn('⚠️ Firestore getRental failed, checking mocks:', error.message);
        const mock = MOCK_RENTALS.find(r => r.id === id);
        return mock ? mapMockRental(mock) : null;
    }
}

export async function saveRental(rental: Rental): Promise<void> {
    try {
        const docRef = doc(db, COLLECTIONS.RENTALS, rental.id);
        await setDoc(docRef, {
            name: rental.name,
            type: rental.type,
            price: rental.price,
            unit: rental.unit,
            stock: rental.stock,
            image: rental.image,
            description: rental.description || '',
            features: rental.features || [],
        });
    } catch (error) {
        console.error('Error saving rental:', error);
        throw error;
    }
}

export async function deleteRental(id: string): Promise<void> {
    try {
        const docRef = doc(db, COLLECTIONS.RENTALS, id);
        await deleteDoc(docRef);
    } catch (error) {
        console.error('Error deleting rental:', error);
        throw error;
    }
}

// --- TRANSPORT ---
const MOCK_TRANSPORT: Transport[] = [
    { id: 'van-vip', type: 'VIP Van 9 Seats', price1Day: 2500, price2Day: 5000, image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800', note: 'Luxury Van with Driver' },
    { id: 'suv-4wd', type: 'SUV 4WD', price1Day: 3500, price2Day: 7000, image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800', note: 'Adventure ready' },
    { id: 'red-truck', type: 'Red Truck (Rod Daeng)', price1Day: 1500, price2Day: 3000, image: 'https://images.unsplash.com/photo-1563720769398-386b461f3659?w=800', note: 'Local experience' }
];

export async function getTransport(): Promise<Transport[]> {
    try {
        const q = query(collection(db, COLLECTIONS.TRANSPORT));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Transport));
    } catch (error: any) {
        console.warn('⚠️ Firestore getTransport failed, using mocks:', error.message);
        return MOCK_TRANSPORT;
    }
}

export async function getTransportItem(id: string): Promise<Transport | null> {
    try {
        const docRef = doc(db, COLLECTIONS.TRANSPORT, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as Transport;
        }
        const mock = MOCK_TRANSPORT.find(t => t.id === id);
        return mock || null;
    } catch (error: any) {
        console.warn('⚠️ Firestore getTransportItem failed, checking mocks:', error.message);
        const mock = MOCK_TRANSPORT.find(t => t.id === id);
        return mock || null;
    }
}

export async function saveTransport(transport: Transport): Promise<void> {
    try {
        const docRef = doc(db, COLLECTIONS.TRANSPORT, transport.id);
        await setDoc(docRef, {
            type: transport.type,
            price1Day: transport.price1Day,
            price2Day: transport.price2Day,
            image: transport.image,
            note: transport.note || '',
        });
    } catch (error) {
        console.error('Error saving transport:', error);
        throw error;
    }
}

export async function deleteTransport(id: string): Promise<void> {
    try {
        const docRef = doc(db, COLLECTIONS.TRANSPORT, id);
        await deleteDoc(docRef);
    } catch (error) {
        console.error('Error deleting transport:', error);
        throw error;
    }
}

// --- QUOTES (Corporate Inquiries) ---
export async function getQuotes(): Promise<Quote[]> {
    try {
        const q = query(collection(db, COLLECTIONS.QUOTES), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                // Ensure date fields are handled safely if they come back as Timestamps
                createdAt: data.createdAt?.toDate?.() ? data.createdAt.toDate().toISOString() : data.createdAt,
                expectedDate: data.expectedDate?.toDate?.() ? data.expectedDate.toDate().toISOString() : data.expectedDate
            } as Quote;
        });
    } catch (error) {
        console.error('Error fetching quotes:', error);
        return [];
    }
}

export async function saveQuote(quote: Omit<Quote, 'id' | 'createdAt' | 'status'>): Promise<string> {
    try {
        const docRef = doc(collection(db, COLLECTIONS.QUOTES));
        const now = new Date().toISOString();
        await setDoc(docRef, {
            ...quote,
            status: 'pending',
            createdAt: now,
        });
        return docRef.id;
    } catch (error) {
        console.error('Error saving quote:', error);
        throw error;
    }
}

export async function updateQuoteStatus(id: string, status: 'pending' | 'done'): Promise<void> {
    try {
        const docRef = doc(db, COLLECTIONS.QUOTES, id);
        await setDoc(docRef, { status }, { merge: true });
    } catch (error) {
        console.error('Error updating quote status:', error);
        throw error;
    }
}

// --- SETTINGS ---
export async function getHomeSettings(): Promise<HomeSettings | null> {
    try {
        const docRef = doc(db, COLLECTIONS.SETTINGS, 'home');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as HomeSettings;
        }
        return null;
    } catch (error: any) {
        console.warn('⚠️ Firestore getHomeSettings failed, using default (null):', error.message);
        return null;
    }
}

export async function saveHomeSettings(settings: Partial<HomeSettings>): Promise<void> {
    try {
        const docRef = doc(db, COLLECTIONS.SETTINGS, 'home');
        await setDoc(docRef, {
            ...settings,
            id: 'home'
        }, { merge: true });
    } catch (error) {
        console.error('Error saving home settings:', error);
        throw error;
    }
}

// --- ACTIVITIES ---
export async function getActivities(): Promise<Activity[]> {
    try {
        const q = query(collection(db, COLLECTIONS.ACTIVITIES), orderBy('startDate', 'desc'));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Activity));
    } catch (error: any) {
        console.warn('⚠️ Firestore getActivities failed:', error.message);
        return [];
    }
}

export async function getActivity(slug: string): Promise<Activity | null> {
    try {
        const docRef = doc(db, COLLECTIONS.ACTIVITIES, slug);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as Activity;
        }
        return null;
    } catch (error: any) {
        console.warn('⚠️ Firestore getActivity failed:', error.message);
        return null;
    }
}

export async function saveActivity(activity: Activity): Promise<void> {
    try {
        const docRef = doc(db, COLLECTIONS.ACTIVITIES, activity.slug);
        await setDoc(docRef, {
            slug: activity.slug,
            title: activity.title,
            subtitle: activity.subtitle || '',
            description: activity.description || '',
            excerpt: activity.excerpt || '',
            coverImage: activity.coverImage || '',
            gallery: activity.gallery || [],
            activityType: activity.activityType || 'event',
            status: activity.status || 'upcoming',
            startDate: activity.startDate,
            endDate: activity.endDate || '',
            time: activity.time || '',
            location: activity.location || '',
            mapCoordinates: activity.mapCoordinates || null,
            price: activity.price || 0,
            priceNote: activity.priceNote || '',
            keywords: activity.keywords || [],
            tags: activity.tags || [],
            metaTitle: activity.metaTitle || '',
            metaDescription: activity.metaDescription || '',
            relatedTripIds: activity.relatedTripIds || [],
            maxParticipants: activity.maxParticipants || 0,
            currentParticipants: activity.currentParticipants || 0,
            highlights: activity.highlights || [],
            requirements: activity.requirements || '',
            organizer: activity.organizer || 'Nongtung Team',
            contactInfo: activity.contactInfo || '',
            createdAt: activity.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        });
    } catch (error) {
        console.error('Error saving activity:', error);
        throw error;
    }
}

export async function deleteActivity(slug: string): Promise<void> {
    try {
        const docRef = doc(db, COLLECTIONS.ACTIVITIES, slug);
        await deleteDoc(docRef);
    } catch (error) {
        console.error('Error deleting activity:', error);
        throw error;
    }
}
