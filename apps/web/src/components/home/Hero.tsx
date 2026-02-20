"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "../ui/Button";
import styles from "./Hero.module.css";

const Hero = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <section className={styles.hero}>
            <div className={styles.background}>
                <div className={styles.blob1} />
                <div className={styles.blob2} />
                <div className={styles.overlay} />
            </div>

            <div className={styles.content}>
                <motion.div style={{ y: y2, opacity }} className={styles.textWrapper}>
                    <motion.h1
                        className={styles.title}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        Align Your Energy.
                        <br />
                        <span className={styles.highlight}>Elevate Your Spirit.</span>
                    </motion.h1>

                    <motion.p
                        className={styles.subtitle}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                    >
                        Curated artifacts for mindfulness, healing, and divine connection.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                    >
                        <Button size="lg" variant="primary">Shop Collection</Button>
                    </motion.div>
                </motion.div>
            </div>

            <motion.div
                className={styles.scrollIndicator}
                style={{ opacity }}
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
                <span className={styles.scrollText}>Scroll to Explore</span>
                <div className={styles.line} />
            </motion.div>
        </section>
    );
};

export default Hero;
