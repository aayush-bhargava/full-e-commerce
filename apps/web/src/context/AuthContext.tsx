"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    findUserByEmail,
    findUserByPhone,
    registerUser,
    sendOTP as dbSendOTP,
    verifyOTP as dbVerifyOTP,
    User as DbUser
} from '@/lib/db';

export interface User extends DbUser {
    image?: string;
}

interface AuthContextType {
    user: User | null;
    status: 'loading' | 'unauthenticated' | 'authenticated';
    login: (method: 'email' | 'phone' | 'google', data: any) => Promise<void>;
    logout: () => void;
    signup: (data: any) => Promise<void>;
    sendOTP: (phone: string) => Promise<string>;
    verifyOTP: (phone: string, otp: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [status, setStatus] = useState<'loading' | 'unauthenticated' | 'authenticated'>('loading');

    useEffect(() => {
        // Hydrate from localStorage for persistence
        const savedUser = localStorage.getItem('wellbeing_user');
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
                setStatus('authenticated');
            } catch (e) {
                localStorage.removeItem('wellbeing_user');
                setStatus('unauthenticated');
            }
        } else {
            setStatus('unauthenticated');
        }
    }, []);

    const login = async (method: 'email' | 'phone' | 'google', data: any) => {
        setStatus('loading');
        try {
            let foundUser: DbUser | undefined;

            if (method === 'email') {
                foundUser = await findUserByEmail(data.email);
                if (!foundUser) throw new Error("No account found with this email. Please register first.");
                if (foundUser.password !== data.password) throw new Error("Incorrect password.");
            } else if (method === 'phone') {
                foundUser = await findUserByPhone(data.phone);
                if (!foundUser) throw new Error("This phone number is not registered. Please sign up first.");
            } else if (method === 'google') {
                // Mock Google login for now
                foundUser = await findUserByEmail('explorer@gmail.com');
                if (!foundUser) {
                    foundUser = await registerUser({
                        name: 'Spiritual Explorer',
                        email: 'explorer@gmail.com',
                        phone: ''
                    });
                }
            }

            if (foundUser) {
                setUser(foundUser);
                setStatus('authenticated');
                localStorage.setItem('wellbeing_user', JSON.stringify(foundUser));
            }
        } catch (error: any) {
            setStatus('unauthenticated');
            throw error;
        }
    };

    const signup = async (data: any) => {
        setStatus('loading');
        try {
            const newUser = await registerUser({
                name: data.name,
                email: data.email,
                phone: data.phone,
                password: data.password
            });
            setUser(newUser);
            setStatus('authenticated');
            localStorage.setItem('wellbeing_user', JSON.stringify(newUser));
        } catch (error: any) {
            setStatus('unauthenticated');
            throw error;
        }
    };

    const sendOTP = async (phone: string) => {
        return await dbSendOTP(phone);
    };

    const verifyOTP = async (phone: string, otp: string) => {
        return await dbVerifyOTP(phone, otp);
    };

    const logout = () => {
        setUser(null);
        setStatus('unauthenticated');
        localStorage.removeItem('wellbeing_user');
    };

    return (
        <AuthContext.Provider value={{ user, status, login, logout, signup, sendOTP, verifyOTP }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
