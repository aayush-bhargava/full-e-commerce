import { getCollectionById, updateCollection, deleteCollection, getProducts } from '@/lib/db';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import { ArrowLeft, Trash2, Save, ExternalLink } from 'lucide-react';

interface Props {
    params: Promise<{ id: string }>;
}

export default async function EditCollectionPage({ params }: Props) {
    const { id } = await params;
    const collections = await (await import('@/lib/db')).getCollections();
    const collection = collections.find(c => c.id === id);
    const products = await getProducts();
    const collectionProducts = products.filter(p => p.category === collection?.name);

    if (!collection) {
        redirect('/collections');
    }

    async function editCollection(formData: FormData) {
        "use server";
        const name = formData.get('name') as string;
        const description = formData.get('description') as string;
        const imageUrl = formData.get('imageUrl') as string;

        await updateCollection(id, { name, description, image: imageUrl });
        revalidatePath('/collections');
        redirect('/collections');
    }

    async function removeCollection() {
        "use server";
        await deleteCollection(id);
        revalidatePath('/collections');
        redirect('/collections');
    }

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link
                        href="/collections"
                        className="p-2 -ml-2 text-stone-400 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-serif text-stone-100 mb-1.5">Edit Collection</h1>
                        <p className="text-stone-500">Manage products and details for "{collection.name}"</p>
                    </div>
                </div>

                <form action={removeCollection}>
                    <button
                        type="submit"
                        className="flex items-center gap-2 text-red-400 hover:text-red-300 px-4 py-2 rounded-lg hover:bg-red-400/10 transition-colors"
                    >
                        <Trash2 size={18} />
                        <span>Delete Collection</span>
                    </button>
                </form>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Edit Form */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white rounded-2xl shadow-xl border border-stone-100 overflow-hidden">
                        <form action={editCollection} className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-stone-700">Collection Name</label>
                                    <input
                                        name="name"
                                        required
                                        defaultValue={collection.name}
                                        className="w-full px-4 py-2.5 rounded-lg border border-stone-200 focus:border-stone-500 outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-stone-700">Cover Image URL</label>
                                    <input
                                        name="imageUrl"
                                        required
                                        defaultValue={collection.image}
                                        className="w-full px-4 py-2.5 rounded-lg border border-stone-200 focus:border-stone-500 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-stone-700">Description</label>
                                <textarea
                                    name="description"
                                    required
                                    rows={4}
                                    defaultValue={collection.description}
                                    className="w-full px-4 py-2.5 rounded-lg border border-stone-200 focus:border-stone-500 outline-none transition-all resize-none"
                                />
                            </div>

                            <div className="pt-4 flex justify-end">
                                <button
                                    type="submit"
                                    className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-stone-900 text-white font-medium hover:bg-stone-800 transition-all shadow-sm"
                                >
                                    <Save size={18} />
                                    <span>Save Changes</span>
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Products in this collection */}
                    <div className="bg-stone-900/40 border border-stone-800 rounded-2xl overflow-hidden">
                        <div className="p-6 border-b border-stone-800 flex items-center justify-between">
                            <h3 className="text-lg font-serif text-stone-100">Products in this Collection</h3>
                            <span className="text-xs font-medium text-stone-500 uppercase tracking-widest">
                                {collectionProducts.length} Artifacts
                            </span>
                        </div>
                        <div className="divide-y divide-stone-800/50">
                            {collectionProducts.length === 0 ? (
                                <div className="p-12 text-center text-stone-500">
                                    No products assigned to this category yet.
                                </div>
                            ) : (
                                collectionProducts.map((product) => (
                                    <div key={product.id} className="p-4 flex items-center gap-4 group">
                                        <div className="w-12 h-12 rounded-lg bg-stone-800 overflow-hidden shrink-0">
                                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-medium text-stone-200 truncate">{product.name}</h4>
                                            <p className="text-xs text-stone-500">₹{product.price.toLocaleString('en-IN')}</p>
                                        </div>
                                        <Link
                                            href={`/products/${product.id}`}
                                            className="p-2 text-stone-500 hover:text-stone-100 opacity-0 group-hover:opacity-100 transition-all"
                                        >
                                            <ExternalLink size={16} />
                                        </Link>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Preview Card */}
                <div className="space-y-4">
                    <h3 className="text-sm font-medium text-stone-500 uppercase tracking-widest px-2">Live Preview</h3>
                    <div className="bg-stone-950 rounded-2xl overflow-hidden border border-stone-800 shadow-2xl sticky top-8">
                        <div className="aspect-[3/4] relative">
                            <img src={collection.image} className="w-full h-full object-cover opacity-60" />
                            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
                            <div className="absolute bottom-6 left-6 right-6">
                                <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em] mb-2 block">Collection</span>
                                <h4 className="text-2xl font-serif text-white mb-2">{collection.name}</h4>
                                <p className="text-sm text-stone-400 line-clamp-3 leading-relaxed">
                                    {collection.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
