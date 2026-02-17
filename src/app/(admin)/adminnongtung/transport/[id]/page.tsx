import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import TransportForm from '@/components/TransportForm';
import { getTransportItem } from '@/lib/firestore-db';
import { notFound } from 'next/navigation';

interface EditTransportPageProps {
    params: Promise<{ id: string }>;
}

export default async function EditTransportPage({ params }: EditTransportPageProps) {
    const { id } = await params;
    const transport = await getTransportItem(id);

    if (!transport) {
        notFound();
    }

    return (
        <div className="container mx-auto px-6 py-12">
            <Link href="/adminnongtung/transport" className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-primary transition-colors mb-6">
                <ChevronLeft className="w-4 h-4 mr-1" /> Back to List
            </Link>

            <h1 className="text-3xl font-bold font-heading text-forest mb-8">Edit Transport Route</h1>

            <TransportForm transport={transport} />
        </div>
    );
}
