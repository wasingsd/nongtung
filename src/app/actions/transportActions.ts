'use server';

import { deleteTransport as dbDeleteTransport, saveTransport as dbSaveTransport } from '@/lib/firestore-db';
import { Transport } from '@/types/types';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createTransport(formData: FormData) {
    const imageUrl = formData.get('imageUrl') as string;

    const transport: Transport = {
        id: crypto.randomUUID(),
        type: formData.get('type') as string,
        route: formData.get('route') as string,
        price: Number(formData.get('price')),
        departureTime: formData.get('departureTime') as string,
        image: imageUrl || 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800',
    };

    await dbSaveTransport(transport);
    revalidatePath('/adminnongtung/transport');
    revalidatePath('/transport');
    redirect('/adminnongtung/transport');
}

export async function updateTransport(id: string, formData: FormData) {
    const imageUrl = formData.get('imageUrl') as string;

    const transport: Transport = {
        id: id,
        type: formData.get('type') as string,
        route: formData.get('route') as string,
        price: Number(formData.get('price')),
        departureTime: formData.get('departureTime') as string,
        image: imageUrl || 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800',
    };

    await dbSaveTransport(transport);
    revalidatePath('/adminnongtung/transport');
    revalidatePath('/transport');
    redirect('/adminnongtung/transport');
}

export async function deleteTransport(id: string) {
    await dbDeleteTransport(id);
    revalidatePath('/adminnongtung/transport');
    revalidatePath('/transport');
}
