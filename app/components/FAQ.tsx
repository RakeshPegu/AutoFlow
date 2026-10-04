"use client"; 

import { useState } from "react"; 
import { Plus, Minus } from "lucide-react"; 
import { Badge } from "@/components/ui/badge"; 
import Image from "next/image"; 
import faqBg from '@/public/faq.png'; 

const faqs = [ 
  { 
    question: "What does your API do?", 
    answer: "Our API allows your application to send lead data to our platform, where leads can be stored, analyzed, and qualified using AI. You can then use the results to identify and prioritize potential customers.", 
  }, 
  { 
    question: "How do I integrate the API into my application?", 
    answer: "You can integrate our API using standard HTTP requests. Send your lead data to our API using your API key, and we'll process the lead and return the relevant information.", 
  }, 
  { 
    question: "What programming languages or frameworks are supported?", 
    answer: "Because our API communicates over HTTP, it can be integrated with virtually any programming language or framework that can make API requests, including JavaScript, TypeScript, Python, Java, PHP, and more.", 
  }, 
  { 
    question: "What information do I need to send for a lead?", 
    answer: "You can send information such as the lead's name, email, phone number, responses to qualification questions, and other relevant information. The exact fields depend on your integration.", 
  }, 
  { 
    question: "How does AI qualify a lead?", 
    answer: "Our AI analyzes the information provided about a lead and evaluates signals such as customer intent and qualification data. It then generates a score and classification to help you identify potential high-value leads.", 
  }, 
  { 
    question: "Where can I see my leads?", 
    answer: "Leads processed through the API are available in your dashboard, where you can review their information, scores, classifications, and processing status.", 
  }, 
  { 
    question: "Can I receive the results directly in my application?", 
    answer: "Yes. You can use webhooks to receive events when a lead has been processed or its classification is available, allowing your application to react automatically.", 
  }, 
  { 
    question: "How do you secure my API?", 
    answer: "API requests are authenticated using API credentials and should be sent over HTTPS. Additional protections such as rate limiting and request validation help protect your integration and data.", 
  }, 
  { 
    question: "What happens if my API request fails?", 
    answer: "The API returns an appropriate HTTP status code and error response so your application can identify what went wrong. Your integration can then handle validation errors, authentication failures, rate limits, or temporary server errors accordingly.", 
  }, 

 
  { 
    question: "Can I integrate this with my existing CRM?", 
    answer: "Yes. If your CRM supports APIs or webhooks, you can connect it with our platform and automatically transfer or process lead information between your systems.", 
  }, 
]; 

export default function FAQ() { 
  const [openIndex, setOpenIndex] = useState<number | null>(null); 

  const toggleFAQ = (index: number) => { 
    setOpenIndex((current) => (current === index ? null : index)); 
  }; 

  return ( 
    <section id="faq" className="px-6  py-16 pb-50  sm:px-10 lg:px-20"> 
      <div className="mx-auto max-w-7xl "> 

        {/* Header - Centered on Top */} 
        <div className="mb-14 text-center"> 
          <Badge variant="outline" className="text-xl px-6 py-4 lg:px-10 lg:text-lg lg:py-5"> 
            FAQ 
          </Badge> 

          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl"> 
            Frequently Asked Questions 
          </h2> 

          <p className="mx-auto mt-5 max-w-2xl text-base font-mono leading-7 text-slate-500 sm:text-lg"> 
            Everything you need to know about integrating our API, 
            processing leads, and using AI-powered qualification. 
          </p> 
        </div> 

        {/* Two-Column Content Grid */} 
        <div className="grid grid-cols-1 md:pt-10 items-start gap-12 lg:grid-cols-2 lg:gap-16"> 
          
          {/* Left Column: FAQ Accordion */} 
          <div className="divide-y divide-slate-200 border-y border-slate-200"> 
            {faqs.map((faq, index) => { 
              const isOpen = openIndex === index; 

              return ( 
                <div key={faq.question}> 
                  <button 
                    type="button" 
                    onClick={() => toggleFAQ(index)} 
                    aria-expanded={isOpen} 
                    className="flex w-full items-center justify-between gap-6 py-4 text-left"
                  > 
                    <span className="text-base font-serif text-slate-900 gap-6 sm:text-lg"> 
                      {faq.question} 
                    </span> 

                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors"> 
                      {isOpen ? ( 
                        <Minus className="h-4 w-4" /> 
                      ) : ( 
                        <Plus className="h-4 w-4" /> 
                      )} 
                    </span> 
                  </button> 

                  <div 
                    className={`grid transition-all duration-300 ease-in-out ${ 
                      isOpen 
                        ? "grid-rows-[1fr] pb-6" 
                        : "grid-rows-[0fr]" 
                    }`} 
                  > 
                    <div className="overflow-hidden"> 
                      <p className="pr-4 text-sm leading-7 text-slate-500 sm:text-base"> 
                        {faq.answer} 
                      </p> 
                    </div> 
                  </div> 
                </div> 
              ); 
            })} 
          </div> 

          {/* Right Column: Image */} 
          <div className="relative hidden lg:flex min-h-[400px] w-full lg:sticky lg:top-10 lg:min-h-[600px]"> 
            <Image 
              src={faqBg} 
              alt="FAQ Illustration" 
              fill 
              priority 
              className="object-fill rounded-full " 
            /> 
          </div> 

        </div> 

      </div> 
    </section> 
  ); 
}