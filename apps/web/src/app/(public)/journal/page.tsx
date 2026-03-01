import React from "react";
import InfoPageLayout from "@/components/layout/InfoPageLayout";
import styles from "./page.module.css";
import Link from "next/link";

const JournalPage = () => {
    const posts = [
        {
            date: "October 12, 2025",
            title: "The Art of Crystal Meditation",
            excerpt: "Discover how to harness the ancient power of quartz during your daily practice..."
        },
        {
            date: "September 28, 2025",
            title: "Morning Rituals for Clarity",
            excerpt: "Establishing a spiritual routine can transform your perspective on life's challenges..."
        },
        {
            date: "August 15, 2025",
            title: "Sacred Spaces in Modern Homes",
            excerpt: "How to create a sanctuary of peace even in the busiest of environments..."
        }
    ];

    return (
        <InfoPageLayout title="Journal" subtitle="Spiritual Insights">
            <div className={styles.postList}>
                {posts.map((post, idx) => (
                    <div key={idx} className={styles.post}>
                        <span className={styles.date}>{post.date}</span>
                        <h2 className={styles.postTitle}>{post.title}</h2>
                        <p className={styles.excerpt}>{post.excerpt}</p>
                        <Link href="#" className={styles.readMore}>Read Entry —</Link>
                    </div>
                ))}
            </div>
        </InfoPageLayout>
    );
};

export default JournalPage;
