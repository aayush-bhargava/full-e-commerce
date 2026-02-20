"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Section from "../layout/Section";
import styles from "./SacredRitual.module.css";
import Link from "next/link";

const SacredRitual = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <Section className={styles.section}>
            <div className={styles.container} ref={ref}>
                <div className={styles.content}>
                    <motion.div
                        className={styles.label}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Daily Practice
                    </motion.div>

                    <motion.h2
                        className={styles.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        The Morning Awakening Ritual
                    </motion.h2>

                    <motion.p
                        className={styles.description}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        Begin your day with intention. Light our <em>Sacred Sage</em> incense to cleanse the space,
                        hold your <em>Amethyst Cluster</em> to align your third eye, and set a powerful affirmation
                        for the journey ahead. Small moments of mindfulness create ripples of peace throughout your day.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <Link href="/collections/rituals" className={styles.button}>
                            Explore Ritual Kits
                        </Link>
                    </motion.div>
                </div>

                <div className={styles.imageContainer}>
                    <motion.div style={{ y }} className={styles.parallaxWrapper}>
                        <Image
                            src="https://images.unsplash.com/photo-1515023115689-589c33041697?q=80&w=2670&auto=format&fit=crop"
                            alt="Sacred Ritual Setup"
                            fill
                            className={styles.image}
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </motion.div>
                    <div className={styles.decoration}></div>
                </div>
            </div>
        </Section>
    );
};

export default SacredRitual;
