'use client';

import { Trash2, Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';

interface DeleteButtonProps {
    className?: string;
    confirmMessage?: string;
}

export function DeleteButton({
    className = "bg-red-50 p-2 rounded hover:bg-red-100 text-red-600 disabled:opacity-50",
    confirmMessage = 'Are you sure you want to delete this item? This action cannot be undone.'
}: DeleteButtonProps) {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className={className}
            onClick={(e) => {
                if (!confirm(confirmMessage)) {
                    e.preventDefault();
                }
            }}
        >
            {pending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
        </button>
    );
}
