"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import { motion } from "framer-motion";

const BookingPage = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className={styles.page}>
                <motion.div
                    className={styles.form}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <div className="text-center py-10">
                        <h2 className="text-3xl font-serif mb-4">Request Received</h2>
                        <p className="text-stone-600 mb-8">
                            Thank you for reaching out. At WELLBEING, we review each case personally with our medical and energy specialists.
                            We will contact you within 24 hours to schedule your session.
                        </p>
                        <button
                            onClick={() => window.location.href = "/"}
                            className={styles.button}
                        >
                            Return to Homepage
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <motion.h1
                className={styles.title}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                Book a Professional Session
            </motion.h1>

            <motion.div
                className={styles.form}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <form onSubmit={handleSubmit}>
                    <div className={styles.grid}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Full Name</label>
                            <input type="text" required className={styles.input} placeholder="Enter your name" />
                        </div>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Email Address</label>
                            <input type="email" required className={styles.input} placeholder="your@email.com" />
                        </div>
                        <div className={styles.inputGroup + " " + styles.fullWidth}>
                            <label className={styles.label}>Service Required</label>
                            <select className={styles.select} required>
                                <option value="">Select a service</option>
                                <option value="pranic">Advanced Pranic Healing</option>
                                <option value="neuro">Neurological Consultation</option>
                                <option value="combined">Neuro-Spiritual Synthesis</option>
                                <option value="hometour">Healing Space Home Tour</option>
                            </select>
                        </div>
                        <div className={styles.inputGroup + " " + styles.fullWidth}>
                            <label className={styles.label}>Additional Information (Optional)</label>
                            <textarea
                                className={styles.textarea}
                                rows={5}
                                placeholder="Tell us about your requirements or health history..."
                            ></textarea>
                        </div>
                    </div>
                    <button type="submit" className={styles.button}>
                        Submit Booking Request
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default BookingPage;
