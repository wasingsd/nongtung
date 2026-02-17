import { getActivities } from '@/lib/firestore-db';
import { Metadata } from 'next';
import ActivitiesClient from './ActivitiesClient';

// Force dynamic rendering to fetch fresh data from Firestore on every request
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Activities & Events | Nongtung Adventure Chiang Mai',
    description: 'Discover unique activities, events, and seasonal experiences in Chiang Mai. Join us for trekking tours, camping adventures, workshops, and cultural experiences in Northern Thailand.',
    keywords: ['Chiang Mai activities', 'Thailand events', 'adventure tours', 'trekking Chiang Mai', 'camping Thailand', 'cultural experiences', 'Northern Thailand tours', 'Nongtung activities', 'Enduro Chiang Mai', 'off-road motorcycle'],
    openGraph: {
        title: 'Activities & Events | Nongtung Adventure',
        description: 'Unique activities and events in Chiang Mai, Northern Thailand',
        images: ['https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=1600'],
    }
};

export default async function ActivitiesPage() {
    const activities = await getActivities();

    return <ActivitiesClient activities={activities} />;
}
