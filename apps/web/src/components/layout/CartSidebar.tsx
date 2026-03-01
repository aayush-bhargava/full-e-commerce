"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import styles from "./CartSidebar.module.css";
import Image from "next/image";
import Link from "next/link";

export default function CartSidebar() {
    const { cartItems, isCartOpen, toggleCart, removeFromCart, updateQuantity, subtotal } = useCart();

    // Body scroll lock
    React.useEffect(() => {
        if (isCartOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isCartOpen]);

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                        className={styles.backdrop}
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className={styles.sidebar}
                    >
                        <div className={styles.header}>
                            <div className={styles.headerTitle}>
                                <ShoppingBag size={20} />
                                <h2>Your Shop</h2>
                            </div>
                            <button onClick={toggleCart} className={styles.closeBtn}>
                                <X size={24} />
                            </button>
                        </div>

                        <div className={styles.content}>
                            {cartItems.length === 0 ? (
                                <div className={styles.empty}>
                                    <p>Your cart is empty.</p>
                                    <button onClick={toggleCart} className={styles.shopLink}>
                                        Explore Collections
                                    </button>
                                </div>
                            ) : (
                                <div className={styles.itemList}>
                                    {cartItems.map((item) => (
                                        <div key={item.id} className={styles.item}>
                                            <div className={styles.itemImage}>
                                                <Image src={item.image} alt={item.name} fill />
                                            </div>
                                            <div className={styles.itemInfo}>
                                                <h3>{item.name}</h3>
                                                <p className={styles.itemPrice}>₹{item.price.toFixed(2)}</p>
                                                <div className={styles.controls}>
                                                    <div className={styles.quantity}>
                                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                                            <Minus size={14} />
                                                        </button>
                                                        <span>{item.quantity}</span>
                                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                                            <Plus size={14} />
                                                        </button>
                                                    </div>
                                                    <button onClick={() => removeFromCart(item.id)} className={styles.removeBtn}>
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {cartItems.length > 0 && (
                            <div className={styles.footer}>
                                <div className={styles.subtotal}>
                                    <span>Subtotal</span>
                                    <span>₹{subtotal.toFixed(2)}</span>
                                </div>
                                <p className={styles.taxNote}>Taxes and shipping calculated at checkout.</p>
                                <Link href="/cart" onClick={toggleCart} className={styles.cartLink}>
                                    View Shopping Bag
                                </Link>
                                <Link href="/checkout" onClick={toggleCart} className={styles.checkoutBtn}>
                                    Checkout Now
                                    <ArrowRight size={18} />
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
