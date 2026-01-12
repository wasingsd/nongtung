'use server';

import { deleteRental as dbDeleteRental, saveRental as dbSaveRental } from '@/lib/firestore-db';
import { Rental } from '@/types/types';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createRental(formData: FormData) {
    // Get image URL directly from form
    const imageUrl = formData.get('imageUrl') as string;

    const rental: Rental = {
        id: crypto.randomUUID(),
        name: formData.get('name') as string,
        pricePerDay: Number(formData.get('pricePerDay')),
        type: formData.get('type') as Rental['type'],
        image: imageUrl || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
        features: JSON.parse(formData.get('features') as string || '[]'),
        capacity: Number(formData.get('capacity')),
    };

    await dbSaveRental(rental);
    revalidatePath('/adminnongtung/rental');
    redirect('/adminnongtung/rental');
}

export async function updateRental(id: string, formData: FormData) {
    // Get image URL directly from form
    const imageUrl = formData.get('imageUrl') as string;

    const rental: Rental = {
        id: id,
        name: formData.get('name') as string,
        pricePerDay: Number(formData.get('pricePerDay')),
        type: formData.get('type') as Rental['type'],
        image: imageUrl || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
        features: JSON.parse(formData.get('features') as string || '[]'),
        capacity: Number(formData.get('capacity')),
    };

    await dbSaveRental(rental);
    revalidatePath('/adminnongtung/rental');
    redirect('/adminnongtung/rental');
}

export async function deleteRental(id: string) {
    await dbDeleteRental(id);
    revalidatePath('/adminnongtung/rental');
}
