import Link from 'next/link';
import { getActivities } from '@/lib/firestore-db';
import { Plus, Edit, ExternalLink, Calendar, MapPin, Search, Users } from 'lucide-react';
import { DeleteActivityButton } from '@/components/DeleteActivityButton';

const STATUS_COLORS: Record<string, string> = {
    upcoming: 'bg-blue-100 text-blue-700',
    ongoing: 'bg-green-100 text-green-700',
    completed: 'bg-gray-100 text-gray-600',
    cancelled: 'bg-red-100 text-red-700',
};

const TYPE_LABELS: Record<string, string> = {
    event: '🎉 Event',
    workshop: '🛠️ Workshop',
    tour: '🚐 Tour',
    seasonal: '🌸 Seasonal',
    special: '⭐ Special',
};

export default async function AdminActivitiesPage() {
    const activities = await getActivities();

    return (
        <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-4xl font-black font-heading text-forest tracking-tighter uppercase italic">Activity <span className="text-primary">Events</span></h1>
                    <p className="text-gray-400 font-medium text-sm mt-3">Manage activities, events, and seasonal campaigns.</p>
                </div>

                <Link
                    href="/adminnongtung/activities/edit/new"
                    className="bg-primary hover:bg-forest text-white px-8 py-4 rounded-2xl flex items-center gap-3 transition-all shadow-xl hover:shadow-primary/20 transform hover:-translate-y-1 active:translate-y-0"
                >
                    <Plus className="w-5 h-5" />
                    <span className="font-black uppercase text-xs tracking-widest">New Activity</span>
                </Link>
            </div>

            {/* List View */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative flex-grow max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="text" placeholder="Search activities..." className="w-full bg-gray-50 border border-gray-100 pl-12 pr-4 py-3 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all" />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                                <th className="px-8 py-6">Activity Info</th>
                                <th className="px-8 py-6">Type</th>
                                <th className="px-8 py-6">Date & Location</th>
                                <th className="px-8 py-6">Status</th>
                                <th className="px-8 py-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {activities.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-8 py-20 text-center">
                                        <div className="max-w-xs mx-auto">
                                            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                                <Calendar className="w-8 h-8 text-gray-300" />
                                            </div>
                                            <div className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-4">
                                                No activities found
                                            </div>
                                            <Link
                                                href="/adminnongtung/activities/edit/new"
                                                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-forest transition-all"
                                            >
                                                <Plus className="w-4 h-4" /> Create First Activity
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                activities.map((activity) => (
                                    <tr key={activity.slug} className="group hover:bg-gray-50/50 transition-all duration-300">
                                        <td className="px-8 py-6">
                                            <div className="flex items-start gap-4">
                                                {activity.coverImage && (
                                                    <div className="w-16 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                                        <picture>
                                                            <img src={activity.coverImage} alt="" className="w-full h-full object-cover" />
                                                        </picture>
                                                    </div>
                                                )}
                                                <div>
                                                    <div className="font-bold text-forest group-hover:text-primary transition-colors">{activity.title}</div>
                                                    <div className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mt-1">/{activity.slug}</div>
                                                    {activity.subtitle && (
                                                        <div className="text-xs text-gray-400 mt-1 line-clamp-1">{activity.subtitle}</div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="text-sm font-medium">{TYPE_LABELS[activity.activityType] || activity.activityType}</span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 text-sm font-bold text-forest">
                                                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                                    {activity.startDate}
                                                    {activity.endDate && ` - ${activity.endDate}`}
                                                </div>
                                                {activity.location && (
                                                    <div className="flex items-center gap-2 text-xs text-gray-400">
                                                        <MapPin className="w-3 h-3" />
                                                        {activity.location}
                                                    </div>
                                                )}
                                                {(activity.maxParticipants ?? 0) > 0 && (
                                                    <div className="flex items-center gap-2 text-xs text-gray-400">
                                                        <Users className="w-3 h-3" />
                                                        {activity.currentParticipants || 0}/{activity.maxParticipants}
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${STATUS_COLORS[activity.status] || 'bg-gray-100 text-gray-600'}`}>
                                                {activity.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link
                                                    href={`/activities/${activity.slug}`}
                                                    target="_blank"
                                                    className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-blue-500 transition-all shadow-sm"
                                                    title="View Live"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                </Link>
                                                <Link
                                                    href={`/adminnongtung/activities/edit/${activity.slug}`}
                                                    className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-primary transition-all shadow-sm"
                                                    title="Edit"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <DeleteActivityButton slug={activity.slug} />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
