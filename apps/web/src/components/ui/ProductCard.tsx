"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Product } from "@/types";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <Link href={`/product/${product.id}`}>
            <motion.div
                className={styles.card}
                initial="rest"
                whileHover="hover"
                variants={{
                    rest: { y: 0 },
                    hover: { y: -8 }
                }}
            >
                <div className={styles.imageWrapper}>
                    <motion.div
                        variants={{
                            rest: { scale: 1 },
                            hover: { scale: 1.05 }
                        }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className={styles.imageInner}
                    >
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className={styles.image}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </motion.div>

                    <motion.div
                        className={styles.overlay}
                        variants={{
                            rest: { opacity: 0 },
                            hover: { opacity: 1 }
                        }}
                    >
                        <span className={styles.viewText}>View Product</span>
                    </motion.div>
                </div>

                <div className={styles.info}>
                    <p className={styles.category}>{product.category}</p>
                    <h3 className={styles.name}>{product.name}</h3>
                    <p className={styles.price}>${product.price.toFixed(2)}</p>
                </div>
            </motion.div>
        </Link>
    );
};

export default ProductCard;
