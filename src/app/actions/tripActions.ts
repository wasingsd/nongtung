'use server';

import { deleteTrip as dbDeleteTrip, saveTrip as dbSaveTrip, getTrip } from '@/lib/firestore-db';
import { Trip } from '@/types/types';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { slugify } from '@/lib/utils';

export async function createTrip(formData: FormData) {
    // Get image URL directly from form
    const imageUrl = formData.get('imageUrl') as string;

    // Handle Gallery URLs (comma-separated or JSON array)
    const galleryInput = formData.get('gallery') as string || '[]';
    let gallery: string[] = [];
    try {
        gallery = JSON.parse(galleryInput);
    } catch {
        // If not valid JSON, try comma-separated
        gallery = galleryInput.split(',').map(url => url.trim()).filter(url => url.length > 0);
    }

    const slugInput = formData.get('slug') as string;
    const slug = slugInput ? slugify(slugInput) : crypto.randomUUID();

    // Validate Duplicate ID
    const existingTrip = await getTrip(slug);
    if (existingTrip) {
        throw new Error(`Trip ID "${slug}" นี้ถูกใช้งานไปแล้ว กรุณาใช้ชื่ออื่นเพื่อ SEO`);
    }

    const trip: Trip = {
        id: slug,
        title: formData.get('title') as string,
        subtitle: formData.get('subtitle') as string,
        price: Number(formData.get('price')),
        difficulty: formData.get('difficulty') as Trip['difficulty'],
        status: formData.get('status') as Trip['status'],
        image: imageUrl || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        gallery: gallery,
        tags: (formData.get('tags') as string || '').split(',').map(t => t.trim()).filter(t => t.length > 0),
        duration: formData.get('duration') as Trip['duration'],
        type: formData.get('type') as Trip['type'],
        description: formData.get('description') as string,
        location: formData.get('location') as string,
        highlights: JSON.parse(formData.get('highlights') as string || '[]'),
        itinerary: JSON.parse(formData.get('itinerary') as string || '[]'),
        whatsIncluded: JSON.parse(formData.get('whatsIncluded') as string || '[]'),
        notIncluded: JSON.parse(formData.get('notIncluded') as string || '[]'),
    };

    await dbSaveTrip(trip);
    revalidatePath('/trips');
    revalidatePath(`/trips/${slug}`);
    revalidatePath('/adminnongtung/trips');
    redirect('/adminnongtung/trips');
}

export async function updateTrip(originalId: string, formData: FormData) {
    // Get image URL directly from form
    const imageUrl = formData.get('imageUrl') as string;

    // Handle Gallery URLs
    const galleryInput = formData.get('gallery') as string || '[]';
    let gallery: string[] = [];
    try {
        gallery = JSON.parse(galleryInput);
    } catch {
        gallery = galleryInput.split(',').map(url => url.trim()).filter(url => url.length > 0);
    }

    const slugInput = formData.get('slug') as string;
    const newId = slugInput ? slugify(slugInput) : originalId;

    // Validate Duplicate ID if ID changed
    // ONLY throw if the newId is different from originalId AND different from slugified originalId
    if (newId !== originalId && newId !== slugify(originalId)) {
        const existingTrip = await getTrip(newId);
        if (existingTrip) {
            throw new Error(`Trip ID "${newId}" นี้ถูกใช้งานไปแล้ว กรุณาใช้ชื่ออื่นเพื่อ SEO`);
        }
    }

    const trip: Trip = {
        id: newId,
        title: formData.get('title') as string,
        subtitle: formData.get('subtitle') as string,
        price: Number(formData.get('price')),
        difficulty: formData.get('difficulty') as Trip['difficulty'],
        status: formData.get('status') as Trip['status'],
        image: imageUrl || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        gallery: gallery,
        tags: (formData.get('tags') as string || '').split(',').map(t => t.trim()).filter(t => t.length > 0),
        duration: formData.get('duration') as Trip['duration'],
        type: formData.get('type') as Trip['type'],
        description: formData.get('description') as string,
        location: formData.get('location') as string,
        highlights: JSON.parse(formData.get('highlights') as string || '[]'),
        itinerary: JSON.parse(formData.get('itinerary') as string || '[]'),
        whatsIncluded: JSON.parse(formData.get('whatsIncluded') as string || '[]'),
        notIncluded: JSON.parse(formData.get('notIncluded') as string || '[]'),
    };

    // Save with the NEW ID
    await dbSaveTrip(trip);

    // If ID has changed, delete the OLD document
    if (newId !== originalId) {
        await dbDeleteTrip(originalId);
    }

    revalidatePath('/trips');
    revalidatePath('/trips/' + originalId);
    revalidatePath('/trips/' + newId);
    revalidatePath('/adminnongtung/trips');

    // Redirect to the list or the NEW edit page
    redirect('/adminnongtung/trips');
}

export async function deleteTrip(id: string) {
    await dbDeleteTrip(id);
    revalidatePath('/trips');
    revalidatePath('/adminnongtung/trips');
}
