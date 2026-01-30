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
import { Trip, Rental, Transport } from '../types/types';

// Collection names
const COLLECTIONS = {
    TRIPS: 'trips',
    RENTALS: 'rentals',
    TRANSPORT: 'transport'
} as const;

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
