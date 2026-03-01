import React from "react";
import InfoPageLayout from "@/components/layout/InfoPageLayout";
import styles from "./page.module.css";
import { Truck, MapPin, CreditCard } from "lucide-react";

const ShippingPage = () => {
    return (
        <InfoPageLayout title="Shipping" subtitle="Delivery & Logistics">
            <div className={styles.section}>
                <div className={styles.iconHeading}>
                    <Truck size={24} />
                    <h2>India-wide Delivery</h2>
                </div>
                <p>We are proud to offer <strong>Free Shipping all over India</strong> on all orders. Your spiritual artifacts are handled with the utmost care and packed in eco-friendly materials.</p>
            </div>

            <div className={styles.section}>
                <div className={styles.iconHeading}>
                    <MapPin size={24} />
                    <h2>Cash on Delivery</h2>
                </div>
                <p>Currently, Cash on Delivery (COD) services are available <strong>exclusively in Alwar, Rajasthan</strong>. We hope to expand this service to more locations soon.</p>
            </div>

            <div className={styles.section}>
                <div className={styles.iconHeading}>
                    <CreditCard size={24} />
                    <h2>Payment Methods</h2>
                </div>
                <p>For all other locations, we accept all major Credit/Debit cards, UPI, and Net Banking through our secure payment gateway.</p>
            </div>
        </InfoPageLayout>
    );
};

export default ShippingPage;
