"use client";

import React from "react";
import { motion } from "framer-motion";
import Section from "../layout/Section";
import styles from "./Testimonials.module.css";
import { Star } from "lucide-react";

const testimonials = [
    {
        id: 1,
        text: "The energy from the amethyst cluster I ordered is palpable. It has truly transformed my meditation space.",
        author: "Elena R.",
        role: "Mindfulness Coach"
    },
    {
        id: 2,
        text: "I love the attention to detail in the packaging. Unboxing felt like a sacred ritual in itself.",
        author: "Sarah M.",
        role: "Yoga Instructor"
    },
    {
        id: 3,
        text: "Lumina's products are not just objects; they are tools for higher alignment. Highly recommended.",
        author: "David K.",
        role: "Healer"
    }
];

const Testimonials = () => {
    return (
        <Section className={styles.section}>
            <div className={styles.container}>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <h2 className={styles.title}>Voices of Light</h2>
                    <div className={styles.grid}>
                        {testimonials.map((t, i) => (
                            <motion.div
                                key={t.id}
                                className={styles.card}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.2 }}
                                viewport={{ once: true }}
                            >
                                <div className={styles.stars}>
                                    {[...Array(5)].map((_, idx) => (
                                        <Star key={idx} size={16} fill="currentColor" className={styles.star} />
                                    ))}
                                </div>
                                <p className={styles.text}>"{t.text}"</p>
                                <div className={styles.author}>
                                    <p className={styles.name}>{t.author}</p>
                                    <p className={styles.role}>{t.role}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </Section>
    );
};

export default Testimonials;
