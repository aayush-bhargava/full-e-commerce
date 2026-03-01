import { getDashboardStats, getRecentOrders } from '@/lib/db';
import { DollarSign, ShoppingBag, Users, ShoppingCart, IndianRupee } from 'lucide-react';
import Link from 'next/link';
import BrandingManager from '@/components/admin/BrandingManager';

export default async function AdminDashboard() {
    const stats = await getDashboardStats();
    const recentOrders = await getRecentOrders();

    const statCards = [
        { label: 'Total Sales', value: `₹${stats.totalSales.toFixed(2)}`, icon: IndianRupee, color: 'text-green-600', bg: 'bg-green-100' },
        { label: 'Total Orders', value: stats.totalOrders, icon: ShoppingCart, color: 'text-blue-600', bg: 'bg-blue-100' },
        { label: 'Total Products', value: stats.totalProducts, icon: ShoppingBag, color: 'text-purple-600', bg: 'bg-purple-100' },
        { label: 'Total Customers', value: stats.totalCustomers, icon: Users, color: 'text-orange-600', bg: 'bg-orange-100' },
    ];

    return (
        <div className="space-y-8 p-6 lg:p-10 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                    <h1 className="text-4xl font-serif text-stone-900 mb-2">Dashboard</h1>
                    <p className="text-stone-500 font-medium">Suchita Bhargava — Welcome to your store.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="text-sm bg-white px-5 py-2.5 rounded-xl border border-stone-200/60 text-stone-600 shadow-sm font-medium flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        Live Store Analytics
                    </div>
                    <div className="text-sm bg-stone-900 px-5 py-2.5 rounded-xl text-white shadow-lg font-medium">
                        {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className="bg-white p-6 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-stone-100/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-4 rounded-xl ${stat.bg} bg-opacity-50`}>
                                    <Icon className={`w-6 h-6 ${stat.color}`} />
                                </div>
                            </div>
                            <h3 className="text-stone-500 text-sm font-bold uppercase tracking-wider">{stat.label}</h3>
                            <p className="text-3xl font-serif text-stone-900 mt-2 font-medium">{stat.value}</p>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Orders Table - Taking 2 cols */}
                <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-stone-100/50">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-serif text-stone-900">Recent Orders</h2>
                        <Link href="/orders" className="text-sm font-bold text-stone-400 hover:text-stone-900 transition-colors uppercase tracking-widest">
                            View All
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-stone-100 text-left">
                                    <th className="pb-4 pl-4 font-semibold text-stone-400 text-xs uppercase tracking-wider">Order ID</th>
                                    <th className="pb-4 font-semibold text-stone-400 text-xs uppercase tracking-wider">Customer</th>
                                    <th className="pb-4 font-semibold text-stone-400 text-xs uppercase tracking-wider">Date</th>
                                    <th className="pb-4 font-semibold text-stone-400 text-xs uppercase tracking-wider text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-50">
                                {recentOrders.map((order) => (
                                    <tr key={order.id} className="group hover:bg-stone-50/80 transition-colors">
                                        <td className="py-4 pl-4 text-stone-900 font-medium font-mono text-sm group-hover:text-stone-600 transition-colors">{order.id}</td>
                                        <td className="py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-[10px] font-bold text-stone-600 border border-stone-200">
                                                    {order.customer.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <span className="font-medium text-stone-700">{order.customer}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 text-stone-500 text-sm">{new Date(order.date).toLocaleDateString()}</td>
                                        <td className="py-4 pr-4">
                                            <div className="flex flex-col items-end">
                                                <span className="text-stone-900 font-bold">₹{order.total.toFixed(2)}</span>
                                                <span className={`text-[10px] font-bold uppercase tracking-tighter ${order.status === 'Delivered' ? 'text-emerald-500' :
                                                    order.status === 'Cancelled' ? 'text-red-500' : 'text-amber-500'
                                                    }`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Branding Manager - Taking 1 col */}
                <div className="space-y-8">
                    <BrandingManager />

                    <div className="bg-stone-900 p-8 rounded-2xl shadow-xl text-white flex flex-col justify-center relative overflow-hidden group min-h-[220px]">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-stone-800 rounded-full opacity-50 blur-2xl group-hover:bg-stone-700 transition-colors duration-500"></div>
                        <div className="relative z-10 flex flex-col items-center text-center">
                            <h2 className="text-2xl font-serif mb-2 text-white">Quick Action</h2>
                            <p className="text-stone-400 mb-6 text-sm">Add something new to WELLBEING.</p>
                            <Link href="/products/new" className="inline-block px-10 py-3.5 bg-white !text-stone-900 rounded-xl font-bold text-sm hover:bg-stone-100 transition-all active:scale-95 shadow-[0_8px_25px_rgba(255,255,255,0.15)]">
                                Add Product
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
