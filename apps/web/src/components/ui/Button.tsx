"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import styles from "./Button.module.css";

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: "primary" | "secondary" | "outline";
    size?: "sm" | "md" | "lg" | "xl";
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
    variant = "primary",
    size = "md",
    children,
    className = "",
    ...props
}) => {
    return (
        <motion.button
            className={`${styles.button} ${styles[variant]} ${styles[size]} ${className}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial="initial"
            animate="animate"
            {...props}
        >
            <span className={styles.content}>{children}</span>
            {variant === "primary" && (
                <motion.span
                    className={styles.glow}
                    variants={{
                        initial: { opacity: 0 },
                        animate: { opacity: [0, 0.5, 0], transition: { duration: 3, repeat: Infinity } },
                    }}
                />
            )}
        </motion.button>
    );
};

export default Button;
