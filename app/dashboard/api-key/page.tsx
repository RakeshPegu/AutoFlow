"use client"
import { useCreateKey } from '@/app/context/formContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import {TriangleAlertIcon, Plus, ClipboardList, Eye, ClipboardCheck, EyeOff} from 'lucide-react'
import {useState } from 'react'

export default function ApiKey(){
    const [copied, setCopied] = useState<boolean>(false)
    const {openForm} = useCreateKey()
    const [open, setOpen] = useState<boolean>(false)
    const handleCopyFunction = ()=>{
        let copyText = document.getElementById('secret_key') as HTMLInputElement
        navigator.clipboard.writeText(copyText.value)
        setCopied(true)
        
    }
    const handleClickCreateNewKey = ()=>{
         openForm()

    }


    return(
       <section className="flex flex-col gap-8">

            {/* Section Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                    API Keys 
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Manage the keys used to authenticate requests to your API.
                </p>
                </div>

                <button
                type="button"
                onClick={handleClickCreateNewKey}
                className="inline-flex w-fit items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-900"
                >
                <Plus className="h-4 w-4" />
                Create new key
                </button>
            </div>

            {/* API Key Card */}
            <Card className="w-full border border-slate-200 bg-white shadow-sm">
                <CardHeader className="pb-4">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                    <CardTitle className="text-lg font-semibold text-slate-900">
                        Secret Key
                    </CardTitle>

                    <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                        Keep private
                    </span>
                    </div>

                    <CardDescription className="text-sm text-slate-500">
                    Use this key to authenticate requests made from your backend.
                    </CardDescription>
                </div>
                </CardHeader>

                <CardContent className="space-y-6">

                {/* Key Input */}
                <div className="flex flex-col space-y-4">
                    <label
                    htmlFor="secret_key"
                    className="text-sm font-medium text-slate-700"
                    >
                    API Key (default)
                    </label>

                    <div className="flex w-full items-center rounded-lg border border-slate-200 bg-slate-50 p-1.5 transition focus-within:border-slate-400 focus-within:ring-2 focus-within:ring-slate-100">

                    <input
                        id="secret_key"
                        type={open ? "text" : "password"}
                        defaultValue="sk_494994_kdkk"
                        readOnly
                        className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm font-mono text-slate-700 outline-none"
                    />

                    <div className="flex items-center gap-1">

                        <button
                        type="button"
                        onClick={() => setOpen((prev) => !prev)}
                        className="flex h-9 w-9 items-center justify-center rounded-md text-slate-500 transition hover:bg-white hover:text-slate-900"
                        aria-label={open ? "Hide API key" : "Show API key"}
                        >
                        {open ? (
                            <EyeOff className="h-4 w-4" />
                        ) : (
                            <Eye className="h-4 w-4" />
                        )}
                        </button>

                        <button
                        type="button"
                        onClick={handleCopyFunction}
                        className="flex h-9 w-9 items-center justify-center rounded-md text-slate-500 transition hover:bg-white hover:text-slate-900"
                        aria-label="Copy API key"
                        >
                        {copied ? (
                            <ClipboardCheck className="h-4 w-4  text-green-500"  />
                        ) : (
                            <ClipboardList className="h-4 w-4" />
                        )}
                        </button>

                    </div>
                    </div>
                </div>

                {/* Description */}
                <div className="rounded-lg bg-slate-50 px-4 py-3">
                    <p className="text-sm leading-6 text-slate-600">
                    Your API key provides access to our API. Never expose it in
                    frontend or client-side code. Store it securely on your backend
                    and use it to authenticate requests to our API.
                    </p>
                </div>

                </CardContent>
            </Card>

            {/* Security Warning */}
            <div className="flex gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-4">
                <TriangleAlertIcon className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />

                <div>
                <p className="text-sm font-medium text-red-800">
                    Keep your API keys secure
                </p>

                <p className="mt-1 text-sm leading-6 text-red-700">
                    Never share your secret keys with anyone. If you suspect that a key
                    has been compromised, create a new key, update your application,
                    and revoke the compromised key immediately.
                </p>
                </div>
            </div>
           

   </section>

    )
}