import { addProduct } from '@/lib/db';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { writeFile } from 'fs/promises';
import path from 'path';

export default function NewProductPage() {

    async function createProduct(formData: FormData) {
        "use server";

        const name = formData.get('name') as string;
        const description = formData.get('description') as string;
        const price = parseFloat(formData.get('price') as string);
        const category = formData.get('category') as string;
        const stock = parseInt(formData.get('stock') as string);

        // 🔥 Handle Image Upload
        const file = formData.get('image') as File;

        if (!file || file.size === 0) {
            throw new Error("Image is required");
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadDir = path.join(process.cwd(), 'public/uploads');
        const fileName = `${Date.now()}-${file.name.replace(/\s/g, "_")}`;
        const filePath = path.join(uploadDir, fileName);

        await writeFile(filePath, buffer);

        const imagePath = `/uploads/${fileName}`;

        await addProduct({
            name,
            description,
            price,
            category,
            image: imagePath,
            stock
        });

        revalidatePath('/products');
        redirect('/products');
    }

    return (
        <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link
                    href="/admin/products"
                    className="p-2 -ml-2 text-stone-400 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
                >
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-3xl font-serif text-stone-100 mb-1.5">Add Product</h1>
                    <p className="text-stone-500">Create a new item in your inventory</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-stone-100/50 overflow-hidden">
                <form action={createProduct} className="p-8 space-y-8">
                    
                    {/* Basic Info */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-medium text-stone-900 border-b border-stone-100 pb-2">
                            Basic Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-stone-700">Product Name</label>
                                <input
                                    name="name"
                                    required
                                    className="w-full px-4 py-2.5 rounded-lg border border-stone-200 focus:border-stone-500 focus:ring-2 focus:ring-stone-200 outline-none transition-all"
                                    placeholder="e.g. Amethyst Cluster"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-stone-700">Category</label>
                                <select
                                    name="category"
                                    className="w-full px-4 py-2.5 rounded-lg border border-stone-200 focus:border-stone-500 focus:ring-2 focus:ring-stone-200 outline-none transition-all bg-white"
                                >
                                    <option value="Crystals">Crystals</option>
                                    <option value="Jewelry">Jewelry</option>
                                    <option value="Incense">Incense</option>
                                    <option value="Home Decor">Home Decor</option>
                                    <option value="Sound Healing">Sound Healing</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-stone-700">Description</label>
                            <textarea
                                name="description"
                                required
                                rows={4}
                                className="w-full px-4 py-2.5 rounded-lg border border-stone-200 focus:border-stone-500 focus:ring-2 focus:ring-stone-200 outline-none transition-all resize-none"
                                placeholder="Describe the product's spiritual properties and uses..."
                            />
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-medium text-stone-900 border-b border-stone-100 pb-2">
                            Inventory & Pricing
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-stone-700">Price (₹)</label>
                                <input
                                    name="price"
                                    type="number"
                                    step="0.01"
                                    required
                                    className="w-full px-4 py-2.5 rounded-lg border border-stone-200 focus:border-stone-500 focus:ring-2 focus:ring-stone-200 outline-none transition-all"
                                    placeholder="0.00"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-stone-700">Stock</label>
                                <input
                                    name="stock"
                                    type="number"
                                    required
                                    defaultValue={0}
                                    className="w-full px-4 py-2.5 rounded-lg border border-stone-200 focus:border-stone-500 focus:ring-2 focus:ring-stone-200 outline-none transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-medium text-stone-900 border-b border-stone-100 pb-2">
                            Media
                        </h3>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-stone-700">Upload Image</label>
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                required
                                className="w-full px-4 py-2.5 rounded-lg border border-stone-200 focus:border-stone-500 focus:ring-2 focus:ring-stone-200 outline-none transition-all"
                            />
                            <p className="text-xs text-stone-400">
                                Upload product image (JPG, PNG).
                            </p>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="pt-4 border-t border-stone-100 flex items-center justify-end gap-4">
                        <Link
                            href="/admin/products"
                            className="px-6 py-2.5 rounded-lg border border-stone-200 text-stone-600 font-medium hover:bg-stone-50 transition-colors"
                        >
                            Cancel
                        </Link>

                        <button
                            type="submit"
                            className="px-6 py-2.5 rounded-lg bg-stone-900 text-white font-medium hover:bg-stone-800 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
                        >
                            Create Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}