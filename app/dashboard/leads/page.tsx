
import { Search } from "lucide-react";

export default function MembersPage() {
    const leads = [
        {
            name: "Rahul Sharma",
            score: 94,
            number: "+91 98765 43210",
            email: "rahul.sharma@example.com",
            intent: "Hot",
            reason: "Ready to purchase and requested a product demo.",
        },
        {
            name: "Priya Mehta",
            score: 87,
            number: "+91 91234 56789",
            email: "priya.mehta@example.com",
            intent: "Hot",
            reason: "High engagement with pricing and integration details.",
        },
        {
            name: "Arjun Verma",
            score: 76,
            number: "+91 99887 66554",
            email: "arjun.verma@example.com",
            intent: "Warm",
            reason: "Interested in the product but still comparing alternatives.",
        },
        {
            name: "Neha Patel",
            score: 68,
            number: "+91 90123 45678",
            email: "neha.patel@example.com",
            intent: "Warm",
            reason: "Requested more information about available features.",
        },
        {
            name: "Amit Kumar",
            score: 52,
            number: "+91 93456 78901",
            email: "amit.kumar@example.com",
            intent: "Warm",
            reason: "Showing moderate interest but has not requested a demo.",
        },
        {
            name: "Sneha Rao",
            score: 39,
            number: "+91 87654 32109",
            email: "sneha.rao@example.com",
            intent: "Cold",
            reason: "Low engagement and no clear purchase intent.",
        },
        {
            name: "Vikas Singh",
            score: 24,
            number: "+91 88990 11223",
            email: "vikas.singh@example.com",
            intent: "Cold",
            reason: "Only browsing and has not interacted with key product pages.",
        },
        {
            name: "Ananya Das",
            score: 91,
            number: "+91 90909 80808",
            email: "ananya.das@example.com",
            intent: "Hot",
            reason: "Requested pricing and wants to start within the next few days.",
        },
    ];

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                        Leads
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Manage and monitor your qualified leads.
                    </p>
                </div>

                {/* Search */}
                <form className="flex h-10 w-full max-w-sm items-center rounded-lg border border-slate-200 bg-white px-3 shadow-sm transition focus-within:border-slate-300 focus-within:ring-2 focus-within:ring-slate-100">
                    <Search
                        size={17}
                        className="shrink-0 text-slate-400"
                    />

                    <input
                        type="text"
                        placeholder="Search leads..."
                        className="ml-2 w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                    />
                </form>
            </div>

            {/* Table container */}
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[1000px] border-collapse text-sm">

                        {/* Table Header */}
                        <thead>
                            <tr className="border-b border-slate-200 bg-slate-50/70">
                                <th className="w-14 px-4 py-3 text-left font-medium text-slate-500">
                                    #
                                </th>

                                <th className="px-4 py-3 text-left font-medium text-slate-500">
                                    Name
                                </th>

                                <th className="px-4 py-3 text-left font-medium text-slate-500">
                                    Score
                                </th>

                                <th className="px-4 py-3 text-left font-medium text-slate-500">
                                    Number
                                </th>

                                <th className="px-4 py-3 text-left font-medium text-slate-500">
                                    Email
                                </th>

                                <th className="px-4 py-3 text-left font-medium text-slate-500">
                                    Intent
                                </th>

                                <th className="min-w-70 px-4 py-3 text-left font-medium text-slate-500">
                                    Reason
                                </th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody>
                            {leads.map((lead, index) => (
                                <tr
                                    key={index}
                                    className="border-b border-slate-300 last:border-0 transition-colors hover:bg-slate-50/70"
                                >
                                    {/* Number */}
                                    <td className="px-4 py-4 text-slate-400">
                                        {index + 1}
                                    </td>

                                    {/* Name */}
                                    <td className="px-4 py-4">
                                        <span className="font-medium text-slate-900">
                                            {lead.name}
                                        </span>
                                    </td>

                                    {/* Score */}
                                    <td className="px-4 py-4">
                                        <span
                                            className={`font-semibold ${
                                                lead.score >= 80
                                                    ? "text-emerald-600"
                                                    : lead.score >= 50
                                                    ? "text-amber-600"
                                                    : "text-slate-500"
                                            }`}
                                        >
                                            {lead.score}
                                        </span>
                                    </td>

                                    {/* Number */}
                                    <td className="whitespace-nowrap px-4 py-4 text-slate-600">
                                        {lead.number}
                                    </td>

                                    {/* Email */}
                                    <td className="px-4 py-4 text-slate-600">
                                        {lead.email}
                                    </td>

                                    {/* Intent */}
                                    <td className="px-4 py-4">
                                        <span
                                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                                                lead.intent === "Hot"
                                                    ? "bg-red-50 text-red-600"
                                                    : lead.intent === "Warm"
                                                    ? "bg-amber-50 text-amber-600"
                                                    : "bg-slate-100 text-slate-500"
                                            }`}
                                        >
                                            {lead.intent}
                                        </span>
                                    </td>

                                    {/* Reason */}
                                    <td className="max-w-md px-4 py-4 text-slate-500">
                                        {lead.reason}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3">
                    <p className="text-xs text-slate-500">
                        Showing{" "}
                        <span className="font-medium text-slate-700">
                            {leads.length}
                        </span>{" "}
                        leads
                    </p>
                </div>
            </div>
        </div>
    );
}

