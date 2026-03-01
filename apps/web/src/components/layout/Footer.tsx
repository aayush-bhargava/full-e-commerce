'use client';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Activity, Sparkles, Heart, Hexagon } from "lucide-react";
import { getSettings, Settings } from "@/lib/db";
import styles from "./Footer.module.css";
import Image from "next/image";

const Footer = () => {
    const [settings, setSettings] = useState<Settings | null>(null);

    useEffect(() => {
        const loadSettings = async () => {
            const data = await getSettings();
            setSettings(data);
        };
        loadSettings();
    }, []);

    const renderLogo = () => {
        if (!settings) return null;

        if (settings.logoUrl) {
            return (
                <div className={styles.logoImageWrapper}>
                    <Image
                        src={settings.logoUrl}
                        alt={settings.brandName}
                        width={32}
                        height={32}
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
        return <Icon className={styles.logoIcon} size={20} />;
    };

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.top}>
                    <div className={styles.brand}>
                        <div className={styles.logoWrapper}>
                            {renderLogo()}
                            <h3 className={styles.logo}>{settings?.brandName || "WELLBEING"}</h3>
                        </div>
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
                            <Link href="/sustainability">Sustainability</Link>
                        </div>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p>&copy; {new Date().getFullYear()} {settings?.brandName || "WELLBEING"}. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
