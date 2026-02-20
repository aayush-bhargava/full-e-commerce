import Sidebar from '@/components/admin/Sidebar';
import "../globals.css"; // Ensure globals are loaded

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-stone-50">
            <Sidebar />
            <main className="ml-64 p-8 transition-all duration-300">
                {children}
            </main>
        </div>
    );
}
