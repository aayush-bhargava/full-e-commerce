import Link from 'next/link';
import { getProducts, deleteProduct } from '@/lib/db';
import { Plus, Trash2, Edit } from 'lucide-react';
import { revalidatePath } from 'next/cache';

export default async function ProductsPage() {
    const products = await getProducts();

    async function handleDelete(formData: FormData) {
        "use server";
        const id = formData.get('id') as string;
        await deleteProduct(id);
        revalidatePath('/products');
    }

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-serif text-stone-900 mb-1">Products</h1>
                    <p className="text-stone-500">Manage your product inventory</p>
                </div>

                <Link
                    href="/products/new"
                    className="flex items-center gap-2 !bg-stone-900 !text-white px-5 py-2.5 rounded-lg hover:bg-stone-800 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
                >
                    <Plus size={20} className="!text-white" />
                    <span className="font-medium !text-white">Add Product</span>
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-stone-100/50 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-stone-50/50 border-b border-stone-100">
                            <tr className="text-left">
                                <th className="px-6 py-4 font-semibold text-stone-400 text-xs uppercase tracking-wider w-24">
                                    Image
                                </th>
                                <th className="px-6 py-4 font-semibold text-stone-400 text-xs uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-4 font-semibold text-stone-400 text-xs uppercase tracking-wider">
                                    Category
                                </th>
                                <th className="px-6 py-4 font-semibold text-stone-400 text-xs uppercase tracking-wider">
                                    Price
                                </th>
                                <th className="px-6 py-4 font-semibold text-stone-400 text-xs uppercase tracking-wider">
                                    Stock
                                </th>
                                <th className="px-6 py-4 font-semibold text-stone-400 text-xs uppercase tracking-wider text-right">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-stone-50">
                            {products.map((product) => (
                                <tr
                                    key={product.id}
                                    className="group hover:bg-stone-50/80 transition-colors"
                                >
                                    {/* IMAGE */}
                                    <td className="px-6 py-4">
                                        <div className="w-12 h-12 rounded-lg overflow-hidden border border-stone-200 shadow-sm">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </td>

                                    {/* NAME */}
                                    <td className="px-6 py-4 font-medium text-stone-900">
                                        {product.name}
                                    </td>

                                    {/* CATEGORY */}
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-stone-100 text-stone-600 border border-stone-200">
                                            {product.category}
                                        </span>
                                    </td>

                                    {/* PRICE */}
                                    <td className="px-6 py-4 text-stone-900 font-medium font-mono">
                                        ₹{product.price.toFixed(2)}
                                    </td>

                                    {/* STOCK */}
                                    <td className="px-6 py-4 text-stone-600">
                                        <span
                                            className={`inline-flex items-center gap-1.5 ${(product.stock || 0) < 10
                                                    ? 'text-orange-600 font-medium'
                                                    : ''
                                                }`}
                                        >
                                            {product.stock || 0}
                                            {(product.stock || 0) < 10 && (
                                                <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                                            )}
                                        </span>
                                    </td>

                                    {/* ACTIONS */}
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                            <Link
                                                href={`/products/${product.id}/edit`}
                                                className="p-2 text-stone-400 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
                                            >
                                                <Edit size={18} />
                                            </Link>
                                            <form action={handleDelete}>
                                                <input
                                                    type="hidden"
                                                    name="id"
                                                    value={product.id}
                                                />
                                                <button
                                                    type="submit"
                                                    className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {products.length === 0 && (
                    <div className="p-12 text-center text-stone-500">
                        No products found. Add your first product to get started.
                    </div>
                )}
            </div>
        </div>
    );
}