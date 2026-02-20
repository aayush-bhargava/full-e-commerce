import { getDashboardStats, getRecentOrders } from '@/lib/db';
import { DollarSign, ShoppingBag, Users, ShoppingCart, IndianRupee } from 'lucide-react';

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
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-4xl font-serif text-stone-900 mb-2">Dashboard</h1>
                    <p className="text-stone-500 font-medium">Suchita Bhargava - Aapka Swagat Hai!</p>
                </div>
                <div className="text-sm bg-white px-5 py-2.5 rounded-xl border border-stone-200/60 text-stone-600 shadow-sm font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
            </div>

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
                <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-stone-100/50">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-serif text-stone-900">Recent Orders</h2>
                        <button className="text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-stone-100 text-left">
                                    <th className="pb-4 pl-4 font-semibold text-stone-400 text-xs uppercase tracking-wider">Order ID</th>
                                    <th className="pb-4 font-semibold text-stone-400 text-xs uppercase tracking-wider">Customer</th>
                                    <th className="pb-4 font-semibold text-stone-400 text-xs uppercase tracking-wider">Date</th>
                                    <th className="pb-4 font-semibold text-stone-400 text-xs uppercase tracking-wider">Status</th>
                                    <th className="pb-4 pr-4 font-semibold text-stone-400 text-xs uppercase tracking-wider text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-stone-50">
                                {recentOrders.map((order) => (
                                    <tr key={order.id} className="group hover:bg-stone-50/80 transition-colors">
                                        <td className="py-4 pl-4 text-stone-900 font-medium font-mono text-sm group-hover:text-stone-600 transition-colors">{order.id}</td>
                                        <td className="py-4 font-medium text-stone-700">{order.customer}</td>
                                        <td className="py-4 text-stone-500 text-sm">{new Date(order.date).toLocaleDateString()}</td>
                                        <td className="py-4">
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                          ${order.status === 'Delivered' ? 'bg-green-50 text-green-700 border-green-200' :
                                                        order.status === 'Processing' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                                            order.status === 'Shipped' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                                                                'bg-yellow-50 text-yellow-700 border-yellow-200'}`}
                                            >
                                                <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${order.status === 'Delivered' ? 'bg-green-500' :
                                                    order.status === 'Processing' ? 'bg-blue-500' :
                                                        order.status === 'Shipped' ? 'bg-purple-500' :
                                                            'bg-yellow-500'
                                                    }`}></span>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="py-4 pr-4 text-stone-900 font-bold text-right">${order.total.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-stone-900 p-8 rounded-2xl shadow-xl text-white flex flex-col justify-between relative overflow-hidden group">
                    {/* Decorative background circle */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-stone-800 rounded-full opacity-50 blur-2xl group-hover:bg-stone-700 transition-colors duration-500"></div>

                    <div>
                        <h2 className="text-2xl font-serif mb-2 relative z-10">Quick Action</h2>
                        <p className="text-stone-400 mb-8 relative z-10">Add new items to your spiritual inventory.</p>
                    </div>

                    <a href="/admin/products/new" className="w-full py-4 bg-black text-white rounded-xl font-bold text-center hover:bg-stone-800 transition-transform active:scale-95 shadow-lg relative z-10">
                        Add New Product
                    </a>
                </div>
            </div>
        </div>
    );
}
