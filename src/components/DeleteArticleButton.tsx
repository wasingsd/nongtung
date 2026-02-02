'use client';

import { Trash2, Loader2 } from 'lucide-react';
import { deleteArticle } from '@/app/actions/articleActions';
import { useFormStatus } from 'react-dom';
import { useState } from 'react';

interface DeleteArticleButtonProps {
    slug: string;
}

export function DeleteArticleButton({ slug }: DeleteArticleButtonProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    return (
        <form
            action={async () => {
                setIsDeleting(true);
                try {
                    await deleteArticle(slug);
                } finally {
                    setIsDeleting(false);
                }
            }}
            className="inline-block"
            onSubmit={(e) => {
                if (!confirm('Are you sure you want to delete this article?')) {
                    e.preventDefault();
                }
            }}
        >
            <button
                type="submit"
                disabled={isDeleting}
                className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-500 transition-all shadow-sm disabled:opacity-50"
                title="Delete"
            >
                {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
            </button>
        </form>
    );
}
