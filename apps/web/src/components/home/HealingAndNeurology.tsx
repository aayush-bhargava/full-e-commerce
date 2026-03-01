"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Section from "../layout/Section";
import styles from "./HealingAndNeurology.module.css";
import Link from "next/link";
import { Brain, Sparkles, Home, ShieldCheck, Activity } from "lucide-react";

const HealingAndNeurology = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

    const services = [
        {
            icon: <Activity className="text-pink-500" size={24} />,
            title: "Advanced Pranic Healing",
            text: "No-touch energy therapy to accelerate the body's innate ability to heal. Specialized in physical and emotional ailments."
        },
        {
            icon: <Brain className="text-purple-500" size={24} />,
            title: "Neurological Insights",
            text: "Science-backed neurological guidance bridging the gap between brain health and spiritual well-being."
        },
        {
            icon: <Home className="text-indigo-400" size={24} />,
            title: "Healing Space Home Tour",
            text: "A unique experience where science meets sacred geometry to create a high-vibrational living environment."
        },
        {
            icon: <ShieldCheck className="text-rose-400" size={24} />,
            title: "Neuro-Cognitive Wellness",
            text: "Paid consultations for memory enhancement, focus, and spiritual alignment through neurological lens."
        }
    ];

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
                        THE WELLBEING METHOD
                    </motion.div>

                    <motion.h2
                        className={styles.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Bridging Ancient Wisdom & <br /><span className={styles.italic}>Modern Neurology.</span>
                    </motion.h2>

                    <motion.p
                        className={styles.description}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        Experience the powerful synergy of <em>Clinical Neurology</em> and <em>Pranic Healing</em>.
                        At WELLBEING, we provide a holistic approach that synchronizes
                        synapses and chakras for profound restoration.
                    </motion.p>

                    <div className={styles.servicesGrid}>
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                className={styles.serviceCard}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.1 * index }}
                            >
                                <div className={styles.serviceIcon}>
                                    {service.icon}
                                </div>
                                <h3 className={styles.serviceTitle}>{service.title}</h3>
                                <p className={styles.serviceText}>{service.text}</p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        className={styles.actions}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <Link href="/services/book" className={styles.primaryButton}>
                            Book Consultation
                        </Link>
                        <Link href="/about" className={styles.secondaryButton}>
                            Our Philosophy
                        </Link>
                    </motion.div>
                </div>

                <div className={styles.imageContainer}>
                    <motion.div style={{ y }} className={styles.parallaxWrapper}>
                        <Image
                            src="https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=2671&auto=format&fit=crop"
                            alt="Neurology and Healing"
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

export default HealingAndNeurology;
