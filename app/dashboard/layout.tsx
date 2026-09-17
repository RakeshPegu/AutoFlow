import Link from "next/link";
import Sidebar from "./sideBar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen">
            {/* Left sidebar */}
            <Sidebar/>
            {/* Right side */}
            <main className="flex-1 p-8">
                {children}
            </main>
        </div>
    );
}