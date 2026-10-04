
export default function OverviewPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
                    Overview
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                    Monitor your leads, API activity, and workspace performance.
                </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl border bg-white p-5 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">
                        Total Leads
                    </p>
                    <p className="mt-2 text-3xl font-semibold text-slate-900">
                        0
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                        All captured leads
                    </p>
                </div>

                <div className="rounded-xl border bg-white p-5 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">
                        Qualified Leads
                    </p>
                    <p className="mt-2 text-3xl font-semibold text-slate-900">
                        0
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                        Leads ready for follow-up
                    </p>
                </div>

                <div className="rounded-xl border bg-white p-5 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">
                        API Requests
                    </p>
                    <p className="mt-2 text-3xl font-semibold text-slate-900">
                        0
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                        Requests this month
                    </p>
                </div>

                <div className="rounded-xl border bg-white p-5 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">
                        Conversion Rate
                    </p>
                    <p className="mt-2 text-3xl font-semibold text-slate-900">
                        0%
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                        Lead qualification rate
                    </p>
                </div>
            </div>

            <div className="rounded-xl border bg-white p-6 shadow-sm">
                <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                        Get started
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Connect your application and start capturing qualified
                        leads.
                    </p>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                    <div className="rounded-lg border p-4">
                        <span className="text-sm font-medium text-slate-900">
                            01. Create an API key
                        </span>

                        <p className="mt-1 text-sm text-slate-500">
                            Generate a secure API key for your application.
                        </p>
                    </div>

                    <div className="rounded-lg border p-4">
                        <span className="text-sm font-medium text-slate-900">
                            02. Integrate your API
                        </span>

                        <p className="mt-1 text-sm text-slate-500">
                            Connect your application and start sending leads.
                        </p>
                    </div>

                    <div className="rounded-lg border p-4">
                        <span className="text-sm font-medium text-slate-900">
                            03. Track your leads
                        </span>

                        <p className="mt-1 text-sm text-slate-500">
                            Monitor and manage your qualified leads from here.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

