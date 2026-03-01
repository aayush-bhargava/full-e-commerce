import React from "react";
import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";
import styles from "./page.module.css";

export const dynamic = 'force-dynamic';

interface Props {
    params: Promise<{ slug: string }>;
}

import { getProducts, getCollectionBySlug } from "@/lib/db";

const CollectionSlugPage = async ({ params }: Props) => {
    const { slug } = await params;
    const collection = await getCollectionBySlug(slug);
    const products = await getProducts();

    // Match based on either the collection name or the slug
    const filteredProducts = products.filter(p =>
        p.category.toLowerCase() === collection?.name.toLowerCase() ||
        p.category.toLowerCase() === slug.toLowerCase()
    );

    if (!collection && filteredProducts.length === 0) {
        return (
            <div className={styles.page}>
                <div className={styles.notFound}>
                    <h2>Collection Not Found</h2>
                    <p>We couldn't find any artifacts in this collection.</p>
                    <Link href="/collections" className={styles.backBtn}>
                        Explore All Collections
                    </Link>
                </div>
            </div>
        );
    }

    const title = collection?.name || decodeURIComponent(slug);

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <div className={styles.breadcrumb}>
                        <Link href="/collections">Collections</Link>
                        <span className={styles.sep}>/</span>
                        <span className={styles.current}>{title}</span>
                    </div>
                    <div className={styles.titleWrapper}>
                        <h1 className={styles.title}>{title}</h1>
                        <div className={styles.titleLine} />
                    </div>
                    {collection?.description && (
                        <p className={styles.subtitle}>{collection.description}</p>
                    )}
                </div>
                <div className={styles.headerDecor}>
                    <div className={styles.decorCircle} />
                </div>
            </header>

            <div className={styles.grid}>
                {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default CollectionSlugPage;
