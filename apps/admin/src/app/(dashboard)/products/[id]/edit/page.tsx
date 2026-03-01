import { getProductById, updateProduct } from "@/lib/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { ArrowLeft, Trash2, Star } from "lucide-react";
import { Product } from "@/types";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await getProductById(id);

  if (!product) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-semibold text-red-600">
          Product not found
        </h2>
      </div>
    );
  }

  async function handleUpdate(formData: FormData) {
    "use server";

    if (!product) return;

    const updatedProduct: Product = {
      ...product,
      id: product.id,
      image: product.image, // Explicitly assign image
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: parseFloat(formData.get("price") as string),
      category: formData.get("category") as string,
      stock: parseInt(formData.get("stock") as string),
      displayReviews: parseInt(formData.get("displayReviews") as string || "0"),
    };

    // Handle Manual Review Addition
    const manualName = formData.get("manualRevName") as string;
    const manualRating = parseInt(formData.get("manualRevRating") as string);
    const manualComment = formData.get("manualRevComment") as string;

    if (manualName && manualComment) {
      if (!updatedProduct.userReviews) updatedProduct.userReviews = [];
      updatedProduct.userReviews.push({
        name: manualName,
        rating: manualRating,
        comment: manualComment,
        date: new Date().toISOString()
      });
    }

    await updateProduct(updatedProduct);

    revalidatePath("/products");
    redirect("/products");
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/products"
          className="p-2 -ml-2 text-stone-400 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-3xl font-serif text-stone-900 mb-1.5">
            Edit Product
          </h1>
          <p className="text-stone-500">
            Update product information
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl shadow border border-stone-100 overflow-hidden">
        <form action={handleUpdate} className="p-8 space-y-8">

          {/* Basic Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-stone-900 border-b pb-2">
              Basic Information
            </h3>

            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-700">
                Product Name
              </label>
              <input
                name="name"
                defaultValue={product.name}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-stone-200 focus:ring-2 focus:ring-stone-200 outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-700">
                Description
              </label>
              <textarea
                name="description"
                defaultValue={product.description}
                rows={4}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-stone-200 focus:ring-2 focus:ring-stone-200 outline-none resize-none"
              />
            </div>
          </div>

          {/* Pricing */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-stone-900 border-b pb-2">
              Inventory & Pricing
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="text-sm font-medium text-stone-700">
                  Price (₹)
                </label>
                <input
                  name="price"
                  type="number"
                  step="0.01"
                  defaultValue={product.price}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-stone-200 focus:ring-2 focus:ring-stone-200 outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-stone-700">
                  Stock
                </label>
                <input
                  name="stock"
                  type="number"
                  defaultValue={product.stock}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-stone-200 focus:ring-2 focus:ring-stone-200 outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-stone-700">
                  Category
                </label>
                <select
                  name="category"
                  defaultValue={product.category}
                  className="w-full px-4 py-2.5 rounded-lg border border-stone-200 focus:ring-2 focus:ring-stone-200 outline-none bg-white"
                >
                  <option value="Crystals">Crystals</option>
                  <option value="Jewelry">Jewelry</option>
                  <option value="Incense">Incense</option>
                  <option value="Home Decor">Home Decor</option>
                  <option value="Sound Healing">Sound Healing</option>
                </select>
              </div>
            </div>
          </div>

          {/* Rating Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-stone-900 border-b pb-2">
              Overall Rating Display
            </h3>
            <p className="text-sm text-stone-500">
              Set the overall rating manually. User reviews will be shown separately at the bottom.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-stone-700">
                  Manual Rating (0-5)
                </label>
                <input
                  name="displayRating"
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  defaultValue={product.displayRating || 0}
                  className="w-full px-4 py-2.5 rounded-lg border border-stone-200 focus:ring-2 focus:ring-stone-200 outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-stone-700">
                  Manual Review Count
                </label>
                <input
                  name="displayReviews"
                  type="number"
                  defaultValue={product.displayReviews || 0}
                  className="w-full px-4 py-2.5 rounded-lg border border-stone-200 focus:ring-2 focus:ring-stone-200 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Feedback Management */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="text-lg font-medium text-stone-900">
                Customer Feedback
              </h3>
              <span className="px-2 py-1 bg-stone-100 text-stone-600 text-xs font-bold rounded-full">
                {product.userReviews?.length || 0} Total
              </span>
            </div>

            <div className="space-y-4">
              {product.userReviews && product.userReviews.length > 0 ? (
                product.userReviews.map((rev, idx) => (
                  <div key={idx} className="p-4 bg-stone-50 rounded-xl border border-stone-100 group relative">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="font-bold text-stone-900">{rev.name}</span>
                        <div className="flex gap-0.5 mt-0.5">
                          {[1, 2, 3, 4, 5].map(s => (
                            <Star
                              key={s}
                              size={10}
                              fill={s <= rev.rating ? "#d4af37" : "none"}
                              color={s <= rev.rating ? "#d4af37" : "#ddd"}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-[10px] text-stone-400 uppercase tracking-wider">
                        {new Date(rev.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-stone-600 italic">"{rev.comment}"</p>

                    <form
                      action={async () => {
                        "use server";
                        const { deleteReview } = require("@/lib/db");
                        await deleteReview(product.id, idx);
                        revalidatePath(`/products/${product.id}/edit`);
                      }}
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <button className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md">
                        <Trash2 size={14} />
                      </button>
                    </form>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center border-2 border-dashed border-stone-100 rounded-xl">
                  <p className="text-sm text-stone-400 font-medium">No customer feedback yet.</p>
                </div>
              )}
            </div>

            {/* Manual Review Addition */}
            <div className="mt-8 pt-6 border-t border-stone-100">
              <h4 className="text-sm font-bold text-stone-900 mb-4 uppercase tracking-widest">
                Add Manual Feedback
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  name="manualRevName"
                  placeholder="Reviewer Name"
                  className="px-3 py-2 text-sm rounded-lg border border-stone-200 outline-none focus:border-stone-500"
                />
                <select
                  name="manualRevRating"
                  className="px-3 py-2 text-sm rounded-lg border border-stone-200 outline-none bg-white"
                >
                  {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} Stars</option>)}
                </select>
              </div>
              <textarea
                name="manualRevComment"
                placeholder="Feedback comment..."
                rows={2}
                className="w-full px-3 py-2 text-sm rounded-lg border border-stone-200 outline-none focus:border-stone-500 resize-none mb-4"
              />
              <p className="text-[10px] text-stone-400 bg-stone-50 p-2 rounded">
                Note: To add this review, click "Update Product" after filling these fields.
              </p>
            </div>
          </div>

          {/* Current Image Preview */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-stone-900 border-b pb-2">
              Current Image
            </h3>

            <div className="w-32 h-32 rounded-lg overflow-hidden border border-stone-200">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t flex justify-end gap-4">
            <Link
              href="/products"
              className="px-6 py-2.5 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-50 transition"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-stone-900 text-white hover:bg-stone-800 transition shadow-sm hover:-translate-y-0.5"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}