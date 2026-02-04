'use server';

import { deleteRental as dbDeleteRental, saveRental as dbSaveRental } from '@/lib/firestore-db';
import { Rental } from '@/types/types';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createRental(formData: FormData) {
    try {
        const imageUrl = formData.get('imageUrl') as string;

        // Helper for safe JSON parsing
        const safeParse = (key: string) => {
            const val = formData.get(key) as string;
            if (!val || val.trim() === '') return [];
            try {
                return JSON.parse(val);
            } catch (e) {
                console.error(`Error parsing ${key}:`, e);
                return [];
            }
        };

        const rental: Rental = {
            id: crypto.randomUUID(),
            name: formData.get('name') as string,
            price: Number(formData.get('price')) || 0,
            unit: (formData.get('unit') as string) || 'Day',
            stock: Number(formData.get('stock')) || 1,
            type: (formData.get('type') as Rental['type']) || 'Tent',
            image: imageUrl || 'https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?w=800',
            description: (formData.get('description') as string) || '',
            features: safeParse('features'),
        };

        await dbSaveRental(rental);
        revalidatePath('/adminnongtung/rental');
        revalidatePath('/rental');
    } catch (err: any) {
        console.error('Error in createRental:', err);
        throw err;
    }
    redirect('/adminnongtung/rental');
}

export async function updateRental(id: string, formData: FormData) {
    try {
        const imageUrl = formData.get('imageUrl') as string;

        // Helper for safe JSON parsing
        const safeParse = (key: string) => {
            const val = formData.get(key) as string;
            if (!val || val.trim() === '') return [];
            try {
                return JSON.parse(val);
            } catch (e) {
                console.error(`Error parsing ${key}:`, e);
                return [];
            }
        };

        const rental: Rental = {
            id: id,
            name: formData.get('name') as string,
            price: Number(formData.get('price')) || 0,
            unit: (formData.get('unit') as string) || 'Day',
            stock: Number(formData.get('stock')) || 1,
            type: (formData.get('type') as Rental['type']) || 'Tent',
            image: imageUrl || 'https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?w=800',
            description: (formData.get('description') as string) || '',
            features: safeParse('features'),
        };

        await dbSaveRental(rental);
        revalidatePath('/adminnongtung/rental');
        revalidatePath('/rental');
    } catch (err: any) {
        console.error('Error in updateRental:', err);
        throw err;
    }
    redirect('/adminnongtung/rental');
}

export async function deleteRental(id: string) {
    await dbDeleteRental(id);
    revalidatePath('/adminnongtung/rental');
    revalidatePath('/rental');
}
