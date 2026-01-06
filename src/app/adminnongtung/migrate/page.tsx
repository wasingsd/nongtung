'use client';

import { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, setDoc, doc, writeBatch } from 'firebase/firestore';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Trip, Rental, Transport } from '@/types/types';

export default function MigratePage() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [log, setLog] = useState<string[]>([]);

    const addLog = (msg: string) => setLog(prev => [...prev, msg]);

    const handleMigrate = async () => {
        try {
            setStatus('loading');
            setLog([]);
            addLog("Fetching local data...");

            const res = await fetch('/api/migration-data');
            const data = await res.json();

            const { trips, rentals, transport } = data as { trips: Trip[], rentals: Rental[], transport: Transport[] };

            addLog(`Found ${trips.length} trips, ${rentals.length} rentals, ${transport.length} transport items.`);

            const batch = writeBatch(db);
            let operationCount = 0;

            // Process Trips
            for (const trip of trips) {
                const ref = doc(db, 'trips', trip.id);
                batch.set(ref, trip);
                operationCount++;
            }
            addLog("Trips prepared for upload.");

            // Process Rentals
            for (const item of rentals) {
                const ref = doc(db, 'rentals', item.id);
                batch.set(ref, item);
                operationCount++;
            }
            addLog("Rentals prepared for upload.");

            // Process Transport
            for (const item of transport) {
                const ref = doc(db, 'transport', item.id);
                batch.set(ref, item);
                operationCount++;
            }
            addLog("Transport prepared for upload.");

            if (operationCount > 0) {
                await batch.commit();
                addLog(`Successfully wrote ${operationCount} documents to Firestore.`);
                setStatus('success');
            } else {
                addLog("No data to migrate.");
                setStatus('idle');
            }

        } catch (error: any) {
            console.error(error);
            addLog(`Error: ${error.message}`);
            setStatus('error');
        }
    };

    return (
        <div className="p-8 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold font-heading text-forest mb-6">Database Migration</h1>

            <div className="bg-white p-6 rounded-lg shadow border border-gray-100 mb-6">
                <p className="mb-4 text-gray-600">
                    This tool will read data from your local JSON files and upload it to your new Firebase Cloud Firestore database.
                </p>
                <p className="mb-6 text-sm text-amber-600 bg-amber-50 p-3 rounded">
                    <strong>Note:</strong> This checks your local <code>src/data/*.json</code> files. Ensure existing data is correct before migrating.
                </p>

                <button
                    onClick={handleMigrate}
                    disabled={status === 'loading'}
                    className={`w-full py-4 rounded-lg font-bold flex justify-center items-center gap-2 text-white transition-all
                        ${status === 'loading' ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary-deep shadow-lg'}
                    `}
                >
                    {status === 'loading' ? <Loader2 className="animate-spin" /> : <CheckCircle />}
                    {status === 'loading' ? 'Migrating...' : 'Start Migration Now'}
                </button>
            </div>

            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm min-h-[200px] overflow-y-auto">
                <p className="opacity-50 border-b border-gray-700 pb-2 mb-2">Operation Logs:</p>
                {log.map((line, i) => (
                    <div key={i}>{line}</div>
                ))}
                {status === 'success' && <div className="text-green-300 font-bold mt-2">✨ Migration Complete!</div>}
                {status === 'error' && <div className="text-red-400 font-bold mt-2">❌ Migration Failed</div>}
            </div>
        </div>
    );
}
