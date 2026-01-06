import { getRentals } from '@/lib/db';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import RentalForm from '@/components/RentalForm';
import { notFound } from 'next/navigation';

export default async function EditRentalPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const rentals = getRentals();
    const rental = rentals.find((t) => t.id === id);

    if (!rental) notFound();

    return (
        <div className="container mx-auto px-6 py-12">
            <Link href="/adminnongtung/rental" className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-primary transition-colors mb-6">
                <ChevronLeft className="w-4 h-4 mr-1" /> Back to List
            </Link>

            <h1 className="text-3xl font-bold font-heading text-forest mb-8">Edit Rental: {rental.name}</h1>

            <RentalForm rental={rental} />
        </div>
    );
}
