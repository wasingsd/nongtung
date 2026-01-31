'use client';

import { updateInquiryStatus } from '@/app/actions/corporate';
import { useTransition } from 'react';

export default function StatusToggle({ id, isDone }: { id: string, isDone: boolean }) {
    const [isPending, startTransition] = useTransition();

    const toggleStatus = () => {
        startTransition(async () => {
            await updateInquiryStatus(id, isDone ? 'pending' : 'done');
        });
    };

    return (
        <button
            onClick={toggleStatus}
            disabled={isPending}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${isDone
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                }`}
        >
            {isPending ? 'Updating...' : isDone ? 'Done' : 'Pending'}
        </button>
    );
}
