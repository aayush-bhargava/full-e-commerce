"use client";

import React from "react";
import InfoPageLayout from "@/components/layout/InfoPageLayout";
import styles from "./page.module.css";
import { Send, Phone, Mail, MapPin } from "lucide-react";

const ContactPage = () => {
    return (
        <InfoPageLayout title="Contact Us" subtitle="Get in Touch">
            <div className={styles.contactGrid}>
                <div className={styles.infoCol}>
                    <div className={styles.infoBox}>
                        <div className={styles.iconCircle}><Phone size={20} /></div>
                        <div>
                            <h3>Call Us</h3>
                            <p>+91 98765 43210</p>
                        </div>
                    </div>
                    <div className={styles.infoBox}>
                        <div className={styles.iconCircle}><Mail size={20} /></div>
                        <div>
                            <h3>Email</h3>
                            <p>care@wellbeing.com</p>
                        </div>
                    </div>
                    <div className={styles.infoBox}>
                        <div className={styles.iconCircle}><MapPin size={20} /></div>
                        <div>
                            <h3>Address</h3>
                            <p>Alwar, Rajasthan, India</p>
                        </div>
                    </div>
                </div>

                <div className={styles.formCol}>
                    <form className={styles.form}>
                        <div className={styles.inputGroup}>
                            <label>Full Name</label>
                            <input type="text" placeholder="John Doe" />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Email Address</label>
                            <input type="email" placeholder="john@example.com" />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Message</label>
                            <textarea placeholder="How can we help you?"></textarea>
                        </div>
                        <button type="button" className={styles.submitBtn}>
                            <span>Send Message</span>
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            </div>
        </InfoPageLayout>
    );
};

export default ContactPage;
