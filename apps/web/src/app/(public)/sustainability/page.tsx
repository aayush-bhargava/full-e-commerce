import React from "react";
import InfoPageLayout from "@/components/layout/InfoPageLayout";
import styles from "./page.module.css";
import { Leaf, Recycle, Globe } from "lucide-react";

const SustainabilityPage = () => {
    return (
        <InfoPageLayout title="Sustainability" subtitle="Mindful Presence">
            <div className={styles.section}>
                <div className={styles.iconBox}><Leaf size={24} /></div>
                <h2>Ethical Sourcing</h2>
                <p>We believe that spiritual artifacts must carry pure energy. This begins with how they are sourced. We partner directly with artisans and mines that share our commitment to fair wages and environmental respect.</p>
            </div>

            <div className={styles.section}>
                <div className={styles.iconBox}><Recycle size={24} /></div>
                <h2>Conscious Packaging</h2>
                <p>Our commitment to the Earth extends to your doorstep. We use 100% recyclable and biodegradable packaging materials, avoiding single-use plastics entirely.</p>
            </div>

            <div className={styles.section}>
                <div className={styles.iconBox}><Globe size={24} /></div>
                <h2>Giving Back</h2>
                <p>A portion of every purchase is dedicated to environmental restoration projects within India, ensuring that our presence on this planet remains a positive one.</p>
            </div>
        </InfoPageLayout>
    );
};

export default SustainabilityPage;
