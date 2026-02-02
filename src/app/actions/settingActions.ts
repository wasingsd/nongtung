"use server";

import { saveHomeSettings } from '@/lib/firestore-db';
import { revalidatePath } from 'next/cache';

export async function updateHomeSettings(formData: FormData) {
    const popularAdventureIds = formData.getAll('popularAdventureIds') as string[];

    await saveHomeSettings({
        popularAdventureIds
    });

    revalidatePath('/');
    revalidatePath('/adminnongtung/settings');
}
