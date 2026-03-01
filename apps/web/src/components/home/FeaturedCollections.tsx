"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Section from "../layout/Section";
import styles from "./FeaturedCollections.module.css";

const collections = [
    {
        id: "crystals",
        name: "Healing Crystals",
        image: "https://images.unsplash.com/photo-1610450949927-514daa3d67e4?q=80&w=2670&auto=format&fit=crop",
        link: "/collections/crystals"
    },
    {
        id: "incense",
        name: "Sacred Incense",
        image: "https://images.unsplash.com/photo-1602737667822-7772c3d0b27b?q=80&w=2669&auto=format&fit=crop",
        link: "/collections/incense"
    },
    {
        id: "jewelry",
        name: "Spiritual Jewelry",
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2670&auto=format&fit=crop",
        link: "/collections/jewelry"
    }
];

const FeaturedCollections = () => {
    return (
        <Section className={styles.section}>
            <div className={styles.header}>
                <motion.div
                    className={styles.badge}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    EXPLORE CATEGORIES
                </motion.div>
                <h2 className={styles.title}>Essential <span className={styles.italic}>Sanctuaries.</span></h2>
            </div>

            <div className={styles.grid}>
                {collections.map((collection, index) => (
                    <Link href={collection.link} key={collection.id} className={styles.link}>
                        <motion.div
                            className={styles.card}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={collection.image}
                                    alt={collection.name}
                                    fill
                                    className={styles.image}
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                                <div className={styles.overlay} />
                                <div className={styles.content}>
                                    <h3 className={styles.name}>{collection.name}</h3>
                                    <div className={styles.explore}>
                                        <span>Explore Collection</span>
                                        <div className={styles.underline} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </Section>
    );
};

export default FeaturedCollections;
