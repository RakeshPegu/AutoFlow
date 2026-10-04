
"use client";

import { KeyRound, Trash2, AlertTriangle } from "lucide-react";

export default function Settings() {
    const handleRevokeKeys = () => {
        // TODO: Revoke all API keys
        console.log("Revoke all API keys");
    };

    const handleDeleteInstance = () => {
        // TODO: Delete instance
        console.log("Delete instance");
    };

    return (
        <div className="max-w-4xl space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                    Settings
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    Manage your instance and security settings.
                </p>
            </div>

            {/* Security */}
            <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 px-6 py-5">
                    <h2 className="text-base font-semibold text-slate-900">
                        Security
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Manage the API keys used to authenticate your
                        applications.
                    </p>
                </div>

                <div className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                            <KeyRound
                                size={18}
                                className="text-slate-600"
                            />
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-slate-900">
                                Revoke all API keys
                            </h3>

                            <p className="mt-1 max-w-xl text-sm text-slate-500">
                                Immediately invalidate all API keys associated
                                with this instance. Applications using these
                                keys will no longer be able to access the API.
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handleRevokeKeys}
                        className="inline-flex h-9 shrink-0 items-center justify-center rounded-lg border border-red-200 bg-white px-4 text-sm font-medium text-red-600 transition hover:bg-red-50"
                    >
                        Revoke all keys
                    </button>
                </div>
            </section>

            {/* Danger Zone */}
            <section className="rounded-xl border border-red-200 bg-white shadow-sm">
                <div className="border-b border-red-100 bg-red-50/50 px-6 py-5">
                    <div className="flex gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-100">
                            <AlertTriangle
                                size={18}
                                className="text-red-600"
                            />
                        </div>

                        <div>
                            <h2 className="text-base font-semibold text-red-700">
                                Danger Zone
                            </h2>

                            <p className="mt-1 text-sm text-red-600/80">
                                These actions are permanent and cannot be
                                undone.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="divide-y divide-red-100">
                    {/* Revoke Keys */}
                    <div className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h3 className="text-sm font-medium text-slate-900">
                                Revoke all API keys
                            </h3>

                            <p className="mt-1 max-w-xl text-sm text-slate-500">
                                All API keys will be permanently invalidated.
                                You will need to create new keys for your
                                applications to access the API.
                            </p>
                        </div>

                        <button
                            onClick={handleRevokeKeys}
                            className="inline-flex h-9 shrink-0 items-center justify-center rounded-lg border border-red-200 px-4 text-sm font-medium text-red-600 transition hover:bg-red-50"
                        >
                            Revoke keys
                        </button>
                    </div>

                    {/* Delete Instance */}
                    <div className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h3 className="text-sm font-medium text-slate-900">
                                Delete instance
                            </h3>

                            <p className="mt-1 max-w-xl text-sm text-slate-500">
                                Permanently delete this instance and all of
                                its associated data.
                            </p>

                            <div className="mt-3 flex items-start gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                                <AlertTriangle
                                    size={16}
                                    className="mt-0.5 shrink-0"
                                />

                                <p>
                                    <span className="font-semibold">
                                        Warning:
                                    </span>{" "}
                                    Deleting this instance will permanently
                                    delete all leads, API keys, and associated
                                    data. This action cannot be undone.
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={handleDeleteInstance}
                            className="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 text-sm font-medium text-white transition hover:bg-red-700"
                        >
                            <Trash2 size={16} />
                            Delete instance
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

