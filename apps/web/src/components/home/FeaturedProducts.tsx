"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Section from "../layout/Section";
import ProductCard from "../ui/ProductCard";
import styles from "./FeaturedProducts.module.css";

const FeaturedProducts = ({ products }: { products: any[] }) => {
    const displayedProducts = products.slice(0, 3);

    return (
        <Section className={styles.section}>
            <div className={styles.header}>
                <motion.div
                    className={styles.badge}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    NEW ARRIVALS
                </motion.div>
                <h2 className={styles.title}>Freshly <span className={styles.italic}>Curated.</span></h2>
                <p className={styles.subtitle}>Hand-selected artifacts recently added to our shop.</p>
            </div>

            <div className={styles.grid}>
                {displayedProducts.map((product, index) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                    >
                        <ProductCard product={product} />
                    </motion.div>
                ))}
            </div>

            <div className={styles.actions}>
                <Link href="/shop" className={styles.viewAllBtn}>
                    <span>Discover More</span>
                    <div className={styles.btnLine} />
                </Link>
            </div>
        </Section>
    );
};

export default FeaturedProducts;
