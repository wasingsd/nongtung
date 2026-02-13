"use server";

import { saveHomeSettings } from '@/lib/firestore-db';
import { revalidatePath } from 'next/cache';

export async function updateHomeSettings(formData: FormData) {
    const popularAdventureIds = formData.getAll('popularAdventureIds') as string[];
    const facebookUrl = formData.get('facebookUrl') as string;

    await saveHomeSettings({
        popularAdventureIds,
        facebookUrl
    });


    revalidatePath('/');
    revalidatePath('/adminnongtung/settings');
}
