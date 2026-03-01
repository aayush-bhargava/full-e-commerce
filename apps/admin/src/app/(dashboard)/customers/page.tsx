import { getCustomers } from '@/lib/db';
import { Mail } from 'lucide-react';

export default async function CustomersPage() {
    const customers = await getCustomers();

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div>
                <h1 className="text-3xl font-serif text-stone-900 mb-1">Customers</h1>
                <p className="text-stone-500">View your customer base</p>
            </div>

            <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-stone-100/50 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-stone-50/50 border-b border-stone-100">
                            <tr className="text-left">
                                <th className="px-6 py-4 font-semibold text-stone-400 text-xs uppercase tracking-wider pl-8">Name</th>
                                <th className="px-6 py-4 font-semibold text-stone-400 text-xs uppercase tracking-wider">Email</th>
                                <th className="px-6 py-4 font-semibold text-stone-400 text-xs uppercase tracking-wider">Joined</th>
                                <th className="px-6 py-4 font-semibold text-stone-400 text-xs uppercase tracking-wider">Orders</th>
                                <th className="px-6 py-4 font-semibold text-stone-400 text-xs uppercase tracking-wider">Total Spent</th>
                                <th className="px-6 py-4 font-semibold text-stone-400 text-xs uppercase tracking-wider text-right pr-8">Contact</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-50">
                            {customers.map((customer) => (
                                <tr key={customer.id} className="group hover:bg-stone-50/80 transition-colors">
                                    <td className="px-6 py-4 font-medium text-stone-900 pl-8">{customer.name}</td>
                                    <td className="px-6 py-4 text-stone-600">{customer.email}</td>
                                    <td className="px-6 py-4 text-stone-500 text-sm">{new Date(customer.dateJoined).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-stone-600">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-stone-100 text-stone-600 border border-stone-200">
                                            {customer.orders} orders
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-stone-900 font-bold">₹{customer.totalSpent.toFixed(2)}</td>
                                    <td className="px-6 py-4 text-right pr-8">
                                        <a
                                            href={`mailto:${customer.email}`}
                                            className="p-2 text-stone-400 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors inline-flex opacity-60 group-hover:opacity-100"
                                        >
                                            <Mail size={18} />
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {customers.length === 0 && (
                    <div className="p-16 text-center">
                        <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Mail className="text-stone-300" size={24} />
                        </div>
                        <h3 className="text-stone-900 font-medium mb-1">No customers yet</h3>
                        <p className="text-stone-500 text-sm">Customers will appear here after they sign up or make a purchase.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
