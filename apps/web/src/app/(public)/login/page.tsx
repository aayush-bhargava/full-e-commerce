"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Sparkles, Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import styles from './page.module.css';
import Button from '@/components/ui/Button';

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';
    const { login, sendOTP, verifyOTP } = useAuth();

    const [authMode, setAuthMode] = useState<'email' | 'phone'>('email');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Phone Auth State
    const [phoneStep, setPhoneStep] = useState<'input' | 'otp'>('input');
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');

    const handleEmailLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            await login('email', { email, password });
            router.push(callbackUrl);
        } catch (err: any) {
            setError(err.message || "Login failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendOTP = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        if (!phone || phone.length < 10) {
            setError("Please enter a valid phone number.");
            setIsLoading(false);
            return;
        }

        try {
            // First check if user exists
            await login('phone', { phone });
            // If it doesn't throw, user exists. Now send OTP.
            const code = await sendOTP(phone);
            alert(`[SIMULATED SMS] Your verification code is: ${code}`);
            setPhoneStep('otp');
        } catch (err: any) {
            setError(err.message || "Failed to send verification code.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOTP = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const isValid = await verifyOTP(phone, otp);
            if (isValid) {
                // login function already called in handleSendOTP to check existence, 
                // but we need to set the user state now. 
                // Actually, login() in AuthContext sets the user state.
                // Re-calling login with phone is enough since verifyOTP passed.
                await login('phone', { phone });
                router.push(callbackUrl);
            } else {
                setError("Invalid verification code. Please try again.");
            }
        } catch (err: any) {
            setError("Verification failed.");
        } finally {
            setIsLoading(false);
        }
    };

    const handlePhoneInput = (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value.replace(/[^0-9]/g, '');
        setPhone(value);
    };

    const handleOtpInput = (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value.replace(/[^0-9]/g, '').slice(0, 6);
        setOtp(value);
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
                    <h1>Welcome Back</h1>
                    <p>Enter your sanctuary of serenity and continue your journey.</p>
                </div>

                <div className={styles.authTabs}>
                    <button
                        onClick={() => { setAuthMode('email'); setError(null); }}
                        className={`${styles.tab} ${authMode === 'email' ? styles.activeTab : ''}`}
                    >
                        Email
                    </button>
                    <button
                        onClick={() => { setAuthMode('phone'); setError(null); }}
                        className={`${styles.tab} ${authMode === 'phone' ? styles.activeTab : ''}`}
                    >
                        Phone
                    </button>
                    <div className={styles.tabIndicator} style={{ transform: `translateX(${authMode === 'email' ? '0' : '100%'})` }} />
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-2xl animate-in fade-in slide-in-from-top-2">
                        {error}
                    </div>
                )}

                <AnimatePresence mode="wait">
                    {authMode === 'email' ? (
                        <motion.form
                            key="email-form"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            onSubmit={handleEmailLogin}
                            className={styles.form}
                        >
                            <div className={styles.inputGroup}>
                                <label>Email Address</label>
                                <div className={styles.inputWrapper}>
                                    <Mail className={styles.inputIcon} size={18} />
                                    <input type="email" name="email" className={styles.input} placeholder="name@example.com" required />
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
                                {isLoading ? "Aligning..." : "Sign In"}
                                <ArrowRight size={18} className="ml-2" />
                            </Button>
                        </motion.form>
                    ) : (
                        <motion.div key="phone-auth-container">
                            {phoneStep === 'input' ? (
                                <motion.form
                                    key="phone-input-form"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    onSubmit={handleSendOTP}
                                    className={styles.form}
                                >
                                    <div className={styles.inputGroup}>
                                        <label>Phone Number</label>
                                        <div className={styles.inputWrapper}>
                                            <Phone className={styles.inputIcon} size={18} />
                                            <input
                                                type="tel"
                                                name="phone"
                                                className={styles.input}
                                                placeholder="9876543210"
                                                value={phone}
                                                onInput={handlePhoneInput}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <Button type="submit" size="xl" className={styles.submitBtn} disabled={isLoading}>
                                        {isLoading ? "Connecting..." : "Send Verification Code"}
                                        <ArrowRight size={18} className="ml-2" />
                                    </Button>
                                </motion.form>
                            ) : (
                                <motion.form
                                    key="otp-input-form"
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    onSubmit={handleVerifyOTP}
                                    className={styles.form}
                                >
                                    <div className={styles.inputGroup}>
                                        <label>Verification Code</label>
                                        <div className={styles.inputWrapper}>
                                            <ShieldCheck className={styles.inputIcon} size={18} />
                                            <input
                                                type="text"
                                                name="otp"
                                                className={styles.input}
                                                placeholder="Enter 6-digit code"
                                                value={otp}
                                                onInput={handleOtpInput}
                                                maxLength={6}
                                                required
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setPhoneStep('input')}
                                            className="text-xs text-stone-400 hover:text-stone-900 mt-2 text-left px-1 font-bold"
                                        >
                                            ← Change phone number
                                        </button>
                                    </div>
                                    <Button type="submit" size="xl" className={styles.submitBtn} disabled={isLoading || otp.length !== 6}>
                                        {isLoading ? "Verifying..." : "Verify & Sign In"}
                                        <ArrowRight size={18} className="ml-2" />
                                    </Button>
                                </motion.form>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className={styles.divider}>
                    <div className={styles.dividerLine} />
                    <span>or</span>
                    <div className={styles.dividerLine} />
                </div>

                <button
                    onClick={() => login('google', {}).then(() => router.push(callbackUrl))}
                    className={styles.googleBtn}
                >
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
                    Continue with Google
                </button>

                <div className={styles.footer}>
                    <p>New to WELLBEING?</p>
                    <Link href={`/signup?callbackUrl=${callbackUrl}`} className={styles.link}>
                        Create sanctuary account
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
