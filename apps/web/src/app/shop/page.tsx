import React from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/ui/ProductCard";
import { getProducts } from "@/lib/db";
import styles from "./page.module.css";

export const dynamic = 'force-dynamic';


const ShopPage = async () => {
    const products = await getProducts();

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <h1 className={styles.title}>Sacred Artifacts</h1>
                <p className={styles.subtitle}>Tools for your spiritual journey</p>
            </header>

            <div className={styles.container}>
                <div className={styles.grid}>
                    {products.map((product, index) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShopPage;
