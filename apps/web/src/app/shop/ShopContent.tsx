"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/components/ui/ProductCard";
import { Product } from "@/types";
import styles from "./ShopContent.module.css";
import { Filter, Search } from "lucide-react";

interface ShopContentProps {
    initialProducts: Product[];
}

export default function ShopContent({ initialProducts }: ShopContentProps) {
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const categories = ["All", ...Array.from(new Set(initialProducts.map(p => p.category)))];

    const filteredProducts = initialProducts.filter(product => {
        const matchesCategory = activeCategory === "All" || product.category === activeCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className={styles.shopWrapper}>
            {/* Catchy Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={styles.shopBadge}
                    >
                        CURATED COLLECTIONS
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        Elevate Your <span className={styles.italic}>Space.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Explore our full range of spiritually-aligned artifacts, each selected
                        to bring harmony and intention to your daily life.
                    </motion.p>
                </div>
            </section>

            <div className={styles.container}>
                {/* Filters & Search */}
                <div className={styles.controls}>
                    <div className={styles.categories}>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`${styles.catBtn} ${activeCategory === cat ? styles.active : ""}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className={styles.searchBox}>
                        <Search size={18} className={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Find your artifact..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Products Grid */}
                <motion.div
                    layout
                    className={styles.grid}
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProducts.map((product) => (
                            <motion.div
                                key={product.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredProducts.length === 0 && (
                    <div className={styles.noResults}>
                        <p>No artifacts match your search. Try a different path.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
