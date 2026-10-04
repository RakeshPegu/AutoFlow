"use client"
import { useEffect, useState } from "react";
import { useCreateKey } from "../context/formContext";
import { Button } from "@/components/ui/button";
import GeneratedApi from "./generatedApi";


export default function CreateAPIKey(){
    const {formOpen,openForm, closeForm} = useCreateKey()
    const [isLoading, setLoading] = useState(false)
    const [api, setApi] = useState<string>('')
    const handleClickOutAPIForm = ()=>{
        closeForm()
    }
    const handleCreateKey =async()=> {
        try {
            setApi('akdkdoddoi')
            setLoading(true)
            
        } catch (error) {
            setLoading(false)
            
        }finally{
            setLoading(false)
        }

        

    
    
    }

  useEffect(() => {
    if (formOpen === true) {
    
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
   }

    return () => {
      document.body.style.overflow = "";
    };
 }, [formOpen]);

return(
<div
  className={`fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4 backdrop-blur-sm transition-opacity ${
    formOpen
      ? "visible opacity-100"
      : "pointer-events-none invisible opacity-0"
  }`}
  onClick={handleClickOutAPIForm}
>
  <div
    className={`w-full max-w-md transform rounded-xl border border-slate-200 bg-white shadow-xl transition-all duration-200 ${
      formOpen
        ? "translate-y-0 scale-100"
        : "translate-y-2 scale-95"
    }`}
    onClick={(e)=> e.stopPropagation()}
  >
     { api ? <GeneratedApi apiKey={api} /> : 
      <form className="p-6">

      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold tracking-tight text-slate-900">
          Create API key
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Create a new secret key to authenticate requests to your API.
          Keep this key secure and never expose it in client-side code.
        </p>
      </div>

      {/* Form Field */}
      <div className="flex flex-col space-y-4">
        <label
          htmlFor="key-name"
          className="text-sm font-medium text-slate-700"
        >
          Key name
        </label>

        <input
          id="key-name"
          type="text"
          placeholder="e.g. Production API"
          className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
        />

        <p className="text-xs text-slate-500">
          Give your key a name so you can identify it later.
        </p>
      </div>

      {/* Actions */}
      <div className="mt-8 flex justify-end gap-3">
        <Button
          type="button"
          variant={'outline'}
          onClick={closeForm}
          className="px-4"


        >

          Cancel
        </Button>

         <Button
            type="submit"
            className="relative px-4"
            onClick={handleCreateKey}
            disabled={isLoading}
            >
            <span className={isLoading ? "opacity-0" : "opacity-100"}>
                Create key
            </span>

            {isLoading && (
                <svg
                className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
                
                >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                />

                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
                </svg>
            )}
        </Button>
        
      </div>

    </form>
}
  </div>
</div>
    )
}