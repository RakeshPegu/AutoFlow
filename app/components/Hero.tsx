'use client'
import { Button } from "@/components/ui/button"
import { useState } from "react"


export default function Hero(){
    return(
        <section id="home" className="h-screen flex flex-col gap-8 items-center justify-center" >
           <div className="flex flex-col gap-10 items-center justify-center max-w-250 ">
           <h1 className="md:text-7xl">Turn More Leads Into Revenue</h1>
           <p className="text-2xl text-center"> Capture, analyze, and qualify your leads with AI, so your business can
            prioritize high-value opportunities and make smarter decisions.
            </p>    
           </div>
           <div className="flex gap-10">
            <Button variant={'default'} className={'px-16 py-5'} >
                Get started
            </Button>
            <Button variant={'outline'} className={'px-16 py-5'}>
                Contact us
            </Button>
           </div>        
        </section>
    )
}