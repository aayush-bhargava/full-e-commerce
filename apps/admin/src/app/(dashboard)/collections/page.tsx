import React from "react";
import Link from "next/link";
import { Plus, Layers, MoreVertical } from "lucide-react";
import { getCollections, deleteCollection } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const dynamic = 'force-dynamic';

export default async function CollectionsPage() {
    const collections = await getCollections();

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-serif !text-stone-900 mb-1.5">Collections</h1>
                    <p className="text-stone-500">Manage your product categories and story-driven groups</p>
                </div>
                <Link
                    href="/collections/new"
                    className="flex items-center gap-2 bg-stone-100 text-stone-900 px-5 py-2.5 rounded-xl font-medium hover:bg-white transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
                >
                    <Plus size={18} />
                    <span>New Collection</span>
                </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white border border-stone-100 shadow-sm p-6 rounded-2xl">
                    <div className="flex items-center gap-3 text-stone-400 mb-2">
                        <Layers size={18} />
                        <span className="text-sm font-medium">Total Collections</span>
                    </div>
                    <div className="text-3xl font-serif !text-stone-900">{collections.length}</div>
                </div>
            </div>

            {/* Collections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {collections.map((collection) => (
                    <div
                        key={collection.id}
                        className="group bg-white border border-stone-100 rounded-2xl overflow-hidden hover:border-stone-200 shadow-sm transition-all flex flex-col"
                    >
                        <div className="aspect-[16/9] relative overflow-hidden">
                            <img
                                src={collection.image}
                                alt={collection.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 to-transparent opacity-60" />
                            <div className="absolute bottom-4 left-4">
                                <span className="bg-white/10 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded tracking-widest uppercase">
                                    {collection.slug}
                                </span>
                            </div>
                        </div>

                        <div className="p-6 flex-1 flex flex-col">
                            <div className="flex items-start justify-between mb-2">
                                <h3 className="text-xl font-serif !text-stone-900">{collection.name}</h3>
                                <button className="text-stone-500 hover:text-stone-100">
                                    <MoreVertical size={18} />
                                </button>
                            </div>
                            <p className="text-stone-400 text-sm line-clamp-2 mb-6 flex-1">
                                {collection.description}
                            </p>

                            <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
                                <Link
                                    href={`/collections/${collection.id}`}
                                    className="text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors"
                                >
                                    Edit Details
                                </Link>
                                <span className="w-1 h-1 rounded-full bg-stone-200" />
                                <form action={async (formData) => {
                                    'use server';
                                    const id = formData.get('id') as string;
                                    await deleteCollection(id);
                                    revalidatePath('/collections');
                                }}>
                                    <input type="hidden" name="id" value={collection.id} />
                                    <button
                                        type="submit"
                                        className="text-sm font-medium text-red-400 hover:text-red-600 transition-colors"
                                    >
                                        Delete
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
