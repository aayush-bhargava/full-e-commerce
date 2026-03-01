"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { ShoppingBag, Search, Menu, X, Activity, Sparkles, Heart, Hexagon, User as UserIcon, LogOut } from "lucide-react";
import { getSettings, Settings } from "@/lib/db";
import styles from "./Header.module.css";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
    { name: "Shop", href: "/shop" },
    { name: "Collections", href: "/collections" },
    { name: "About", href: "/about" },
];

const Header = () => {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [settings, setSettings] = useState<Settings | null>(null);
    const { toggleCart, totalItems } = useCart();
    const { user, logout } = useAuth();

    useEffect(() => {
        const loadSettings = async () => {
            const data = await getSettings();
            setSettings(data);
        };
        loadSettings();
    }, []);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    const renderLogo = () => {
        if (!settings) return null;

        if (settings.logoUrl) {
            return (
                <div className={styles.logoImageWrapper}>
                    <Image
                        src={settings.logoUrl}
                        alt={settings.brandName}
                        width={40}
                        height={40}
                        className={styles.logoImage}
                    />
                </div>
            );
        }

        const IconMap: any = {
            Activity,
            Sparkles,
            Heart,
            Hexagon
        };

        const Icon = IconMap[settings.logoIcon] || Activity;
        return <Icon className={styles.logoIcon} size={24} />;
    };

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
                        {renderLogo()}
                        <span>{settings?.brandName || "WELLBEING"}</span>
                    </Link>
                </div>

                <div className={styles.right}>
                    <button className={styles.iconButton}>
                        <Search size={20} />
                    </button>

                    <div className={styles.authSection}>
                        {user ? (
                            <div className={styles.userMenuWrapper}>
                                <button
                                    className={styles.iconButton}
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                >
                                    <UserIcon size={20} />
                                </button>
                                <AnimatePresence>
                                    {isUserMenuOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            className={styles.userDropdown}
                                        >
                                            <div className={styles.userInfo}>
                                                <span className={styles.userName}>{user.name}</span>
                                                <span className={styles.userEmail}>{user.email}</span>
                                            </div>
                                            <div className={styles.dropdownDivider} />
                                            <button
                                                className={styles.logoutBtn}
                                                onClick={() => {
                                                    logout();
                                                    setIsUserMenuOpen(false);
                                                }}
                                            >
                                                <LogOut size={16} />
                                                Logout
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <div className={styles.authLinks}>
                                <Link href="/login" className={styles.loginLink}>Sign In</Link>
                                <Link href="/signup" className={styles.signupBtn}>Join</Link>
                            </div>
                        )}
                    </div>

                    <button onClick={toggleCart} className={styles.iconButton}>
                        <ShoppingBag size={20} />
                        {totalItems > 0 && <span className={styles.cartCount}>{totalItems}</span>}
                    </button>
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
                    {!user && (
                        <div className={styles.mobileAuth}>
                            <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>Sign In</Link>
                            <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>Join Now</Link>
                        </div>
                    )}
                </nav>
            </motion.div>
        </motion.header>
    );
};

export default Header;
