"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import styles from "./Header.module.css";

const navLinks = [
    { name: "Shop", href: "/shop" },
    { name: "Collections", href: "/collections" },
    { name: "About", href: "/about" },
    { name: "Journal", href: "/journal" },
];

const Header = () => {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    return (
        <motion.header
            className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className={styles.container}>
                <div className={styles.left}>
                    <button
                        className={styles.mobileToggle}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                    <nav className={styles.desktopNav}>
                        {navLinks.map((link) => (
                            <Link key={link.name} href={link.href} className={styles.navLink}>
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className={styles.center}>
                    <Link href="/" className={styles.logo}>
                        WELLBEING
                    </Link>
                </div>

                <div className={styles.right}>
                    <button className={styles.iconButton}>
                        <Search size={20} />
                    </button>
                    <Link href="/cart" className={styles.iconButton}>
                        <ShoppingBag size={20} />
                        <span className={styles.cartCount}>0</span>
                    </Link>
                </div>
            </div>

            {/* Mobile Menu */}
            <motion.div
                className={styles.mobileMenu}
                initial="closed"
                animate={isMobileMenuOpen ? "open" : "closed"}
                variants={{
                    open: { opacity: 1, pointerEvents: "auto", y: 0 },
                    closed: { opacity: 0, pointerEvents: "none", y: -20 },
                }}
            >
                <nav className={styles.mobileNav}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={styles.mobileNavLink}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>
            </motion.div>
        </motion.header>
    );
};

export default Header;
