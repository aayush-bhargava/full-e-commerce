"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Upload, X, Sparkles } from 'lucide-react';
import { addCollection } from '@/lib/db';

export default function NewCollectionPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [filePreview, setFilePreview] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setFilePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;

        if (!selectedFile) {
            alert("Please upload a cover image.");
            setIsSubmitting(false);
            return;
        }

        try {
            // We'll use a specific server action for the upload later if needed, 
            // but for now let's reuse the logic in addCollection if possible or create a new one.
            // Actually, I'll pass the file in the formData.

            // To handle files in Server Actions, we can just pass the FormData directly if it's handled by a server function.
            // Since this is a client component, I'll call a server action.

            // I need to handle the upload. I'll create a dedicated server action in db.ts for this.

            // For now, let's assume we have a robust way to handle this.
            // Re-using the same pattern as products/new.

            const submissionData = new FormData();
            submissionData.append('name', name);
            submissionData.append('image', selectedFile);
            submissionData.append('description', ""); // Removing from form as requested

            // I'll call the actual createCollection server action (to be implemented/updated)
            // But let's keep it simple and just do it here if I could... 
            // wait, I can't do complex server logic in client component directly.

            // I'll use the existing createCollection pattern but from the client.
            // Actually, I'll wrap the server logic in a dedicated action file or db.ts.

            const response = await fetch('/api/collections/create', {
                method: 'POST',
                body: submissionData,
            });

            if (response.ok) {
                router.push('/collections');
                router.refresh();
            } else {
                const err = await response.text();
                alert(`Error: ${err}`);
            }
        } catch (error) {
            console.error("Failed to create collection:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-8">
            <div className="flex items-center gap-4 mb-10">
                <Link
                    href="/collections"
                    className="p-2 -ml-2 text-stone-400 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition-all"
                >
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-3xl font-serif !text-stone-900 mb-1">New Collection</h1>
                    <p className="text-stone-500 text-sm">Design a beautiful category for your store.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="bg-white rounded-3xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-stone-100 overflow-hidden">
                    <div className="p-8 space-y-10">
                        {/* Image Upload Area */}
                        <div className="space-y-4">
                            <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest">Cover Image</label>
                            <div
                                className={`relative aspect-[16/9] rounded-2xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center overflow-hidden
                                    ${filePreview ? 'border-stone-200' : 'border-stone-200 hover:border-stone-400 bg-stone-50/50'}`}
                            >
                                {filePreview ? (
                                    <>
                                        <img src={filePreview} alt="Preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button
                                                type="button"
                                                onClick={() => { setFilePreview(null); setSelectedFile(null); }}
                                                className="bg-white/90 text-stone-900 p-2 rounded-full shadow-xl hover:scale-110 transition-transform"
                                            >
                                                <X size={20} />
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <label className="cursor-pointer flex flex-col items-center gap-3 p-12 w-full h-full">
                                        <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-stone-400 group-hover:text-stone-600 transition-colors">
                                            <Upload size={24} />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm font-bold text-stone-600">Click to upload cover</p>
                                            <p className="text-xs text-stone-400 mt-1">Recommended: 1600x900px</p>
                                        </div>
                                        <input type="file" className="sr-only" accept="image/*" onChange={handleFileChange} />
                                    </label>
                                )}
                            </div>
                        </div>

                        {/* Name Input */}
                        <div className="space-y-4">
                            <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest">Collection Name</label>
                            <div className="relative">
                                <input
                                    name="name"
                                    required
                                    className="w-full px-0 py-3 text-2xl font-serif text-stone-900 placeholder:text-stone-200 bg-transparent border-b border-stone-100 focus:border-stone-900 outline-none transition-all"
                                    placeholder="e.g. Sacred Amethyst"
                                />
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 text-stone-200">
                                    <Sparkles size={20} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="px-8 py-6 bg-stone-50/50 border-t border-stone-100 flex items-center justify-between">
                        <p className="text-xs text-stone-400 font-medium italic">Your description will be auto-generated or can be added later.</p>
                        <div className="flex items-center gap-4">
                            <Link href="/collections" className="text-sm font-bold text-stone-400 hover:text-stone-900 transition-colors">
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-8 py-3 bg-stone-900 text-white rounded-xl font-bold text-sm hover:bg-stone-800 transition-all shadow-lg shadow-stone-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                        Creating...
                                    </>
                                ) : "Create Collection"}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
