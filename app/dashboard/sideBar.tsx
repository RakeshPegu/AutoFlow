"use client";

import { OrganizationSwitcher } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    {
        name: "Overview",
        href: "/dashboard/overview",
    },
    {
        name: "Subscription",
        href: "/dashboard/subscription",
    },

    {
        name: "Leads",
        href: "/dashboard/leads",
    },
        {
        name: "API keys",
        href: "/dashboard/api-key"
    },
    {
        name: "Settings",
        href: "/dashboard/settings",
    },

];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 border-r  p-6">
            <h2 className="mb-6 text-xl font-bold">
                <Link href={'/'} className="cursor-pointer "> Dashboard </Link>
               
            </h2>

            <nav className="flex flex-col gap-2">
                {links.map((link) => {
                    const active = pathname === link.href;

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`rounded-md px-3 py-2 ${
                                active
                                    ? "bg-black text-white"
                                    : "hover:bg-gray-100"
                            }`}
                        >
                            {link.name}
                        </Link>
                    );
                })}
                <OrganizationSwitcher/>
            </nav>
        </aside>
    );
}