'use client';

import { Trash2 } from 'lucide-react';
import { deleteArticle } from '@/app/actions/articleActions';

interface DeleteArticleButtonProps {
    slug: string;
}

export function DeleteArticleButton({ slug }: DeleteArticleButtonProps) {
    return (
        <form
            action={async () => {
                await deleteArticle(slug);
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
                className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete"
            >
                <Trash2 className="w-4 h-4" />
            </button>
        </form>
    );
}
