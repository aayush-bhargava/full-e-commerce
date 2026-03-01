"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Sparkles, Phone, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import styles from './page.module.css';
import Button from '@/components/ui/Button';

export default function SignupPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';
    const { signup } = useAuth();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const phone = formData.get('phone') as string;
        const password = formData.get('password') as string;

        // Basic phone validation (numeric only check is handled by onInput/pattern)
        if (phone && !/^\d+$/.test(phone.replace(/\+/g, '').replace(/\s/g, ''))) {
            setError("Phone number should only contain numbers.");
            setIsLoading(false);
            return;
        }

        try {
            await signup({ name, email, phone, password });
            router.push(callbackUrl);
        } catch (err: any) {
            setError(err.message || "Signup failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handlePhoneInput = (e: React.FormEvent<HTMLInputElement>) => {
        const input = e.currentTarget;
        input.value = input.value.replace(/[^0-9]/g, '');
    };

    return (
        <div className={styles.page}>
            <div className={styles.backgroundDecor}>
                <div className={styles.circle1} />
                <div className={styles.circle2} />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={styles.card}
            >
                <div className={styles.header}>
                    <div className={styles.logoBadge}>
                        <Sparkles size={24} />
                    </div>
                    <h1>Create Sanctuary</h1>
                    <p>Begin your journey to spiritual elevation and personalized energy.</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-2xl animate-in fade-in slide-in-from-top-2">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSignup} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label>Full Name</label>
                        <div className={styles.inputWrapper}>
                            <User className={styles.inputIcon} size={18} />
                            <input type="text" name="name" className={styles.input} placeholder="Your Name" required />
                        </div>
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Email Address</label>
                        <div className={styles.inputWrapper}>
                            <Mail className={styles.inputIcon} size={18} />
                            <input type="email" name="email" className={styles.input} placeholder="name@example.com" required />
                        </div>
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Phone Number</label>
                        <div className={styles.inputWrapper}>
                            <Phone className={styles.inputIcon} size={18} />
                            <input
                                type="tel"
                                name="phone"
                                className={styles.input}
                                placeholder="9876543210"
                                onInput={handlePhoneInput}
                                inputMode="numeric"
                                pattern="[0-9]*"
                            />
                        </div>
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Password</label>
                        <div className={styles.inputWrapper}>
                            <Lock className={styles.inputIcon} size={18} />
                            <input type="password" name="password" className={styles.input} placeholder="••••••••" required />
                        </div>
                    </div>
                    <Button type="submit" size="xl" className={styles.submitBtn} disabled={isLoading}>
                        {isLoading ? "Creating..." : "Join the Sanctuary"}
                        <ArrowRight size={18} className="ml-2" />
                    </Button>
                </form>

                <div className={styles.footer}>
                    <p>Already have an account?</p>
                    <Link href={`/login?callbackUrl=${callbackUrl}`} className={styles.link}>
                        Sign In
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
