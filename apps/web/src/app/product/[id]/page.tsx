import React from "react";
import { notFound } from "next/navigation";
import { getProductById, getProducts } from "@/lib/db";
import ProductDetail from "./ProductDetail";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
    const { id } = await params;
    const product = await getProductById(id);

    if (!product) {
        notFound();
    }

    // Fetch related products (same category, excluding current)
    const allProducts = await getProducts();
    const relatedProducts = allProducts
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    return <ProductDetail product={product} relatedProducts={relatedProducts} />;
}
