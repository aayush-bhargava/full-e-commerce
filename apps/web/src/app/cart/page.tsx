"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import styles from "./page.module.css";
import { Trash2, ArrowLeft } from "lucide-react";

// Mock cart data
const cartItems = [
    {
        id: "1",
        name: "Amethyst Cluster",
        price: 45.00,
        image: "https://images.unsplash.com/photo-1567605963240-20e3a6773305?q=80&w=2670&auto=format&fit=crop",
        quantity: 1
    },
    {
        id: "3",
        name: "Sandalwood Incense",
        price: 18.00,
        image: "https://images.unsplash.com/photo-1608552684940-8c29045ea79c?q=80&w=2574&auto=format&fit=crop",
        quantity: 2
    }
];

const CartPage = () => {
    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping: number = 0; // Free
    const total = subtotal + shipping;

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <h1 className={styles.title}>Your Sanctuary</h1>

                <div className={styles.content}>
                    <div className={styles.items}>
                        {cartItems.length === 0 ? (
                            <p>Your cart is empty.</p>
                        ) : (
                            cartItems.map((item) => (
                                <motion.div
                                    key={item.id}
                                    className={styles.item}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <div className={styles.imageWrapper}>
                                        <Image src={item.image} alt={item.name} fill className={styles.image} />
                                    </div>
                                    <div className={styles.itemDetails}>
                                        <h3 className={styles.itemName}>{item.name}</h3>
                                        <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>
                                        <div className={styles.quantityControls}>
                                            <button className={styles.control}>-</button>
                                            <span>{item.quantity}</span>
                                            <button className={styles.control}>+</button>
                                        </div>
                                    </div>
                                    <button className={styles.remove}>
                                        <Trash2 size={18} />
                                    </button>
                                </motion.div>
                            ))
                        )}
                        <Link href="/shop" className={styles.continueShopping}>
                            <ArrowLeft size={16} /> Continue Shopping
                        </Link>
                    </div>

                    <div className={styles.summary}>
                        <h2 className={styles.summaryTitle}>Summary</h2>
                        <div className={styles.summaryRow}>
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className={styles.summaryRow}>
                            <span>Shipping</span>
                            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                        </div>
                        <div className={`${styles.summaryRow} ${styles.total}`}>
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <Button size="lg" className={styles.checkoutBtn}>Proceed to Checkout</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
