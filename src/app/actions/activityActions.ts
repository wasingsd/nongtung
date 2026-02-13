'use server';

import { deleteActivity as dbDeleteActivity, saveActivity as dbSaveActivity } from '@/lib/firestore-db';
import { Activity } from '@/types/types';
import { revalidatePath } from 'next/cache';
import { slugify } from '@/lib/utils';

export async function createActivity(formData: FormData) {
    try {
        const slugInput = formData.get('slug') as string;
        const title = formData.get('title') as string;

        if (!title) {
            throw new Error('Title is required');
        }

        const slug = slugInput ? slugify(slugInput) : slugify(title);
        const now = new Date().toISOString();

        const activity: Activity = {
            id: slug,
            slug: slug,
            title: title,
            subtitle: formData.get('subtitle') as string || '',
            description: formData.get('description') as string || '',
            excerpt: formData.get('excerpt') as string || '',
            coverImage: formData.get('coverImage') as string || 'https://images.unsplash.com/photo-1533227297464-9d5d1e21b77d?w=800',
            gallery: (formData.get('gallery') as string || '').split(',').map(g => g.trim()).filter(g => g.length > 0),
            activityType: (formData.get('activityType') as Activity['activityType']) || 'event',
            status: (formData.get('status') as Activity['status']) || 'upcoming',
            startDate: formData.get('startDate') as string || now.split('T')[0],
            endDate: formData.get('endDate') as string || '',
            time: formData.get('time') as string || '',
            location: formData.get('location') as string || '',
            price: parseFloat(formData.get('price') as string) || 0,
            priceNote: formData.get('priceNote') as string || '',
            keywords: (formData.get('keywords') as string || '').split(',').map(k => k.trim()).filter(k => k.length > 0),
            tags: (formData.get('tags') as string || '').split(',').map(t => t.trim()).filter(t => t.length > 0),
            metaTitle: formData.get('metaTitle') as string || '',
            metaDescription: formData.get('metaDescription') as string || '',
            relatedTripIds: (formData.get('relatedTripIds') as string || '').split(',').map(t => t.trim()).filter(t => t.length > 0),
            maxParticipants: parseInt(formData.get('maxParticipants') as string) || 0,
            currentParticipants: parseInt(formData.get('currentParticipants') as string) || 0,
            highlights: (formData.get('highlights') as string || '').split('\n').map(h => h.trim()).filter(h => h.length > 0),
            requirements: formData.get('requirements') as string || '',
            organizer: formData.get('organizer') as string || 'Nongtung Team',
            contactInfo: formData.get('contactInfo') as string || '',
            createdAt: now,
            updatedAt: now,
        };

        await dbSaveActivity(activity);

        revalidatePath('/activities');
        revalidatePath(`/activities/${slug}`);
        revalidatePath('/adminnongtung/activities');

        return { success: true, slug };
    } catch (error) {
        console.error('Error creating activity:', error);
        throw error;
    }
}

export async function updateActivity(originalSlug: string, formData: FormData) {
    try {
        const slugInput = formData.get('slug') as string;
        const title = formData.get('title') as string;

        if (!title) {
            throw new Error('Title is required');
        }

        let newSlug = slugInput ? slugify(slugInput) : originalSlug;
        const now = new Date().toISOString();

        // Handle case where user wants to change slug
        if (newSlug !== originalSlug) {
            await dbDeleteActivity(originalSlug);
        }

        const activity: Activity = {
            id: newSlug,
            slug: newSlug,
            title: title,
            subtitle: formData.get('subtitle') as string || '',
            description: formData.get('description') as string || '',
            excerpt: formData.get('excerpt') as string || '',
            coverImage: formData.get('coverImage') as string || 'https://images.unsplash.com/photo-1533227297464-9d5d1e21b77d?w=800',
            gallery: (formData.get('gallery') as string || '').split(',').map(g => g.trim()).filter(g => g.length > 0),
            activityType: (formData.get('activityType') as Activity['activityType']) || 'event',
            status: (formData.get('status') as Activity['status']) || 'upcoming',
            startDate: formData.get('startDate') as string || now.split('T')[0],
            endDate: formData.get('endDate') as string || '',
            time: formData.get('time') as string || '',
            location: formData.get('location') as string || '',
            price: parseFloat(formData.get('price') as string) || 0,
            priceNote: formData.get('priceNote') as string || '',
            keywords: (formData.get('keywords') as string || '').split(',').map(k => k.trim()).filter(k => k.length > 0),
            tags: (formData.get('tags') as string || '').split(',').map(t => t.trim()).filter(t => t.length > 0),
            metaTitle: formData.get('metaTitle') as string || '',
            metaDescription: formData.get('metaDescription') as string || '',
            relatedTripIds: (formData.get('relatedTripIds') as string || '').split(',').map(t => t.trim()).filter(t => t.length > 0),
            maxParticipants: parseInt(formData.get('maxParticipants') as string) || 0,
            currentParticipants: parseInt(formData.get('currentParticipants') as string) || 0,
            highlights: (formData.get('highlights') as string || '').split('\n').map(h => h.trim()).filter(h => h.length > 0),
            requirements: formData.get('requirements') as string || '',
            organizer: formData.get('organizer') as string || 'Nongtung Team',
            contactInfo: formData.get('contactInfo') as string || '',
            createdAt: formData.get('createdAt') as string || now,
            updatedAt: now,
        };

        await dbSaveActivity(activity);

        revalidatePath('/activities');
        revalidatePath(`/activities/${originalSlug}`);
        if (newSlug !== originalSlug) revalidatePath(`/activities/${newSlug}`);
        revalidatePath('/adminnongtung/activities');

        return { success: true, slug: newSlug };
    } catch (error) {
        console.error('Error updating activity:', error);
        throw error;
    }
}

export async function deleteActivity(slug: string) {
    try {
        await dbDeleteActivity(slug);
        revalidatePath('/activities');
        revalidatePath('/adminnongtung/activities');
        return { success: true };
    } catch (error) {
        console.error('Error deleting activity:', error);
        throw error;
    }
}
