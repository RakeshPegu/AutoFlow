"use client";

import { ClipboardCheck, ClipboardList, TriangleAlert } from "lucide-react";
import { useState } from "react";

export default function GeneratedApi({apiKey}:{apiKey:string}) {
  const [copied, setCopied] = useState(false)

  const handleCopyFunction = async () => {
    try {
       const copyText= document.getElementById('secret_key') as HTMLInputElement
       navigator.clipboard.writeText(copyText.value);
       setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy API key:", error);
    }
  };

  return (
    <div className="w-full max-w-xl rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-100 px-6 py-5">
        <h3 className="text-lg font-semibold tracking-tight text-slate-900">
          Secret key generated
        </h3>

        <p className="mt-1 text-sm leading-5 text-slate-500">
          Your new API key is ready. Copy it now and store it securely.
        </p>
      </div>

      {/* API Key */}
      <div className="px-6 py-5">
        <label
          htmlFor="secret_key"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Secret key
        </label>

        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-1">
          <input
            type="text"
            defaultValue={apiKey}
            id="secret_key"
            readOnly
            className="min-w-0 flex-1 bg-transparent px-3 py-2 font-mono text-sm text-slate-700 outline-none"
          />

          <button
            type="button"
            onClick={handleCopyFunction}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-slate-500 transition hover:bg-white hover:text-slate-900"
            aria-label="Copy API key"
          >
            {copied ? (
              <ClipboardCheck className="h-4 w-4 text-green-500" />
            ) : (
              <ClipboardList className="h-4 w-4" />
            )}
          </button>
        </div>

        <p className="mt-2 text-xs text-slate-500">
          Use this key in your server-side requests to authenticate with the
          API.
        </p>
      </div>

      {/* Security Warning */}
      <div className="mx-6 mb-6 flex gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4">
        <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />

        <div>
          <p className="text-sm font-medium text-amber-900">
            Keep this key private
          </p>

          <p className="mt-1 text-xs leading-5 text-amber-800">
            Never expose your secret key in frontend code, public repositories,
            client-side applications, or browser requests. Store it securely
            on your backend or in environment variables.
          </p>
        </div>
      </div>
    </div>
  );
}