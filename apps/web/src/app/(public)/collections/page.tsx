import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Activity } from "lucide-react";
import styles from "./page.module.css";

export const dynamic = 'force-dynamic';

import { getCollections, getProducts } from "@/lib/db";

const CollectionsPage = async () => {
    const collections = await getCollections();
    const products = await getProducts();

    // Calculate product counts for each collection
    const collectionsWithCount = collections.map(col => ({
        ...col,
        count: products.filter(p => p.category === col.name).length
    }));

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <div className={styles.logoBadge}>
                    <Activity size={16} />
                    <span>WELLBEING SHOP</span>
                </div>
                <h1 className={styles.title}>Essential <span className={styles.accent}>Explorations.</span></h1>
                <p className={styles.subtitle}>
                    Curated artifacts to harmonize your space and elevate your energy.
                    Discover our hand-selected categories designed for your spiritual journey.
                </p>
            </header>

            <div className={styles.grid}>
                {collectionsWithCount.map((collection) => (
                    <Link href={`/collections/${collection.slug}`} key={collection.id} className={styles.cardLink}>
                        <div className={styles.card}>
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={collection.image}
                                    alt={collection.name}
                                    fill
                                    className={styles.image}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <div className={styles.overlay} />
                                <div className={styles.content}>
                                    <div className={styles.topInfo}>
                                        <span className={styles.count}>{collection.count} Items</span>
                                    </div>
                                    <div className={styles.bottomInfo}>
                                        <h2 className={styles.name}>{collection.name}</h2>
                                        <p className={styles.description}>{collection.description}</p>
                                        <div className={styles.exploreLink}>
                                            Explore Category
                                            <div className={styles.exploreLine} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CollectionsPage;
