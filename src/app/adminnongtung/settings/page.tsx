import { getTrips, getHomeSettings } from '@/lib/firestore-db';
import HomeSettingsEditor from '@/components/admin/HomeSettingsEditor';

export const metadata = {
    title: 'Home Settings | Admin',
};

export default async function SettingsPage() {
    const [trips, settings] = await Promise.all([
        getTrips(),
        getHomeSettings()
    ]);

    // Default to the first trip if none are selected, OR empty array
    const initialSelectedIds = settings?.popularAdventureIds || [];

    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-10">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-forest rounded-2xl flex items-center justify-center text-primary border border-primary/20 shadow-glow">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-4xl font-black font-heading text-forest tracking-tighter uppercase italic">Home <span className="text-primary italic">Display</span></h1>
                        <p className="text-gray-400 font-medium text-sm mt-1">Configure sections and featured content for the public landing page.</p>
                    </div>
                </div>
            </div>

            <HomeSettingsEditor
                allTrips={trips}
                initialSelectedIds={initialSelectedIds}
            />
        </div>
    );
}
