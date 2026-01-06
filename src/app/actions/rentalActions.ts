'use server';

import { deleteRental as dbDeleteRental, saveRental as dbSaveRental } from '@/lib/db';
import { saveFile } from '@/lib/upload';
import { Rental } from '@/types/types';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createRental(formData: FormData) {
    const imageFile = formData.get('imageFile') as File;
    let imagePath = formData.get('image') as string;

    if (imageFile && imageFile.size > 0) {
        imagePath = await saveFile(imageFile);
    }

    const rental: Rental = {
        id: crypto.randomUUID(),
        name: formData.get('name') as string,
        pricePerDay: Number(formData.get('pricePerDay')),
        type: formData.get('type') as Rental['type'],
        image: imagePath || '/placeholder.jpg',
        features: JSON.parse(formData.get('features') as string || '[]'),
        capacity: Number(formData.get('capacity')),
    };

    dbSaveRental(rental);
    revalidatePath('/adminnongtung/rental');
    redirect('/adminnongtung/rental');
}

export async function updateRental(id: string, formData: FormData) {
    const imageFile = formData.get('imageFile') as File;
    let imagePath = formData.get('image') as string;

    if (imageFile && imageFile.size > 0) {
        imagePath = await saveFile(imageFile);
    }

    const rental: Rental = {
        id: id,
        name: formData.get('name') as string,
        pricePerDay: Number(formData.get('pricePerDay')),
        type: formData.get('type') as Rental['type'],
        image: imagePath,
        features: JSON.parse(formData.get('features') as string || '[]'),
        capacity: Number(formData.get('capacity')),
    };

    dbSaveRental(rental);
    revalidatePath('/adminnongtung/rental');
    redirect('/adminnongtung/rental');
}

export async function deleteRental(id: string) {
    dbDeleteRental(id);
    revalidatePath('/adminnongtung/rental');
}
