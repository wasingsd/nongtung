import { getActivity } from '@/lib/firestore-db';
import { createActivity, updateActivity } from '@/app/actions/activityActions';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ActivityForm from '@/components/admin/ActivityForm';

export default async function EditActivityPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const isNew = slug === 'new';
    const activity = isNew ? null : await getActivity(slug);

    if (!isNew && !activity) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <h2 className="text-2xl font-black font-heading text-forest mb-4">Activity Not Found</h2>
                <Link href="/adminnongtung/activities" className="text-primary font-bold hover:underline">Return to Activities</Link>
            </div>
        );
    }

    const action = isNew ? createActivity : updateActivity.bind(null, slug);

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header Area */}
            <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-6">
                    <Link
                        href="/adminnongtung/activities"
                        className="w-12 h-12 bg-white rounded-2xl border border-gray-100 flex items-center justify-center text-gray-400 hover:text-forest transition-all hover:shadow-md group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    </Link>
                    <div>
                        <h1 className="text-4xl font-black font-heading text-forest tracking-tighter uppercase italic leading-none">
                            {isNew ? 'New' : 'Edit'} <span className="text-primary italic">Activity</span>
                        </h1>
                        <p className="text-gray-400 font-medium text-sm mt-2">
                            {isNew ? 'Create a new event or activity.' : `Currently editing: ${activity?.title}`}
                        </p>
                    </div>
                </div>
            </div>

            <ActivityForm
                activity={activity}
                isNew={isNew}
                action={action}
            />
        </div>
    );
}
