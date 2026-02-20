import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Star, Heart, Share2, Truck, ShieldCheck, RefreshCw } from "lucide-react";
import { getProductById } from "@/lib/db";
import styles from "./page.module.css";

interface PageProps {
    params: Promise<{ id: string }>;
}

const ProductPage = async ({ params }: PageProps) => {
    const { id } = await params;
    const product = await getProductById(id);

    if (!product) {
        notFound();
    }

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <Link href="/shop" className={styles.backLink}>
                    <ArrowLeft size={20} />
                    <span>Back to Shop</span>
                </Link>

                <div className={styles.grid}>
                    <div className={styles.imageSection}>
                        <div className={styles.imageWrapper}>
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className={styles.image}
                                priority
                            />
                        </div>
                    </div>

                    <div className={styles.infoSection}>
                        <div className={styles.header}>
                            <h1 className={styles.title}>{product.name}</h1>
                            <div className={styles.priceRow}>
                                <span className={styles.price}>${product.price.toFixed(2)}</span>
                                <div className={styles.rating}>
                                    <Star size={16} fill="currentColor" className={styles.star} />
                                    <span>4.9 (128 reviews)</span>
                                </div>
                            </div>
                        </div>

                        <p className={styles.description}>{product.description}</p>

                        {product.benefits && product.benefits.length > 0 && (
                            <div className={styles.benefits}>
                                <h3 className={styles.sectionTitle}>Benefits</h3>
                                <ul className={styles.benefitList}>
                                    {product.benefits.map((benefit, index) => (
                                        <li key={index} className={styles.benefitItem}>
                                            <span className={styles.dot} />
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {product.chakra && (
                            <div className={styles.chakraInfo}>
                                <h3 className={styles.sectionTitle}>Chakra Alignment</h3>
                                <div className={styles.chakraTag}>{product.chakra} Chakra</div>
                                <p className="text-sm text-stone-600 mt-2">Aligns with the {product.chakra} energy center to promote balance and flow.</p>
                            </div>
                        )}

                        <div className={styles.actions}>
                            <button className={styles.addToCart}>Add to Cart</button>
                            <button className={styles.wishlist}>
                                <Heart size={20} />
                            </button>
                            <button className={styles.share}>
                                <Share2 size={20} />
                            </button>
                        </div>

                        <div className={styles.features}>
                            <div className={styles.feature}>
                                <Truck size={20} />
                                <span>Free Shipping over $100</span>
                            </div>
                            <div className={styles.feature}>
                                <ShieldCheck size={20} />
                                <span>Authenticity Guaranteed</span>
                            </div>
                            <div className={styles.feature}>
                                <RefreshCw size={20} />
                                <span>30-Day Returns</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
