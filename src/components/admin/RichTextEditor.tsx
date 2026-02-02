'use client';

import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), {
    ssr: false,
    loading: () => <div className="h-64 bg-gray-50 animate-pulse rounded-lg border border-gray-200"></div>,
});

interface EditorProps {
    value: string;
    onChange: (content: string) => void;
    placeholder?: string;
}

const modules = {
    toolbar: [
        [{ header: [2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
        ['clean'],
    ],
};

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'link', 'image',
];

export default function RichTextEditor({ value, onChange, placeholder }: EditorProps) {
    return (
        <div className="rich-text-editor">
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
                formats={formats}
                placeholder={placeholder}
                className="bg-white rounded-lg min-h-[400px]"
            />
            <style jsx global>{`
                .rich-text-editor .ql-container {
                    border-bottom-left-radius: 0.5rem;
                    border-bottom-right-radius: 0.5rem;
                    min-h: 400px;
                    font-family: inherit;
                    font-size: 1rem;
                }
                .rich-text-editor .ql-toolbar {
                    border-top-left-radius: 0.5rem;
                    border-top-right-radius: 0.5rem;
                    background: #f9fafb;
                    border-color: #e5e7eb;
                }
                .rich-text-editor .ql-container {
                    border-color: #e5e7eb;
                }
                .rich-text-editor .ql-editor {
                    min-height: 400px;
                }
            `}</style>
        </div>
    );
}
