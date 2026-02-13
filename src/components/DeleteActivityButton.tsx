'use client';

import { deleteActivity } from '@/app/actions/activityActions';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

interface DeleteActivityButtonProps {
    slug: string;
}

export function DeleteActivityButton({ slug }: DeleteActivityButtonProps) {
    const [isPending, startTransition] = useTransition();
    const [showConfirm, setShowConfirm] = useState(false);
    const router = useRouter();

    const handleDelete = () => {
        startTransition(async () => {
            await deleteActivity(slug);
            router.refresh();
        });
    };

    if (showConfirm) {
        return (
            <div className="flex items-center gap-1">
                <button
                    onClick={handleDelete}
                    disabled={isPending}
                    className="px-3 py-2 rounded-xl bg-red-500 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-red-600 transition-all disabled:opacity-50"
                >
                    {isPending ? '...' : 'Yes'}
                </button>
                <button
                    onClick={() => setShowConfirm(false)}
                    className="px-3 py-2 rounded-xl bg-gray-100 text-gray-500 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-200 transition-all"
                >
                    No
                </button>
            </div>
        );
    }

    return (
        <button
            onClick={() => setShowConfirm(true)}
            className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-100 transition-all shadow-sm"
            title="Delete"
        >
            <Trash2 className="w-4 h-4" />
        </button>
    );
}
