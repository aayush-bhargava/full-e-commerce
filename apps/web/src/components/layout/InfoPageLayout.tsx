"use client";

import React from "react";
import styles from "./InfoPageLayout.module.css";
import { motion } from "framer-motion";

interface InfoPageLayoutProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
}

const InfoPageLayout = ({ title, subtitle, children }: InfoPageLayoutProps) => {
    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <motion.header
                    className={styles.header}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className={styles.title}>{title}</h1>
                    {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
                    <div className={styles.divider} />
                </motion.header>

                <motion.main
                    className={styles.content}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className={styles.paper}>
                        {children}
                    </div>
                </motion.main>
            </div>
        </div>
    );
};

export default InfoPageLayout;
