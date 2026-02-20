import React from "react";
import Link from "next/link";
import styles from "./Footer.module.css";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.top}>
                    <div className={styles.brand}>
                        <h3 className={styles.logo}>LUMINA</h3>
                        <p className={styles.tagline}>Align Your Energy. Elevate Your Spirit.</p>
                    </div>

                    <div className={styles.links}>
                        <div className={styles.column}>
                            <h4>Shop</h4>
                            <Link href="/shop">All Products</Link>
                            <Link href="/collections/crystals">Crystals</Link>
                            <Link href="/collections/incense">Incense</Link>
                            <Link href="/collections/jewelry">Jewelry</Link>
                        </div>

                        <div className={styles.column}>
                            <h4>Support</h4>
                            <Link href="/faq">FAQ</Link>
                            <Link href="/shipping">Shipping & Returns</Link>
                            <Link href="/contact">Contact Us</Link>
                        </div>

                        <div className={styles.column}>
                            <h4>Company</h4>
                            <Link href="/about">Our Story</Link>
                            <Link href="/journal">Journal</Link>
                            <Link href="/sustainability">Sustainability</Link>
                        </div>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p>&copy; {new Date().getFullYear()} Lumina. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
