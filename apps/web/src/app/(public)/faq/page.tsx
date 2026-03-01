import React from "react";
import InfoPageLayout from "@/components/layout/InfoPageLayout";
import styles from "./page.module.css";

const FAQPage = () => {
    const faqs = [
        {
            q: "How do I care for my crystals?",
            a: "We recommend cleansing your crystals under moonlight or with sage regularly to maintain their natural vibrations."
        },
        {
            q: "What is your return policy?",
            a: "Due to the spiritual nature of our artifacts, we accept returns within 7 days of delivery if the product is in its original, unused condition."
        },
        {
            q: "Are the stones authentic?",
            a: "Every stone sold at WELLBEING is ethically sourced and verified for authenticity by our spiritual experts."
        }
    ];

    return (
        <InfoPageLayout title="FAQ" subtitle="Common Enquiries">
            <div className={styles.faqList}>
                {faqs.map((faq, idx) => (
                    <div key={idx} className={styles.faqItem}>
                        <h3 className={styles.question}>{faq.q}</h3>
                        <p className={styles.answer}>{faq.a}</p>
                    </div>
                ))}
            </div>
        </InfoPageLayout>
    );
};

export default FAQPage;
