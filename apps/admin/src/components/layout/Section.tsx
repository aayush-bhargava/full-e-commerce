"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SectionProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

const Section: React.FC<SectionProps> = ({ children, className = "", delay = 0 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.section
            ref={ref}
            className={className}
            initial={{ opacity: 0, y: 30, filter: "blur(5px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
        >
            {children}
        </motion.section>
    );
};

export default Section;
