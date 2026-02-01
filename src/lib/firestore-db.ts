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
    ARTICLES: 'articles'
} as const;

import { Trip, Rental, Transport, Article } from '../types/types';

// --- ARTICLES ---
export async function getArticles(): Promise<Article[]> {
    try {
        const q = query(collection(db, COLLECTIONS.ARTICLES));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Article));
    } catch (error) {
        console.error('Error fetching articles:', error);
        return [];
    }
}

export async function getArticle(slug: string): Promise<Article | null> {
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
export async function getTrips(): Promise<Trip[]> {
    try {
        const q = query(collection(db, COLLECTIONS.TRIPS));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Trip));
    } catch (error) {
        console.error('Error fetching trips:', error);
        return [];
    }
}

export async function getTrip(id: string): Promise<Trip | null> {
    try {
        const docRef = doc(db, COLLECTIONS.TRIPS, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as Trip;
        }
        return null;
    } catch (error) {
        console.error('Error fetching trip:', error);
        return null;
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
export async function getRentals(): Promise<Rental[]> {
    try {
        const q = query(collection(db, COLLECTIONS.RENTALS));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Rental));
    } catch (error) {
        console.error('Error fetching rentals:', error);
        return [];
    }
}

export async function getRental(id: string): Promise<Rental | null> {
    try {
        const docRef = doc(db, COLLECTIONS.RENTALS, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as Rental;
        }
        return null;
    } catch (error) {
        console.error('Error fetching rental:', error);
        return null;
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
export async function getTransport(): Promise<Transport[]> {
    try {
        const q = query(collection(db, COLLECTIONS.TRANSPORT));
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Transport));
    } catch (error) {
        console.error('Error fetching transport:', error);
        return [];
    }
}

export async function getTransportItem(id: string): Promise<Transport | null> {
    try {
        const docRef = doc(db, COLLECTIONS.TRANSPORT, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as Transport;
        }
        return null;
    } catch (error) {
        console.error('Error fetching transport:', error);
        return null;
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
