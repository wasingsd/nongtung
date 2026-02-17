'use client';

import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import TripForm from '@/components/TripForm';

export default function CreateTripPage() {
    return (
        <div className="container mx-auto px-6 py-12">
            <Link href="/adminnongtung/trips" className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-primary transition-colors mb-6">
                <ChevronLeft className="w-4 h-4 mr-1" /> Back to List
            </Link>

            <h1 className="text-3xl font-bold font-heading text-forest mb-8">Add New Trip</h1>

            <TripForm />
        </div>
    );
}
