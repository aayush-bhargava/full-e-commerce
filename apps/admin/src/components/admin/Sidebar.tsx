"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShoppingBag, Users, ShoppingCart, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
    { icon: ShoppingBag, label: 'Products', href: '/products' },
    { icon: ShoppingCart, label: 'Orders', href: '/orders' },
    { icon: Users, label: 'Customers', href: '/customers' },
];

export default function Sidebar() {
    const pathname = usePathname();

    const handleLogout = () => {
        document.cookie = "admin_session=; path=/; max-age=0";
        window.location.href = "/";
    };

    return (
        <aside className="w-64 bg-stone-900 text-stone-100 h-screen fixed left-0 top-0 overflow-y-auto flex flex-col border-r border-stone-800 shadow-xl z-50">
            <div className="p-6 mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-stone-100 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                        <span className="text-stone-900 font-bold font-serif">W</span>
                    </div>
                    <h1 className="text-xl font-serif text-stone-100 tracking-wide">WellBeing Admin</h1>
                </div>
            </div>

            <nav className="flex-1 px-3 space-y-1">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link key={item.href} href={item.href}>
                            <div
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${isActive
                                    ? 'bg-stone-800 text-white shadow-md translate-x-1'
                                    : 'text-stone-400 hover:text-stone-100 hover:bg-stone-800/50 hover:translate-x-1'
                                    }`}
                            >
                                <Icon size={20} className={isActive ? 'text-stone-100' : 'text-stone-500 group-hover:text-stone-300'} />
                                <span className="font-medium">{item.label}</span>
                            </div>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-6 mt-auto border-t border-stone-800">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 text-stone-400 hover:text-red-400 w-full transition-colors rounded-lg hover:bg-red-500/10 group"
                >
                    <LogOut size={20} className="group-hover:text-red-400" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
}
