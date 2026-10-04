'use client'

import { Button } from "@/components/ui/button"
import Image from "next/image"
import heroSvg from '@/public/hero.png'

export default function Hero() {
  return (
    <section 
      id="home" 
      className="min-h-[calc(100vh-40rem)] sm:min-h-[calc(100vh-2rem)]  w-full max-w-7xl mx-auto px-6 py-50 lg:py-20 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16"
    >
      {/* Left Section: Content & CTA */}
      <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-6 max-w-2xl">
        
        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1]">
          Turn More Leads Into <span className="text-primary">Revenue</span>
        </h1>

        {/* Subtitle / Description */}
        <p className="text-base sm:text-lg font-mono  md:text-xl text-muted-foreground leading-relaxed max-w-xl">
          Capture, analyze, and qualify your leads with AI, so your business can
          prioritize high-value opportunities and make smarter decisions.
        </p>    

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-2">
          <Button 
            variant="default" 
            size="lg" 
            className="px-16 py-5 text-base  rounded-xl shadow-md transition-all hover:shadow-lg"
          >
            Get started
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="px-16 py-5 text-base  rounded-xl border-border hover:bg-accent"
          >
            Contact us
          </Button>
        </div>

      </div>    

      {/* Right Section: 3D Graphic */}
      <div className="flex-1 md:pt-15  w-full max-w-lg  hidden  lg:max-w-xl  md:flex items-center justify-center">
        <Image 
          src={heroSvg} 
          
          alt="3D Lead Platform Illustration" 
          priority 
          className="w-full  h-auto rounded-full drop-shadow-xl"
        />
      </div> 

    </section>
  )
}