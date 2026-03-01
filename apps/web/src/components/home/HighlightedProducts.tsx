"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Activity } from "lucide-react";
import styles from "./HighlightedProducts.module.css";

const MOCK_HIGHLIGHTS = [
    {
        id: 1,
        name: "Amethyst Cathedral",
        category: "Crystals",
        price: "₹299",
        image: "https://images.unsplash.com/photo-1567653418876-5bb0e566e1c2?q=80&w=2000&auto=format&fit=crop",
        description: "A stunning natural amethyst cathedral to bring peace and serenity to your shop."
    },
    {
        id: 2,
        name: "Zen Meditation Mala",
        category: "Accessories",
        price: "₹85",
        image: "https://images.unsplash.com/photo-1634255762696-26e6d1134293?q=80&w=2000&auto=format&fit=crop",
        description: "Hand-knotted 108 sandalwood beads for grounded meditation and mindfulness practice."
    }
];

const HighlightedProducts = () => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.badge}>
                        <Activity size={16} />
                        <span>PRIVATE COLLECTION</span>
                    </div>
                    <h2 className={styles.title}>Essential <span className={styles.italic}>Highlights.</span></h2>
                    <p className={styles.subtitle}>Our most cherished artifacts, selected for their extraordinary energy and craftsmanship.</p>
                </div>

                <div className={styles.grid}>
                    {MOCK_HIGHLIGHTS.map((product, index) => (
                        <motion.div
                            key={product.id}
                            className={`${styles.card} ${index % 2 !== 0 ? styles.reverse : ""}`}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                        >
                            <div className={styles.imageSection}>
                                <div className={styles.imageWrapper}>
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className={styles.image}
                                    />
                                    <div className={styles.imageOverlay} />
                                </div>
                            </div>
                            <div className={styles.contentSection}>
                                <span className={styles.category}>{product.category}</span>
                                <h3 className={styles.productName}>{product.name}</h3>
                                <p className={styles.description}>{product.description}</p>
                                <div className={styles.footer}>
                                    <span className={styles.price}>{product.price}</span>
                                    <Link href={`/product/${product.id}`} className={styles.cta}>
                                        View Details
                                        <ArrowRight size={18} />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HighlightedProducts;
