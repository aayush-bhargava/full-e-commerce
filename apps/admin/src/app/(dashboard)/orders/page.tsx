import { getOrders } from '@/lib/db';
import { Eye } from 'lucide-react';

export default async function OrdersPage() {
    const orders = await getOrders();

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div>
                <h1 className="text-3xl font-serif text-stone-900 mb-1">Orders</h1>
                <p className="text-stone-500">Track and manage customer orders</p>
            </div>

            <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-stone-100/50 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-stone-50/50 border-b border-stone-100">
                            <tr className="text-left">
                                <th className="px-6 py-4 font-semibold text-stone-400 text-xs uppercase tracking-wider pl-8">Order ID</th>
                                <th className="px-6 py-4 font-semibold text-stone-400 text-xs uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-4 font-semibold text-stone-400 text-xs uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 font-semibold text-stone-400 text-xs uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 font-semibold text-stone-400 text-xs uppercase tracking-wider">Items</th>
                                <th className="px-6 py-4 font-semibold text-stone-400 text-xs uppercase tracking-wider">Total</th>
                                <th className="px-6 py-4 font-semibold text-stone-400 text-xs uppercase tracking-wider text-right pr-8">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-50">
                            {orders.map((order) => (
                                <tr key={order.id} className="group hover:bg-stone-50/80 transition-colors">
                                    <td className="px-6 py-4 font-medium text-stone-900 pl-8 font-mono text-sm">{order.id}</td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-stone-900">{order.customer}</div>
                                        <div className="text-xs text-stone-500">{order.email}</div>
                                    </td>
                                    <td className="px-6 py-4 text-stone-500 text-sm">{new Date(order.date).toLocaleDateString()}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
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
                                    <td className="px-6 py-4 text-stone-600 font-medium">{order.items.reduce((acc, item) => acc + item.quantity, 0)} items</td>
                                    <td className="px-6 py-4 text-stone-900 font-bold">${order.total.toFixed(2)}</td>
                                    <td className="px-6 py-4 text-right pr-8">
                                        <button className="p-2 text-stone-400 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors opacity-60 group-hover:opacity-100">
                                            <Eye size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {orders.length === 0 && (
                    <div className="p-16 text-center">
                        <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Eye className="text-stone-300" size={24} />
                        </div>
                        <h3 className="text-stone-900 font-medium mb-1">No orders yet</h3>
                        <p className="text-stone-500 text-sm">When you get your first order, it will appear here.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
