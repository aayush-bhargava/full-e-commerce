"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Button from "../ui/Button";
import styles from "./Hero.module.css";

const Hero = () => {
    const { scrollY } = useScroll();
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);
    const scale = useTransform(scrollY, [0, 400], [1, 0.95]);
    const y = useTransform(scrollY, [0, 400], [0, 100]);

    return (
        <section className={styles.hero}>
            <div className={styles.gradientBg} />

            <motion.div
                className={styles.container}
                style={{ opacity, scale, y }}
            >
                <div className={styles.content}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className={styles.badge}
                    >
                        TRANSFORM YOUR ESSENCE
                    </motion.div>

                    <motion.h1
                        className={styles.title}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        Artistry for <br />
                        <span className={styles.italic}>The Soul.</span>
                    </motion.h1>

                    <motion.p
                        className={styles.subtitle}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                        Discover a shop of curated artifacts designed to harmonize your
                        inner space and elevate your daily existence to a state of pure wellbeing.
                    </motion.p>

                    <motion.div
                        className={styles.actions}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <Link href="/shop">
                            <Button size="xl" variant="primary">Explore Shop</Button>
                        </Link>
                        <Link href="/about">
                            <Button size="xl" variant="outline">Our Philosophy</Button>
                        </Link>
                    </motion.div>
                </div>
            </motion.div>

            <motion.div
                className={styles.decorativeElement}
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 5, 0]
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
        </section>
    );
};

export default Hero;
