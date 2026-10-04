import Link from "next/link";
import Sidebar from "./sideBar";
import CreateAPIKey from "./apiCreateForm";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
         <CreateAPIKey/>
        <div className="flex min-h-screen">
            {/* Left sidebar */}
            
            <Sidebar/>
            {/* Right side */}
            <main className="flex-1 p-8">
                {children}
            </main>
        </div>
        </>
    );
}