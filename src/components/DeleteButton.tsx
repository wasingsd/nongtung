'use client';

import { Trash2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';

export function DeleteButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="bg-red-50 p-2 rounded hover:bg-red-100 text-red-600 disabled:opacity-50"
            onClick={(e) => {
                if (!confirm('Are you sure you want to delete this trip? This action cannot be undone.')) {
                    e.preventDefault();
                }
            }}
        >
            <Trash2 className="w-4 h-4" />
        </button>
    );
}
