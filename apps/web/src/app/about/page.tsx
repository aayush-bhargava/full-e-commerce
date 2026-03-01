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
                    The WELLBEING <span className={styles.italic}>Promise.</span>
                </motion.h1>
            </header>

            <Section className={styles.section}>
                <div className={styles.textBlock}>
                    <h2 className={styles.subtitle}>Science Meets Spirit</h2>
                    <p>

                        Welcome. I am a Suchita, Clinical Neurologist and <em>Advanced Pranic Healer</em> dedicated to
                        bridging the gap between modern medical science and ancient energy healing.
                    </p>
                    <p>
                        My journey began learning the new technologies in Pranic Healing in Alwar, Rajasthan, where I studied the intricacies
                        of the human brain. However, I soon realized that true well-being requires more than just
                        neurological health—it requires the alignment of the subtle energy bodies.
                    </p>
                </div>
                <div className={styles.imageBlock}>
                    <div className={styles.imageWrapper}>
                        <Image
                            src="https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=2671&auto=format&fit=crop"
                            alt="Neurological science"
                            fill
                            className={styles.image}
                        />
                    </div>
                </div>
            </Section>

            <Section className={`${styles.section} ${styles.reverse}`}>
                <div className={styles.textBlock}>
                    <h2 className={styles.subtitle}>Advanced Pranic Healing</h2>
                    <p>
                        Pranic Healing is a highly developed and tested system of energy medicine that uses
                        <em> prana</em> to balance, harmonize and transform the body's energy processes.
                    </p>
                    <p>
                        By combining my knowledge of the nervous system with therapeutic energy work,
                        I offer a unique synthesis that accelerates recovery, enhances cognitive clarity,
                        and deepens spiritual connection.
                    </p>
                </div>
                <div className={styles.imageBlock}>
                    <div className={styles.imageWrapper}>
                        <Image
                            src="https://images.unsplash.com/photo-1515023115689-589c33041697?q=80&w=2670&auto=format&fit=crop"
                            alt="Energy healing"
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
