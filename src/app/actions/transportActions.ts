'use server';

import { deleteTransport as dbDeleteTransport, saveTransport as dbSaveTransport } from '@/lib/firestore-db';
import { Transport } from '@/types/types';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createTransport(formData: FormData) {
    try {
        const imageUrl = formData.get('imageUrl') as string;

        const transport: Transport = {
            id: crypto.randomUUID(),
            type: formData.get('type') as string,
            price1Day: Number(formData.get('price1Day')) || 0,
            price2Day: Number(formData.get('price2Day')) || 0,
            image: imageUrl || 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800',
            note: (formData.get('note') as string) || '',
        };

        await dbSaveTransport(transport);
        revalidatePath('/adminnongtung/transport');
        revalidatePath('/transport');
    } catch (err: any) {
        console.error('Error in createTransport:', err);
        throw err;
    }
    redirect('/adminnongtung/transport');
}

export async function updateTransport(id: string, formData: FormData) {
    try {
        const imageUrl = formData.get('imageUrl') as string;

        const transport: Transport = {
            id: id,
            type: formData.get('type') as string,
            price1Day: Number(formData.get('price1Day')) || 0,
            price2Day: Number(formData.get('price2Day')) || 0,
            image: imageUrl || 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800',
            note: (formData.get('note') as string) || '',
        };

        await dbSaveTransport(transport);
        revalidatePath('/adminnongtung/transport');
        revalidatePath('/transport');
    } catch (err: any) {
        console.error('Error in updateTransport:', err);
        throw err;
    }
    redirect('/adminnongtung/transport');
}

export async function deleteTransport(id: string) {
    await dbDeleteTransport(id);
    revalidatePath('/adminnongtung/transport');
    revalidatePath('/transport');
}
