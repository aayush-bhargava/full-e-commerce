"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import styles from "./page.module.css";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { Truck, ShieldCheck, CheckCircle2, MessageSquare } from "lucide-react";
import { createOrder } from "@/lib/db";
import AuthGuard from "@/components/auth/AuthGuard";
import { useAuth } from "@/context/AuthContext";

export default function CheckoutPage() {
    const { cartItems, subtotal, clearCart } = useCart();
    const { user } = useAuth();
    const [isSuccess, setIsSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const shipping = 0;
    const total = subtotal + shipping;

    const handleCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const firstName = formData.get("firstName") as string;
        const lastName = formData.get("lastName") as string;
        const email = formData.get("email") as string;
        const phone = formData.get("phone") as string;
        const address = formData.get("address") as string;
        const city = formData.get("city") as string;
        const pincode = formData.get("pincode") as string;

        try {
            // 1. Create Order in Database
            await createOrder({
                customer: `${firstName} ${lastName}`,
                email: email,
                address: address,
                city: city,
                pincode: pincode,
                total,
                status: 'Processing',
                paymentMethod: 'whatsapp',
                items: cartItems.map(item => ({
                    productId: item.id,
                    quantity: item.quantity,
                    price: item.price,
                    name: item.name
                }))
            });

            // 2. Generate WhatsApp Message
            const ownerNumber = process.env.NEXT_PUBLIC_OWNER_WHATSAPP_NUMBER || "919876543210";
            const itemsList = cartItems.map(item => `- ${item.name} (x${item.quantity})`).join('\n');
            const message = `Hi! I just placed an order on WELLBEING.\n\n*Order Details:*\n${itemsList}\n*Total:* ₹${total}\n\n*Customer Details:*\nName: ${firstName} ${lastName}\nPhone: ${phone}\nAddress: ${address}, ${city} - ${pincode}\n\nPlease confirm my order!`;

            const whatsappUrl = `https://wa.me/${ownerNumber}?text=${encodeURIComponent(message)}`;

            // 3. Clear Cart and Show Success
            clearCart();
            setIsSuccess(true);
            setIsSubmitting(false);

            // 4. Redirect to WhatsApp (open in new tab)
            window.open(whatsappUrl, '_blank');

        } catch (error: any) {
            console.error("Checkout failed:", error);
            setIsSubmitting(false);
            alert("Something went wrong. Please try again.");
        }
    };

    if (isSuccess) {
        return (
            <div className={styles.successContainer}>
                <div className={styles.successCard}>
                    <CheckCircle2 size={64} className={styles.successIcon} />
                    <h1>Order Request Sent!</h1>
                    <p>We've received your order request and opened WhatsApp to connect with you.</p>
                    <p className={styles.successSubtext}>The owner will contact you shortly to confirm the payment and delivery.</p>
                    <Link href="/">
                        <Button size="lg" className={styles.homeBtn}>Return to Gallery</Button>
                    </Link>
                </div>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className={styles.emptyContainer}>
                <p>Your cart is empty.</p>
                <Link href="/shop">
                    <Button variant="outline">Back to Shop</Button>
                </Link>
            </div>
        );
    }

    return (
        <AuthGuard>
            <div className={styles.pageWrapper}>
                <div className={styles.container}>
                    <div className={styles.checkoutGrid}>
                        {/* Form Section */}
                        <div className={styles.formSection}>
                            <h1 className={styles.title}>Checkout</h1>

                            <form className={styles.form} onSubmit={handleCheckout}>
                                <section className={styles.section}>
                                    <h2 className={styles.sectionTitle}>Contact Information</h2>
                                    <div className={styles.inputGroup}>
                                        <div className={styles.inputWrapper}>
                                            <label>First Name</label>
                                            <input type="text" name="firstName" required className={styles.input} defaultValue={user?.name?.split(' ')[0]} />
                                        </div>
                                        <div className={styles.inputWrapper}>
                                            <label>Last Name</label>
                                            <input type="text" name="lastName" required className={styles.input} defaultValue={user?.name?.split(' ')[1]} />
                                        </div>
                                    </div>
                                    <div className={styles.inputWrapper}>
                                        <label>Email Address</label>
                                        <input type="email" name="email" required className={styles.input} defaultValue={user?.email} />
                                    </div>
                                    <div className={styles.inputWrapper}>
                                        <label>Phone Number</label>
                                        <input type="tel" name="phone" required className={styles.input} placeholder="e.g., +91 98765 43210" />
                                    </div>
                                </section>

                                <section className={styles.section}>
                                    <h2 className={styles.sectionTitle}>Shipping Address</h2>
                                    <div className={styles.inputWrapper}>
                                        <label>Street Address</label>
                                        <input type="text" name="address" required className={styles.input} placeholder="House No, Building, Street Name" />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <div className={styles.inputWrapper}>
                                            <label>City</label>
                                            <input type="text" name="city" required className={styles.input} />
                                        </div>
                                        <div className={styles.inputWrapper}>
                                            <label>Pincode</label>
                                            <input type="text" name="pincode" required className={styles.input} />
                                        </div>
                                    </div>
                                </section>

                                <div className={styles.confirmNotice}>
                                    <MessageSquare size={18} className="text-green-600" />
                                    <p>Clicking "Confirm Order" will open WhatsApp to notify the owner instantly.</p>
                                </div>

                                <Button
                                    type="submit"
                                    size="lg"
                                    fullWidth
                                    className={styles.submitBtn}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Processing..." : "Confirm via WhatsApp"}
                                </Button>
                            </form>
                        </div>

                        {/* Order Summary */}
                        <div className={styles.summarySection}>
                            <div className={styles.summaryCard}>
                                <h2 className={styles.summaryTitle}>Order Summary</h2>
                                <div className={styles.itemList}>
                                    {cartItems.map((item) => (
                                        <div key={item.id} className={styles.item}>
                                            <div className={styles.itemInfo}>
                                                <span className={styles.itemName}>{item.name}</span>
                                                <span className={styles.itemQty}>Qty: {item.quantity}</span>
                                            </div>
                                            <span className={styles.itemPrice}>₹{(item.price * item.quantity).toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className={styles.divider} />

                                <div className={styles.totals}>
                                    <div className={styles.totalRow}>
                                        <span>Subtotal</span>
                                        <span>₹{subtotal.toLocaleString()}</span>
                                    </div>
                                    <div className={styles.totalRow}>
                                        <span>Shipping</span>
                                        <span className={styles.free}>FREE</span>
                                    </div>
                                    <div className={styles.grandTotal}>
                                        <span>Total</span>
                                        <span>₹{total.toLocaleString()}</span>
                                    </div>
                                </div>

                                <div className={styles.trustSignals}>
                                    <div className={styles.trustItem}>
                                        <Truck size={18} />
                                        <span>Fast, Secure Delivery</span>
                                    </div>
                                    <div className={styles.trustItem}>
                                        <ShieldCheck size={18} />
                                        <span>Direct Contact Confirmation</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthGuard>
    );
}
