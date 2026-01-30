import { getTrip } from '@/lib/firestore-db';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import TripForm from '@/components/TripForm';
import { notFound } from 'next/navigation';

export default async function EditTripPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const decodedId = decodeURIComponent(id);
    console.log('Fetching Trip Detail Page for ID:', decodedId);
    const trip = await getTrip(decodedId);

    if (!trip) {
        return (
            <div className="container mx-auto px-6 py-12">
                <div className="bg-red-50 border border-red-200 p-8 rounded-2xl text-center">
                    <h2 className="text-2xl font-bold text-red-800 mb-4">Trip Not Found</h2>
                    <p className="text-red-700 mb-2">ไม่พบทริปที่ต้องการแก้ไข (ID: {decodedId})</p>
                    <p className="text-red-600 text-sm mb-6">
                        สาเหตุอาจเกิดจาก ID มีเว้นวรรคหรืออักขระพิเศษ (เช่น | หรือ –) ซึ่งทำให้ระบบหาไม่เจอ
                        <br />แนะนำให้ไปที่หน้า <strong><Link href="/adminnongtung/migrate" className="underline">Migration</Link></strong> และกดปุ่ม <strong>"Sanitize & Fix All Trip Slugs (IDs)"</strong> เพื่อแก้ไข ID ทั้งหมดให้เป็นมาตรฐานครับ
                    </p>
                    <Link href="/adminnongtung/trips" className="text-forest font-bold hover:underline">
                        &larr; กลับไปยังรายการทริป
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 py-12">
            <Link href="/adminnongtung/trips" className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-primary transition-colors mb-6">
                <ChevronLeft className="w-4 h-4 mr-1" /> Back to List
            </Link>

            <h1 className="text-3xl font-bold font-heading text-forest mb-8">Edit Trip: {trip.title}</h1>

            <TripForm trip={trip} />
        </div>
    );
}
