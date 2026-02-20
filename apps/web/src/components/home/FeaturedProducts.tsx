"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Section from "../layout/Section";
import styles from "./FeaturedProducts.module.css";

// We'll pass products as props since this is a client component
const FeaturedProducts = ({ products }: { products: any[] }) => {
    // Show only first 3 products
    const displayedProducts = products.slice(0, 3);

    return (
        <Section className={styles.section}>
            <div className={styles.header}>
                <h2 className={styles.title}>New Arrivals</h2>
                <div className={styles.line} />
                <p className={styles.subtitle}>Fresh from the sanctuary</p>
            </div>

            <div className={styles.grid}>
                {displayedProducts.map((product, index) => (
                    <Link href={`/product/${product.id}`} key={product.id}>
                        <motion.div
                            className={styles.card}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                        >
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className={styles.image}
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                                {product.stock < 1 && (
                                    <div className={styles.soldOut}>Sold Out</div>
                                )}
                            </div>
                            <div className={styles.info}>
                                <h3 className={styles.name}>{product.name}</h3>
                                <p className={styles.category}>{product.category}</p>
                                <p className={styles.price}>${product.price.toFixed(2)}</p>
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>

            <div className={styles.actions}>
                <Link href="/shop" className={styles.viewAllBtn}>View All Treasures</Link>
            </div>
        </Section>
    );
};

export default FeaturedProducts;
