'use server';

import { deleteTrip as dbDeleteTrip, saveTrip as dbSaveTrip } from '@/lib/db';
import { saveFile } from '@/lib/upload';
import { Trip } from '@/types/types';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createTrip(formData: FormData) {
    const imageFile = formData.get('imageFile') as File;
    let imagePath = formData.get('image') as string;

    if (imageFile && imageFile.size > 0) {
        imagePath = await saveFile(imageFile);
    }

    // Handle Gallery
    const existingGallery = JSON.parse(formData.get('gallery') as string || '[]');
    const galleryFiles = formData.getAll('galleryFiles') as File[];
    const newGalleryPaths = await Promise.all(
        galleryFiles.filter(f => f.size > 0).map(file => saveFile(file))
    );
    const finalGallery = [...existingGallery, ...newGalleryPaths];

    const trip: Trip = {
        id: crypto.randomUUID(),
        title: formData.get('title') as string,
        price: Number(formData.get('price')),
        difficulty: formData.get('difficulty') as Trip['difficulty'],
        status: formData.get('status') as Trip['status'],
        image: imagePath || '/placeholder.jpg',
        gallery: finalGallery,
        tags: (formData.get('tags') as string).split(',').map(t => t.trim()),
        duration: formData.get('duration') as Trip['duration'],
        type: formData.get('type') as Trip['type'],
        description: formData.get('description') as string,
        location: formData.get('location') as string,
        highlights: JSON.parse(formData.get('highlights') as string || '[]'),
        itinerary: JSON.parse(formData.get('itinerary') as string || '[]'),
        whatsIncluded: JSON.parse(formData.get('whatsIncluded') as string || '[]'),
        notIncluded: JSON.parse(formData.get('notIncluded') as string || '[]'),
    };

    dbSaveTrip(trip);
    revalidatePath('/trips');
    revalidatePath('/adminnongtung/trips');
    redirect('/adminnongtung/trips');
}

export async function updateTrip(id: string, formData: FormData) {
    const imageFile = formData.get('imageFile') as File;
    let imagePath = formData.get('image') as string;

    if (imageFile && imageFile.size > 0) {
        imagePath = await saveFile(imageFile);
    }

    // Handle Gallery
    const existingGallery = JSON.parse(formData.get('gallery') as string || '[]');
    const galleryFiles = formData.getAll('galleryFiles') as File[];
    const newGalleryPaths = await Promise.all(
        galleryFiles.filter(f => f.size > 0).map(file => saveFile(file))
    );
    const finalGallery = [...existingGallery, ...newGalleryPaths];

    const trip: Trip = {
        id: id,
        title: formData.get('title') as string,
        price: Number(formData.get('price')),
        difficulty: formData.get('difficulty') as Trip['difficulty'],
        status: formData.get('status') as Trip['status'],
        image: imagePath,
        gallery: finalGallery,
        tags: (formData.get('tags') as string).split(',').map(t => t.trim()),
        duration: formData.get('duration') as Trip['duration'],
        type: formData.get('type') as Trip['type'],
        description: formData.get('description') as string,
        location: formData.get('location') as string,
        highlights: JSON.parse(formData.get('highlights') as string || '[]'),
        itinerary: JSON.parse(formData.get('itinerary') as string || '[]'),
        whatsIncluded: JSON.parse(formData.get('whatsIncluded') as string || '[]'),
        notIncluded: JSON.parse(formData.get('notIncluded') as string || '[]'),
    };

    dbSaveTrip(trip);
    revalidatePath('/trips');
    revalidatePath('/trips/' + id);
    revalidatePath('/adminnongtung/trips');
    redirect('/adminnongtung/trips');
}

export async function deleteTrip(id: string) {
    dbDeleteTrip(id);
    revalidatePath('/trips');
    revalidatePath('/adminnongtung/trips');
}
