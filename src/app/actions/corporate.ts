'use server';

import { saveQuote, getQuotes, updateQuoteStatus, Quote } from '@/lib/firestore-db';
import { revalidatePath } from 'next/cache';

export async function submitCorporateInquiry(formData: FormData) {
    try {
        const companyName = formData.get('companyName') as string;
        const contactPerson = formData.get('contactPerson') as string;
        const phone = formData.get('phone') as string;
        const groupSize = formData.get('groupSize') as string;
        const expectedDate = formData.get('expectedDate') as string;
        const requirements = formData.get('requirements') as string;

        if (!companyName || !contactPerson || !phone) {
            return { success: false, message: 'Missing required fields' };
        }

        await saveQuote({
            companyName,
            contactPerson,
            phone,
            groupSize,
            expectedDate: expectedDate ? new Date(expectedDate).toISOString() : null,
            requirements,
        });

        return { success: true, message: 'Inquiry submitted successfully' };
    } catch (error) {
        console.error('Error submitting inquiry:', error);
        return { success: false, message: 'Failed to submit inquiry' };
    }
}

export async function getCorporateInquiries() {
    try {
        const inquiries = await getQuotes();
        return { success: true, data: inquiries };
    } catch (error) {
        console.error('Error fetching inquiries:', error);
        return { success: false, data: [] };
    }
}

export async function updateInquiryStatus(id: string, status: string) {
    try {
        // Ensure status is valid before calling
        if (status !== 'pending' && status !== 'done') {
            throw new Error('Invalid status');
        }
        await updateQuoteStatus(id, status);
        revalidatePath('/adminnongtung/corporate');
        return { success: true };
    } catch (error) {
        console.error('Error updating status:', error);
        return { success: false };
    }
}
