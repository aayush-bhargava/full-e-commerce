"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Section from "@/components/layout/Section";
import styles from "./page.module.css";

const AboutPage = () => {
    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <motion.h1
                    className={styles.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Our Story
                </motion.h1>
            </header>

            <Section className={styles.section}>
                <div className={styles.textBlock}>
                    <h2 className={styles.subtitle}>Beginning with Intention</h2>
                    <p>
                        Lumina was born from a desire to connect people with the earth's ancient wisdom.
                        In a fast-paced world, we believe in slowing down and finding the divine in the everyday.
                    </p>
                    <p>
                        Every crystal, mala, and artifact in our collection is hand-selected for its energetic purity and aesthetic beauty.
                    </p>
                </div>
                <div className={styles.imageBlock}>
                    <div className={styles.imageWrapper}>
                        <Image
                            src="https://images.unsplash.com/photo-1518557363403-4f938092fb14?q=80&w=2670&auto=format&fit=crop"
                            alt="Meditation space"
                            fill
                            className={styles.image}
                        />
                    </div>
                </div>
            </Section>

            <Section className={`${styles.section} ${styles.reverse}`}>
                <div className={styles.textBlock}>
                    <h2 className={styles.subtitle}>Conscious Sourcing</h2>
                    <p>
                        We work directly with artisans and miners who respect the land and their craft.
                        Sustainability is not just a buzzword for us; it is a spiritual practice of honoring the interconnectedness of all life.
                    </p>
                </div>
                <div className={styles.imageBlock}>
                    <div className={styles.imageWrapper}>
                        <Image
                            src="https://images.unsplash.com/photo-1602737667822-7772c3d0b27b?q=80&w=2669&auto=format&fit=crop"
                            alt="Artisan crafting"
                            fill
                            className={styles.image}
                        />
                    </div>
                </div>
            </Section>
        </div>
    );
};

export default AboutPage;
