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
        image: "https://images.unsplash.com/photo-1610450949927-514daa3d67e4?q=80&w=2670&auto=format&fit=crop", // Placeholder
        link: "/collections/crystals"
    },
    {
        id: "incense",
        name: "Sacred Incense",
        image: "https://images.unsplash.com/photo-1602737667822-7772c3d0b27b?q=80&w=2669&auto=format&fit=crop", // Placeholder
        link: "/collections/incense"
    },
    {
        id: "jewelry",
        name: "Spiritual Jewelry",
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2670&auto=format&fit=crop", // Placeholder
        link: "/collections/jewelry"
    }
];

const FeaturedCollections = () => {
    return (
        <Section className={styles.section}>
            <div className={styles.header}>
                <h2 className={styles.title}>Curated Collections</h2>
                <div className={styles.line} />
            </div>

            <div className={styles.grid}>
                {collections.map((collection, index) => (
                    <Link href={collection.link} key={collection.id}>
                        <motion.div
                            className={styles.card}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            whileHover={{ y: -5 }}
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
                                <h3 className={styles.name}>{collection.name}</h3>
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </Section>
    );
};

export default FeaturedCollections;
