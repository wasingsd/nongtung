'use server';

import { deleteArticle as dbDeleteArticle, saveArticle as dbSaveArticle } from '@/lib/firestore-db';
import { Article } from '@/types/types';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { slugify } from '@/lib/utils';

export async function createArticle(formData: FormData) {
    const slugInput = formData.get('slug') as string;
    const title = formData.get('title') as string;
    const slug = slugInput ? slugify(slugInput) : slugify(title);

    const article: Article = {
        id: slug, // Use slug as ID
        slug: slug,
        title: title,
        excerpt: formData.get('excerpt') as string,
        content: formData.get('content') as string,
        coverImage: formData.get('coverImage') as string || 'https://images.unsplash.com/photo-1533227297464-9d5d1e21b77d?w=800',
        author: formData.get('author') as string || 'Nongtung Team',
        date: formData.get('date') as string || new Date().toISOString().split('T')[0],
        readingTime: formData.get('readingTime') as string || '5 min read',
        tags: (formData.get('tags') as string || '').split(',').map(t => t.trim()).filter(t => t.length > 0),
        keywords: (formData.get('keywords') as string || '').split(',').map(k => k.trim()).filter(k => k.length > 0),
        relatedTripId: formData.get('relatedTripId') as string,
        relatedRentalId: formData.get('relatedRentalId') as string,
    };

    await dbSaveArticle(article);
    revalidatePath('/articles');
    revalidatePath(`/articles/${slug}`);
    revalidatePath('/adminnongtung/articles');
    redirect('/adminnongtung/articles');
}

export async function updateArticle(originalSlug: string, formData: FormData) {
    const slugInput = formData.get('slug') as string;
    const title = formData.get('title') as string;
    // If slug is provided, use it, otherwise keep original
    let newSlug = slugInput ? slugify(slugInput) : originalSlug;

    // Handle case where user wants to change slug
    if (newSlug !== originalSlug) {
        // In a real app, we should check if newSlug exists.
        // For now, we'll just allow it, but we need to delete the old doc if we change ID
        await dbDeleteArticle(originalSlug);
    }

    const article: Article = {
        id: newSlug,
        slug: newSlug,
        title: title,
        excerpt: formData.get('excerpt') as string,
        content: formData.get('content') as string,
        coverImage: formData.get('coverImage') as string || 'https://images.unsplash.com/photo-1533227297464-9d5d1e21b77d?w=800',
        author: formData.get('author') as string || 'Nongtung Team',
        date: formData.get('date') as string || new Date().toISOString().split('T')[0],
        readingTime: formData.get('readingTime') as string || '5 min read',
        tags: (formData.get('tags') as string || '').split(',').map(t => t.trim()).filter(t => t.length > 0),
        keywords: (formData.get('keywords') as string || '').split(',').map(k => k.trim()).filter(k => k.length > 0),
        relatedTripId: formData.get('relatedTripId') as string,
        relatedRentalId: formData.get('relatedRentalId') as string,
    };

    await dbSaveArticle(article);
    revalidatePath('/articles');
    revalidatePath(`/articles/${originalSlug}`);
    if (newSlug !== originalSlug) revalidatePath(`/articles/${newSlug}`);
    revalidatePath('/adminnongtung/articles');
    redirect('/adminnongtung/articles');
}

export async function deleteArticle(slug: string) {
    await dbDeleteArticle(slug);
    revalidatePath('/articles');
    revalidatePath('/adminnongtung/articles');
}
