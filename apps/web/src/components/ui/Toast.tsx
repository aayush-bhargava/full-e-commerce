"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import styles from "./Toast.module.css";

interface ToastProps {
    message: string;
    isVisible: boolean;
}

const Toast: React.FC<ToastProps> = ({ message, isVisible }) => {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                    className={styles.toast}
                >
                    <div className={styles.icon}>
                        <Sparkles size={16} />
                    </div>
                    <span className={styles.message}>{message}</span>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Toast;
