"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import styles from './AuthGuard.module.css';
import Button from '@/components/ui/Button';

interface AuthGuardProps {
    children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
    const { user, status } = useAuth();
    const pathname = usePathname();

    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-stone-50">
                <div className="w-10 h-10 border-2 border-stone-200 border-t-stone-900 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (status === 'unauthenticated' || !user) {
        return (
            <div className={styles.overlay}>
                <div className={styles.backgroundDecor}>
                    <div className={styles.circle1} />
                    <div className={styles.circle2} />
                </div>

                <div className={styles.content}>
                    <div className={styles.logoBadge}>
                        <Lock size={32} />
                    </div>
                    <h2 className={styles.title}>Secure Sanctuary</h2>
                    <p className={styles.message}>
                        To protect your energy and ensure a personalized journey, please sign in or join our sanctuary before completing your purchase.
                    </p>

                    <div className={styles.actions}>
                        <Link href={`/login?callbackUrl=${pathname}`} className={styles.link}>
                            <Button size="xl" className={styles.primaryBtn}>
                                Sign In to Continue
                                <ArrowRight size={18} className="ml-2" />
                            </Button>
                        </Link>

                        <div className={styles.divider}>
                            <div className={styles.dividerLine} />
                            <span>or</span>
                            <div className={styles.dividerLine} />
                        </div>

                        <Link href={`/signup?callbackUrl=${pathname}`} className={styles.link}>
                            <Button size="xl" variant="outline" className={styles.secondaryBtn}>
                                Create Sanctuary Account
                            </Button>
                        </Link>
                    </div>

                    <Link href="/" className={styles.cancelBtn}>
                        <button className="text-sm font-bold text-stone-400 hover:text-stone-900 transition-colors py-4">
                            I'll explore more first
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
