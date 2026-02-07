'use client';

import { useState, useTransition } from 'react';
import { Save, Image as ImageIcon, Type, Layout, Tag as TagIcon, Link as LinkIcon, CheckCircle, AlertCircle, Calendar, MapPin, Users, DollarSign } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import RichTextEditor from './RichTextEditor';
import { Activity } from '@/types/types';

interface ActivityFormProps {
    activity: Partial<Activity> | null;
    isNew: boolean;
    action: (formData: FormData) => Promise<void | { success: boolean; slug?: string }>;
}

const ACTIVITY_TYPES = [
    { value: 'event', label: 'Event' },
    { value: 'workshop', label: 'Workshop' },
    { value: 'tour', label: 'Tour' },
    { value: 'seasonal', label: 'Seasonal' },
    { value: 'special', label: 'Special' },
];

const STATUS_OPTIONS = [
    { value: 'upcoming', label: 'Upcoming', color: 'text-blue-500' },
    { value: 'ongoing', label: 'Ongoing', color: 'text-green-500' },
    { value: 'completed', label: 'Completed', color: 'text-gray-500' },
    { value: 'cancelled', label: 'Cancelled', color: 'text-red-500' },
];

export default function ActivityForm({ activity, isNew, action }: ActivityFormProps) {
    const [description, setDescription] = useState(activity?.description || '');
    const [isPending, startTransition] = useTransition();
    const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
    const router = useRouter();

    const handleSubmit = async (formData: FormData) => {
        setStatus(null);
        formData.set('description', description);

        startTransition(async () => {
            try {
                await action(formData);
                setStatus({ type: 'success', message: 'Activity saved successfully! Redirecting...' });
                setTimeout(() => {
                    router.push('/adminnongtung/activities');
                    router.refresh();
                }, 1500);
            } catch (error) {
                console.error('Error saving activity:', error);
                setStatus({ type: 'error', message: 'Failed to save activity. Please try again.' });
            }
        });
    };

    return (
        <form
            action={handleSubmit}
            className="space-y-10"
        >
            {/* Status Message */}
            {status && (
                <div className={`p-6 rounded-2xl flex items-center gap-4 ${status.type === 'success'
                    ? 'bg-green-50 border border-green-200 text-green-800'
                    : 'bg-red-50 border border-red-200 text-red-800'
                    }`}>
                    {status.type === 'success'
                        ? <CheckCircle className="w-6 h-6 text-green-600" />
                        : <AlertCircle className="w-6 h-6 text-red-600" />
                    }
                    <span className="font-bold">{status.message}</span>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Left Column: Editor */}
                <div className="lg:col-span-2 space-y-8">
                    <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                <Type className="w-5 h-5" />
                            </div>
                            <h2 className="text-xl font-black font-heading text-forest uppercase tracking-tight">Activity Content</h2>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Activity Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    defaultValue={activity?.title}
                                    required
                                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all text-lg font-bold text-forest"
                                    placeholder="Enter activity title..."
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Subtitle</label>
                                <input
                                    type="text"
                                    name="subtitle"
                                    defaultValue={activity?.subtitle}
                                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium text-forest"
                                    placeholder="Brief tagline..."
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Description</label>
                                <RichTextEditor
                                    value={description}
                                    onChange={setDescription}
                                    placeholder="Describe the activity in detail..."
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Highlights (one per line)</label>
                                <textarea
                                    name="highlights"
                                    defaultValue={activity?.highlights?.join('\n')}
                                    rows={4}
                                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium text-gray-600"
                                    placeholder="Free camping gear&#10;Professional guide&#10;Breakfast included"
                                ></textarea>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                <Layout className="w-5 h-5" />
                            </div>
                            <h2 className="text-xl font-black font-heading text-forest uppercase tracking-tight">SEO & Marketing</h2>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Excerpt (SEO Meta Description)</label>
                                <textarea
                                    name="excerpt"
                                    defaultValue={activity?.excerpt}
                                    rows={3}
                                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium text-gray-600"
                                    placeholder="Short description for search engines and social media..."
                                ></textarea>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Meta Title (Optional)</label>
                                    <input
                                        type="text"
                                        name="metaTitle"
                                        defaultValue={activity?.metaTitle}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary outline-none transition-all text-sm font-medium"
                                        placeholder="Custom SEO title..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Keywords (comma separated)</label>
                                    <input
                                        type="text"
                                        name="keywords"
                                        defaultValue={activity?.keywords?.join(', ')}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary outline-none transition-all text-sm font-medium"
                                        placeholder="camping, chiang mai, outdoor..."
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <h2 className="text-xl font-black font-heading text-forest uppercase tracking-tight">Location & Schedule</h2>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    defaultValue={activity?.location}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary outline-none transition-all font-medium"
                                    placeholder="Doi Inthanon, Chiang Mai"
                                />
                            </div>
                            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                                <p className="text-xs text-blue-700 font-medium mb-3">📅 Date fields are optional. Leave empty for activities that run all the time.</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Start Date (Optional)</label>
                                        <input
                                            type="date"
                                            name="startDate"
                                            defaultValue={activity?.startDate}
                                            className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-primary outline-none transition-all font-medium"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">End Date (Optional)</label>
                                        <input
                                            type="date"
                                            name="endDate"
                                            defaultValue={activity?.endDate}
                                            className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-primary outline-none transition-all font-medium"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Operating Hours (Optional)</label>
                                <input
                                    type="text"
                                    name="time"
                                    defaultValue={activity?.time}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary outline-none transition-all font-medium"
                                    placeholder="Available daily, 09:00 - 17:00"
                                />
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right Column: Sidebar Settings */}
                <div className="space-y-8">
                    {/* Publishing Actions */}
                    <div className="bg-forest p-8 rounded-[2.5rem] shadow-xl text-white">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-6 text-primary">Publishing</h3>
                        <div className="space-y-4">
                            <button
                                type="submit"
                                disabled={isPending}
                                className="w-full bg-primary hover:bg-white hover:text-forest text-white py-4 rounded-full font-black uppercase text-xs tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isPending ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                        Save & Publish
                                    </>
                                )}
                            </button>
                            <Link
                                href="/adminnongtung/activities"
                                className="w-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white py-4 rounded-full font-black uppercase text-xs tracking-widest transition-all block text-center border border-white/5"
                            >
                                Discard Changes
                            </Link>
                        </div>

                        <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
                            <div>
                                <label className="block text-[10px] font-black text-white/30 uppercase tracking-widest mb-2">Status</label>
                                <select
                                    name="status"
                                    defaultValue={activity?.status || 'upcoming'}
                                    className="w-full bg-white/10 border border-white/10 px-4 py-3 rounded-xl text-white text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary"
                                >
                                    {STATUS_OPTIONS.map(opt => (
                                        <option key={opt.value} value={opt.value} className="text-forest">{opt.label}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-[10px] font-black text-white/30 uppercase tracking-widest mb-2">Activity Type</label>
                                <select
                                    name="activityType"
                                    defaultValue={activity?.activityType || 'event'}
                                    className="w-full bg-white/10 border border-white/10 px-4 py-3 rounded-xl text-white text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary"
                                >
                                    {ACTIVITY_TYPES.map(type => (
                                        <option key={type.value} value={type.value} className="text-forest">{type.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Media Section */}
                    <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <ImageIcon className="w-5 h-5 text-primary" />
                            <h3 className="text-sm font-black font-heading text-forest uppercase tracking-tight">Media</h3>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Cover Image URL</label>
                                <input
                                    type="text"
                                    name="coverImage"
                                    defaultValue={activity?.coverImage}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary outline-none transition-all text-xs font-bold"
                                    placeholder="https://..."
                                />
                                {activity?.coverImage && (
                                    <div className="mt-4 rounded-xl overflow-hidden aspect-video relative border border-gray-100">
                                        <picture>
                                            <img src={activity.coverImage} alt="Preview" className="object-cover w-full h-full" />
                                        </picture>
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Gallery (comma separated URLs)</label>
                                <textarea
                                    name="gallery"
                                    defaultValue={activity?.gallery?.join(', ')}
                                    rows={2}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary outline-none transition-all text-xs font-bold"
                                    placeholder="https://..., https://..."
                                ></textarea>
                            </div>
                        </div>
                    </section>

                    {/* Organization Section */}
                    <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <TagIcon className="w-5 h-5 text-primary" />
                            <h3 className="text-sm font-black font-heading text-forest uppercase tracking-tight">Organization</h3>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Slug (URL)</label>
                                <input
                                    type="text"
                                    name="slug"
                                    defaultValue={activity?.slug}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary outline-none transition-all text-xs font-bold"
                                    placeholder="Leave empty to auto-generate"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Organizer</label>
                                <input
                                    type="text"
                                    name="organizer"
                                    defaultValue={activity?.organizer || 'Nongtung Team'}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary outline-none transition-all text-xs font-bold"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Tags (comma separated)</label>
                                <input
                                    type="text"
                                    name="tags"
                                    defaultValue={activity?.tags?.join(', ')}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary outline-none transition-all text-xs font-bold"
                                    placeholder="Camping, Workshop, Chiang Mai"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Pricing & Capacity */}
                    <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <DollarSign className="w-5 h-5 text-primary" />
                            <h3 className="text-sm font-black font-heading text-forest uppercase tracking-tight">Pricing & Capacity</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Price (THB)</label>
                                    <input
                                        type="number"
                                        name="price"
                                        defaultValue={activity?.price || 0}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary outline-none transition-all text-xs font-bold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Price Note</label>
                                    <input
                                        type="text"
                                        name="priceNote"
                                        defaultValue={activity?.priceNote}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary outline-none transition-all text-xs font-bold"
                                        placeholder="per person"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Max Participants</label>
                                    <input
                                        type="number"
                                        name="maxParticipants"
                                        defaultValue={activity?.maxParticipants || 0}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary outline-none transition-all text-xs font-bold"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Current</label>
                                    <input
                                        type="number"
                                        name="currentParticipants"
                                        defaultValue={activity?.currentParticipants || 0}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-primary outline-none transition-all text-xs font-bold"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Related Trips */}
                    <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <LinkIcon className="w-5 h-5 text-primary" />
                            <h3 className="text-sm font-black font-heading text-forest uppercase tracking-tight">Connected Data</h3>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Related Trip IDs (comma separated)</label>
                                <input
                                    type="text"
                                    name="relatedTripIds"
                                    defaultValue={activity?.relatedTripIds?.join(', ')}
                                    className="w-full px-4 py-2 rounded-xl bg-gray-50 border border-gray-100 text-[10px] font-bold"
                                    placeholder="e.g. mae-ngat-lake, doi-inthanon"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Contact Info</label>
                                <input
                                    type="text"
                                    name="contactInfo"
                                    defaultValue={activity?.contactInfo}
                                    className="w-full px-4 py-2 rounded-xl bg-gray-50 border border-gray-100 text-[10px] font-bold"
                                    placeholder="Facebook, Line, Phone..."
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Requirements</label>
                                <textarea
                                    name="requirements"
                                    defaultValue={activity?.requirements}
                                    rows={2}
                                    className="w-full px-4 py-2 rounded-xl bg-gray-50 border border-gray-100 text-[10px] font-bold"
                                    placeholder="What participants need to know or bring..."
                                ></textarea>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </form>
    );
}
