"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowLeft, Star, Heart, Share2, Truck, ShieldCheck,
    ShoppingCart, ArrowRight, ChevronRight, MessageSquare,
    Send
} from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ui/ProductCard";
import { submitUserReview } from "@/lib/db";
import styles from "./page.module.css";
import { Product } from "@/types";

interface ProductDetailProps {
    product: Product;
    relatedProducts: Product[];
}

const ProductDetail = ({ product, relatedProducts }: ProductDetailProps) => {
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();
    const [isLiked, setIsLiked] = useState(false);

    // Review Form State
    const [reviewName, setReviewName] = useState("");
    const [reviewRating, setReviewRating] = useState(5);
    const [reviewComment, setReviewComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
    };

    const handleLike = () => setIsLiked(!isLiked);

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: product.name,
                    text: product.description,
                    url: window.location.href,
                });
            } catch (error) {
                console.error("Error sharing:", error);
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard! ✨");
        }
    };

    const handleReviewSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!reviewName || !reviewComment) return;

        setIsSubmitting(true);
        try {
            await submitUserReview(product.id, {
                name: reviewName,
                rating: reviewRating,
                comment: reviewComment
            });
            setSubmitted(true);
            setReviewName("");
            setReviewComment("");
            setReviewRating(5);
        } catch (error) {
            console.error("Failed to submit review:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                {/* Navigation */}
                <div className={styles.breadcrumbs}>
                    <Link href="/shop" className={styles.backLink}>
                        <ArrowLeft size={18} />
                        <span>Shop</span>
                    </Link>
                    <ChevronRight size={14} className={styles.separator} />
                    <span className={styles.current}>{product.name}</span>
                </div>

                <div className={styles.mainGrid}>
                    {/* Product Image (Left) */}
                    <motion.div
                        className={styles.gallery}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className={styles.imageMainContainer}>
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className={styles.image}
                                    priority
                                    sizes="(max-width: 992px) 100vw, 50vw"
                                />
                            </div>
                            <div className={styles.imageDecor}>
                                <div className={styles.decorCircle} />
                                <div className={styles.decorBlob} />
                            </div>
                        </div>
                    </motion.div>

                    {/* Product Info (Right) */}
                    <div className={styles.details}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div className={styles.headerInfo}>
                                <span className={styles.categoryBadge}>{product.category}</span>
                                <h1 className={styles.title}>{product.name}</h1>

                                <div className={styles.ratingSummary}>
                                    <div className={styles.stars}>
                                        {[1, 2, 3, 4, 5].map(s => (
                                            <Star
                                                key={s}
                                                size={16}
                                                fill={s <= (product.displayRating || 0) ? "#d4af37" : "none"}
                                                color={s <= (product.displayRating || 0) ? "#d4af37" : "#ddd"}
                                            />
                                        ))}
                                    </div>
                                    <span className={styles.ratingText}>{product.displayReviews || 0} Reviews</span>
                                </div>
                            </div>

                            <div className={styles.priceSection}>
                                <div className={styles.priceLabel}>Premium Artifact</div>
                                <span className={styles.price}>₹{product.price.toLocaleString('en-IN')}</span>
                            </div>

                            <div className={styles.descriptionSection}>
                                <h3 className={styles.sectionHeader}>The Vision</h3>
                                <p className={styles.descriptionText}>{product.description}</p>
                            </div>
                        </motion.div>

                        <div className={styles.actionsContainer}>
                            <div className={styles.qtyAndAdd}>
                                <div className={styles.qtyControl}>
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className={styles.qtyBtn}>-</button>
                                    <span className={styles.qtyLabel}>{quantity}</span>
                                    <button onClick={() => setQuantity(quantity + 1)} className={styles.qtyBtn}>+</button>
                                </div>

                                <button onClick={handleAddToCart} className={styles.primeCta}>
                                    <ShoppingCart size={20} />
                                    <span>Add to Cart</span>
                                </button>
                            </div>

                            <div className={styles.extraActions}>
                                <button
                                    className={`${styles.utilBtn} ${isLiked ? styles.active : ''}`}
                                    onClick={handleLike}
                                >
                                    <Heart size={22} fill={isLiked ? "#e11d48" : "none"} color={isLiked ? "#e11d48" : "currentColor"} />
                                    <span>Wishlist</span>
                                </button>
                                <button className={styles.utilBtn} onClick={handleShare}>
                                    <Share2 size={22} />
                                    <span>Share</span>
                                </button>
                            </div>
                        </div>

                        <div className={styles.luxurySignals}>
                            <div className={styles.signalItem}>
                                <div className={styles.signalIcon}><Truck size={20} /></div>
                                <div className={styles.signalContent}>
                                    <span className={styles.signalTitle}>Fast Delivery</span>
                                    <span className={styles.signalDesc}>Worldwide shipping available</span>
                                </div>
                            </div>
                            <div className={styles.signalItem}>
                                <div className={styles.signalIcon}><ShieldCheck size={20} /></div>
                                <div className={styles.signalContent}>
                                    <span className={styles.signalTitle}>Authentic Quality</span>
                                    <span className={styles.signalDesc}>Curated spiritual artifacts</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Review Section */}
                <section className={styles.reviewSection}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Customer Feedback</h2>
                        <div className={styles.sectionLine} />
                    </div>

                    <div className={styles.reviewGrid}>
                        <div className={styles.reviewFormBox}>
                            <h3 className={styles.subHeading}>Share your experience</h3>
                            {submitted ? (
                                <motion.div
                                    className={styles.successMsg}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                >
                                    <MessageSquare className={styles.successIcon} />
                                    <p>Thank you! Your feedback has been received and will be reviewed by the owner.</p>
                                    <button onClick={() => setSubmitted(false)} className={styles.resetBtn}>Write another</button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleReviewSubmit} className={styles.form}>
                                    <div className={styles.inputGroup}>
                                        <label>Your Name</label>
                                        <input
                                            type="text"
                                            value={reviewName}
                                            onChange={(e) => setReviewName(e.target.value)}
                                            placeholder="Enter your name"
                                            required
                                        />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Rating</label>
                                        <div className={styles.starInput}>
                                            {[1, 2, 3, 4, 5].map(s => (
                                                <button
                                                    key={s}
                                                    type="button"
                                                    onClick={() => setReviewRating(s)}
                                                    className={styles.starBtn}
                                                >
                                                    <Star
                                                        size={24}
                                                        fill={s <= reviewRating ? "#d4af37" : "none"}
                                                        color={s <= reviewRating ? "#d4af37" : "#ddd"}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label>Your Feedback</label>
                                        <textarea
                                            value={reviewComment}
                                            onChange={(e) => setReviewComment(e.target.value)}
                                            placeholder="What did you think of the artifact?"
                                            required
                                        />
                                    </div>
                                    <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                                        {isSubmitting ? "Submitting..." : "Send Feedback"}
                                        <Send size={16} />
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </section>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <section className={styles.relatedSection}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>Related Products</h2>
                            <Link href="/shop" className={styles.viewMore}>
                                <span>Explore More</span>
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                        <div className={styles.relatedGrid}>
                            {relatedProducts.map((p) => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default ProductDetail;
