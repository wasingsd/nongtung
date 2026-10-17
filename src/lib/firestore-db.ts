// Firestore Database using Firebase Admin SDK with Service Account for nongtung-platform
import { cache } from 'react';
import { adminDb } from './firebase-admin';
import { Trip, Rental, Transport, Article, Activity, HomeSettings, Reel, FacebookPost } from '../types/types';
import { articles as staticArticles } from '../app/(site)/[lang]/articles/data';
import { TRIPS as MOCK_TRIPS, RENTAL_GEAR as MOCK_RENTALS } from '@/data/mock';
import { DEFAULT_REELS } from '@/data/defaultReels';
import { DEFAULT_FB_POSTS } from '@/data/defaultFacebookPosts';

// Collection names
const COLLECTIONS = {
    TRIPS: 'trips',
    RENTALS: 'rentals',
    TRANSPORT: 'transport',
    QUOTES: 'quotes',
    ARTICLES: 'articles',
    ACTIVITIES: 'activities',
    SETTINGS: 'settings',
    REELS: 'reels',
    FB_POSTS: 'fb_posts'
} as const;

// --- ARTICLES ---
export const getArticles = cache(async (): Promise<Article[]> => {
    try {
        const snapshot = await adminDb.collection(COLLECTIONS.ARTICLES).get();
        if (!snapshot.empty) {
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Article));
        }
    } catch (e) {
        console.warn('⚠️ Firestore getArticles failed, falling back to static:', (e as Error).message);
    }
    return staticArticles.map(a => ({ ...a, id: a.slug } as Article));
});

export const getArticle = cache(async (slug: string): Promise<Article | null> => {
    const staticArticle = staticArticles.find(a => a.slug === slug);
    try {
        const docSnap = await adminDb.collection(COLLECTIONS.ARTICLES).doc(slug).get();
        if (docSnap.exists) {
            const data = docSnap.data() || {};
            return {
                id: docSnap.id,
                ...data,
                subImages: (Array.isArray(data.subImages) && data.subImages.length > 0)
                    ? data.subImages
                    : (staticArticle?.subImages || [])
            } as Article;
        }
    } catch (error) {
        console.error('Error fetching article from Firestore:', error);
    }

    if (staticArticle) {
        return { ...staticArticle, id: staticArticle.slug } as Article;
    }

    return null;
});

export async function saveArticle(article: Article): Promise<void> {
    try {
        await adminDb.collection(COLLECTIONS.ARTICLES).doc(article.slug).set({
            slug: article.slug,
            title: article.title,
            excerpt: article.excerpt,
            content: article.content,
            coverImage: article.coverImage,
            subImages: article.subImages || [],
            author: article.author,
            date: article.date,
            readingTime: article.readingTime,
            tags: article.tags || [],
            keywords: article.keywords || [],
            relatedTripId: article.relatedTripId || '',
            relatedRentalId: article.relatedRentalId || '',
        }, { merge: true });
    } catch (error) {
        console.error('Error saving article:', error);
        throw error;
    }
}

export async function deleteArticle(slug: string): Promise<void> {
    try {
        await adminDb.collection(COLLECTIONS.ARTICLES).doc(slug).delete();
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
    expectedDate: string | null;
    requirements?: string;
    status: 'pending' | 'done';
    createdAt: string;
}

// Helper to map mock trip to full Trip type
const mapMockTrip = (t: any): Trip => ({
    ...t,
    gallery: (Array.isArray(t.gallery) && t.gallery.length > 0) ? t.gallery : [t.image],
    description: t.description || t.subtitle || 'Experience the beauty of Northern Thailand with this amazing adventure.',
    location: t.location || 'Chiang Mai',
    highlights: (Array.isArray(t.highlights) && t.highlights.length > 0) ? t.highlights : ['Scenic Views', 'Professional Guide', 'Safety Equipment'],
    itinerary: (Array.isArray(t.itinerary) && t.itinerary.length > 0) ? t.itinerary : [
        { day: 'Day 1', title: 'Start Adventure', desc: 'Meeting at Chiang Mai city and travel to the destination.' },
        { day: 'Day 2', title: 'Explore & Return', desc: 'Morning hike and return to the city.' }
    ],
    whatsIncluded: (Array.isArray(t.whatsIncluded) && t.whatsIncluded.length > 0) ? t.whatsIncluded : ['Guide', 'Meals', 'Transportation'],
    notIncluded: (Array.isArray(t.notIncluded) && t.notIncluded.length > 0) ? t.notIncluded : ['Personal expenses', 'Alcohol'],
});

// --- TRIPS ---
export const getTrips = cache(async (): Promise<Trip[]> => {
    try {
        const snapshot = await adminDb.collection(COLLECTIONS.TRIPS).get();
        if (snapshot.empty) {
            return MOCK_TRIPS.map(mapMockTrip);
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Trip));
    } catch (error: any) {
        console.warn('⚠️ Firestore getTrips failed, using mock data:', error.message);
        return MOCK_TRIPS.map(mapMockTrip);
    }
});

export const getTrip = cache(async (id: string): Promise<Trip | null> => {
    try {
        const docSnap = await adminDb.collection(COLLECTIONS.TRIPS).doc(id).get();
        if (docSnap.exists) {
            return { id: docSnap.id, ...docSnap.data() } as Trip;
        }

        const mock = MOCK_TRIPS.find(t => t.id === id);
        if (mock) return mapMockTrip(mock);

        return null;
    } catch (error: any) {
        console.warn('⚠️ Firestore getTrip failed, checking mocks:', error.message);
        const mock = MOCK_TRIPS.find(t => t.id === id);
        return mock ? mapMockTrip(mock) : null;
    }
});

export async function saveTrip(trip: Trip): Promise<void> {
    try {
        await adminDb.collection(COLLECTIONS.TRIPS).doc(trip.id).set({
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
            meetingPoint: trip.meetingPoint || '',
            bestSeason: trip.bestSeason || '',
            distanceKm: trip.distanceKm || '',
            elevationGain: trip.elevationGain || '',
            fitnessLevel: trip.fitnessLevel || '',
            packingList: trip.packingList || [],
            faqs: trip.faqs || [],
        }, { merge: true });
    } catch (error) {
        console.error('Error saving trip:', error);
        throw error;
    }
}

export async function deleteTrip(id: string): Promise<void> {
    try {
        await adminDb.collection(COLLECTIONS.TRIPS).doc(id).delete();
    } catch (error) {
        console.error('Error deleting trip:', error);
        throw error;
    }
}

// --- RENTALS ---
const mapMockRental = (r: any): Rental => ({
    id: r.id,
    name: r.name,
    type: r.type || 'Other',
    price: r.price,
    unit: r.unit,
    stock: r.stock,
    image: r.image,
    description: r.description || r.desc || '',
    features: (Array.isArray(r.features) && r.features.length > 0) ? r.features : ['High Quality', 'Clean', 'Ready to use']
});

export const getRentals = cache(async (): Promise<Rental[]> => {
    try {
        const snapshot = await adminDb.collection(COLLECTIONS.RENTALS).get();
        if (snapshot.empty) {
            return MOCK_RENTALS.map(mapMockRental);
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Rental));
    } catch (error: any) {
        console.warn('⚠️ Firestore getRentals failed, using mocks:', error.message);
        return MOCK_RENTALS.map(mapMockRental);
    }
});

export const getRental = cache(async (id: string): Promise<Rental | null> => {
    try {
        const docSnap = await adminDb.collection(COLLECTIONS.RENTALS).doc(id).get();
        if (docSnap.exists) {
            return { id: docSnap.id, ...docSnap.data() } as Rental;
        }

        const mock = MOCK_RENTALS.find(r => r.id === id);
        return mock ? mapMockRental(mock) : null;
    } catch (error: any) {
        console.warn('⚠️ Firestore getRental failed, checking mocks:', error.message);
        const mock = MOCK_RENTALS.find(r => r.id === id);
        return mock ? mapMockRental(mock) : null;
    }
});

export async function saveRental(rental: Rental): Promise<void> {
    try {
        await adminDb.collection(COLLECTIONS.RENTALS).doc(rental.id).set({
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
        await adminDb.collection(COLLECTIONS.RENTALS).doc(id).delete();
    } catch (error) {
        console.error('Error deleting rental:', error);
        throw error;
    }
}

// --- TRANSPORT ---
const MOCK_TRANSPORT: Transport[] = [
    {
        "id": "3ba6040d-5fd3-47be-8b49-cf0b9e9adbc2",
        "type": "private van",
        "price1Day": 3000,
        "price2Day": 5800,
        "image": "https://res.cloudinary.com/dljdzrcp7/image/upload/v1770452258/Van_j0pab4.png",
        "note": "รถตู้ VIP 9-10 ที่นั่ง เบาะปรับเอนสบาย แอร์เย็น พร้อมคนขับชำนาญทางเขาภาคเหนือ บริการวันละ 10 ชม. (ไม่รวมค่าน้ำมันตามจริง)",
        "capacity": "9-10 ที่นั่ง VIP"
    },
    {
        "id": "86d1bf70-c423-43f8-946b-50d29c3ee62a",
        "type": "Pickup truck",
        "price1Day": 2400,
        "price2Day": 4800,
        "image": "https://res.cloudinary.com/dljdzrcp7/image/upload/v1770452047/Truck_uqnkwr.png",
        "note": "รถกระบะ 4 ประตู ยกสูง 4WD นั่งสบาย 4 ท่าน พร้อมกระบะท้ายบรรทุกสัมภาระ/เต็นท์แคมป์ปิ้ง ลุยทางเขาชัน บริการวันละ 10 ชม. (ไม่รวมค่าน้ำมันตามจริง)",
        "capacity": "4-5 ที่นั่ง (กระบะ 4WD)"
    },
    {
        "id": "9b1f2075-c7e1-4ce2-b84e-dc54ed9f9697",
        "type": "Chiang mai songthaew",
        "price1Day": 2000,
        "price2Day": 4000,
        "image": "https://res.cloudinary.com/dljdzrcp7/image/upload/v1770452047/%E0%B8%A3%E0%B8%96%E0%B9%81%E0%B8%94%E0%B8%87_modfqj.png",
        "note": "รถสองแถวแดงเชียงใหม่ เบาะ 2 แถว นั่งรับลมชมวิวธรรมชาติ เหมาะสำหรับ 8-10 ท่าน บริการวันละ 10 ชม. (ไม่รวมค่าน้ำมันตามจริง)",
        "capacity": "8-10 ที่นั่ง (สองแถว)"
    }
];

export const getTransport = cache(async (): Promise<Transport[]> => {
    try {
        const snapshot = await adminDb.collection(COLLECTIONS.TRANSPORT).get();
        if (snapshot.empty) {
            return MOCK_TRANSPORT;
        }
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Transport));
    } catch (error: any) {
        console.warn('⚠️ Firestore getTransport failed, using mocks:', error.message);
        return MOCK_TRANSPORT;
    }
});

export const getTransportItem = cache(async (id: string): Promise<Transport | null> => {
    try {
        const docSnap = await adminDb.collection(COLLECTIONS.TRANSPORT).doc(id).get();
        if (docSnap.exists) {
            return { id: docSnap.id, ...docSnap.data() } as Transport;
        }
        const mock = MOCK_TRANSPORT.find(t => t.id === id);
        return mock || null;
    } catch (error: any) {
        console.warn('⚠️ Firestore getTransportItem failed, checking mocks:', error.message);
        const mock = MOCK_TRANSPORT.find(t => t.id === id);
        return mock || null;
    }
});

export async function saveTransport(transport: Transport): Promise<void> {
    try {
        await adminDb.collection(COLLECTIONS.TRANSPORT).doc(transport.id).set({
            type: transport.type,
            price1Day: transport.price1Day,
            price2Day: transport.price2Day,
            image: transport.image,
            capacity: transport.capacity || '',
            note: transport.note || '',
        });
    } catch (error) {
        console.error('Error saving transport:', error);
        throw error;
    }
}

export async function deleteTransport(id: string): Promise<void> {
    try {
        await adminDb.collection(COLLECTIONS.TRANSPORT).doc(id).delete();
    } catch (error) {
        console.error('Error deleting transport:', error);
        throw error;
    }
}

// --- QUOTES (Corporate Inquiries) ---
export const getQuotes = cache(async (): Promise<Quote[]> => {
    try {
        const snapshot = await adminDb.collection(COLLECTIONS.QUOTES).orderBy('createdAt', 'desc').get();
        return snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                createdAt: data.createdAt?.toDate?.() ? data.createdAt.toDate().toISOString() : data.createdAt,
                expectedDate: data.expectedDate?.toDate?.() ? data.expectedDate.toDate().toISOString() : data.expectedDate
            } as Quote;
        });
    } catch (error) {
        console.error('Error fetching quotes:', error);
        return [];
    }
});

export async function saveQuote(quote: Omit<Quote, 'id' | 'createdAt' | 'status'>): Promise<string> {
    try {
        const docRef = adminDb.collection(COLLECTIONS.QUOTES).doc();
        const now = new Date().toISOString();
        await docRef.set({
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
        await adminDb.collection(COLLECTIONS.QUOTES).doc(id).set({ status }, { merge: true });
    } catch (error) {
        console.error('Error updating quote status:', error);
        throw error;
    }
}

// --- SETTINGS ---
export const getHomeSettings = cache(async (): Promise<HomeSettings | null> => {
    try {
        const docSnap = await adminDb.collection(COLLECTIONS.SETTINGS).doc('home').get();
        if (docSnap.exists) {
            return { id: docSnap.id, ...docSnap.data() } as HomeSettings;
        }
        return null;
    } catch (error: any) {
        console.warn('⚠️ Firestore getHomeSettings failed:', error.message);
        return null;
    }
});

export async function saveHomeSettings(settings: Partial<HomeSettings>): Promise<void> {
    try {
        await adminDb.collection(COLLECTIONS.SETTINGS).doc('home').set({
            ...settings,
            id: 'home'
        }, { merge: true });
    } catch (error) {
        console.error('Error saving home settings:', error);
        throw error;
    }
}

// --- ACTIVITIES ---
export const getActivities = cache(async (): Promise<Activity[]> => {
    try {
        const snapshot = await adminDb.collection(COLLECTIONS.ACTIVITIES).orderBy('startDate', 'desc').get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Activity));
    } catch (error: any) {
        console.warn('⚠️ Firestore getActivities failed:', error.message);
        return [];
    }
});

export const getActivity = cache(async (slug: string): Promise<Activity | null> => {
    try {
        const docSnap = await adminDb.collection(COLLECTIONS.ACTIVITIES).doc(slug).get();
        if (docSnap.exists) {
            return { id: docSnap.id, ...docSnap.data() } as Activity;
        }
        return null;
    } catch (error: any) {
        console.warn('⚠️ Firestore getActivity failed:', error.message);
        return null;
    }
});

export async function saveActivity(activity: Activity): Promise<void> {
    try {
        await adminDb.collection(COLLECTIONS.ACTIVITIES).doc(activity.slug).set({
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
        await adminDb.collection(COLLECTIONS.ACTIVITIES).doc(slug).delete();
    } catch (error) {
        console.error('Error deleting activity:', error);
        throw error;
    }
}

// --- REELS (Shoppable TikTok Clips) ---
export const getReels = cache(async (): Promise<Reel[]> => {
    try {
        const snapshot = await adminDb.collection(COLLECTIONS.REELS).get();
        if (!snapshot.empty) {
            const reels = snapshot.docs.map(doc => {
                const data = doc.data() as Reel;
                let videoUrl = data.videoUrl;
                if (!videoUrl || videoUrl.includes('mixkit.co')) {
                    videoUrl = `/videos/${doc.id}.mp4`;
                }
                return {
                    ...data,
                    id: doc.id,
                    videoUrl,
                };
            });
            return reels.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
        }
    } catch (error: any) {
        console.warn('⚠️ Firestore getReels failed, using default reels:', error.message);
    }
    return DEFAULT_REELS;
});

export const getReel = cache(async (id: string): Promise<Reel | null> => {
    try {
        const docSnap = await adminDb.collection(COLLECTIONS.REELS).doc(id).get();
        if (docSnap.exists) {
            return { id: docSnap.id, ...docSnap.data() } as Reel;
        }
        const defaultMatch = DEFAULT_REELS.find(r => r.id === id);
        return defaultMatch || null;
    } catch (error: any) {
        console.warn('⚠️ Firestore getReel failed:', error.message);
        const defaultMatch = DEFAULT_REELS.find(r => r.id === id);
        return defaultMatch || null;
    }
});

export async function saveReel(reel: Reel): Promise<void> {
    try {
        const reelId = reel.id || `reel-${Date.now()}`;
        await adminDb.collection(COLLECTIONS.REELS).doc(reelId).set({
            id: reelId,
            tiktokId: reel.tiktokId || '',
            title: reel.title || '',
            location: reel.location || '',
            views: reel.views || '0',
            likes: reel.likes || '0',
            poster: reel.poster || '',
            videoUrl: reel.videoUrl || '',
            images: reel.images || [],
            type: reel.type || 'video',
            tiktokUrl: reel.tiktokUrl || (reel.tiktokId ? `https://www.tiktok.com/@nongtungrunning/video/${reel.tiktokId}` : ''),
            audioTrack: reel.audioTrack || 'Original Sound - @nongtungrunning',
            linkedTrip: {
                id: reel.linkedTrip?.id || '',
                title: reel.linkedTrip?.title || '',
                duration: reel.linkedTrip?.duration || '',
                price: Number(reel.linkedTrip?.price) || 0,
                image: reel.linkedTrip?.image || '',
                location: reel.linkedTrip?.location || '',
                url: reel.linkedTrip?.url || `/th/trips`,
            },
            order: Number(reel.order) || 0,
            isActive: reel.isActive ?? true,
            updatedAt: new Date().toISOString(),
            createdAt: reel.createdAt || new Date().toISOString(),
        }, { merge: true });
    } catch (error) {
        console.error('Error saving reel:', error);
        throw error;
    }
}

export async function deleteReel(id: string): Promise<void> {
    try {
        await adminDb.collection(COLLECTIONS.REELS).doc(id).delete();
    } catch (error) {
        console.error('Error deleting reel:', error);
        throw error;
    }
}

export async function seedDefaultReels(): Promise<void> {
    try {
        const batch = adminDb.batch();
        for (const reel of DEFAULT_REELS) {
            const ref = adminDb.collection(COLLECTIONS.REELS).doc(reel.id);
            batch.set(ref, {
                ...reel,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            });
        }
        await batch.commit();
    } catch (error) {
        console.error('Error seeding default reels:', error);
        throw error;
    }
}

// --- FACEBOOK POSTS (NONGTUNG STANDARDS & GROUND UPDATES) ---
export const getFacebookPosts = cache(async (): Promise<FacebookPost[]> => {
    try {
        const snapshot = await adminDb.collection(COLLECTIONS.FB_POSTS).get();
        if (!snapshot.empty) {
            const posts = snapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() } as FacebookPost))
                .filter(post => post.isActive !== false);
            if (posts.length > 0) {
                return posts.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
            }
        }
    } catch (error: any) {
        console.warn('⚠️ Firestore getFacebookPosts failed, using default posts:', error.message);
    }
    return DEFAULT_FB_POSTS;
});

export async function saveFacebookPost(post: FacebookPost): Promise<void> {
    try {
        const postId = post.id || `fb-${Date.now()}`;
        await adminDb.collection(COLLECTIONS.FB_POSTS).doc(postId).set({
            ...post,
            id: postId,
            updatedAt: new Date().toISOString(),
            createdAt: post.created_time || new Date().toISOString(),
        }, { merge: true });
    } catch (error) {
        console.error('Error saving Facebook post:', error);
        throw error;
    }
}

