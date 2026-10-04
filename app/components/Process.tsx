import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import signUpPhoto from "@/public/signUp.png";
import orgPhoto from '@/public/setupOrg.png'
import setApiPhoto from '@/public/apiKey.png'
import integratePhoto from '@/public/integrate.png'
import type { StaticImageData } from "next/image";
import Image from "next/image";

type Step = {
  stepCount: string;
  header: string;
  backgroundColor: string;
  textColor: string;
  badgeColor: string;
  description: string;
  image: StaticImageData; 
};

export default function Process() {
  const steps: Step[] = [
    {
      stepCount: "Step 1",
      header: "Sign Up & Create Your First Organization",
      description: "Create your account and set up your first organization to get started.",
      backgroundColor: "bg-indigo-500",
      textColor: "text-white",
      badgeColor: "bg-white/90 text-indigo-900 hover:bg-white",
      image: signUpPhoto,
    },
    {
      stepCount: "Step 2",
      header: "Set Up Your Organization",
      description: "Configure your organization and set up your lead collection preferences.",
      backgroundColor: "bg-amber-300",
      textColor: "text-slate-900",
      badgeColor: "bg-white/90 text-slate-900 hover:bg-white",
      image: orgPhoto
    },
    {
      stepCount: "Step 3",
      header: "Get Your API Key",
      description: "Generate your API key and securely connect your application to our platform.",
      backgroundColor: "bg-lime-300",
      textColor: "text-slate-900",
      badgeColor: "bg-white/90 text-slate-900 hover:bg-white",
      image:setApiPhoto
    },
    {
      stepCount: "Step 4",
      header: "Integrate & Start Collecting Leads",
      description: "Add the API to your application and start sending leads directly to your organization.",
      backgroundColor: "bg-rose-400",
      textColor: "text-white",
      badgeColor: "bg-white/90 text-rose-950 hover:bg-white",
      image: integratePhoto
    },
  ];

  return (
    <section className="min-h-screen flex flex-col items-center justify-center py-12 px-4 gap-6  lg:gap-14" id="process">
     <div className="flex flex-col w-full max-w-full items-center lg:gap-10">
      <Badge variant="outline" className="text-xl px-6 py-4 lg:px-10 lg:text-lg lg:py-5">
        Get started
      </Badge>
      <div className="flex flex-col gap-4">
      <h2 className="text-4xl text-center font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl">
        From Integration to{" "}Qualified Leads
      </h2>
      <p className="text-center  font-mono text-muted-foreground md:text-lg">
        Integrate our lead generation platform with your application in just 4 simple steps.
      </p>
      </div>
      </div>
      <div className="grid w-full mt-20   grid-cols-1 gap-y-6 md:gap-y-0 sm:grid-cols-2 md:grid-cols-4 lg:gap-x-2">
        {steps.map((step, indx) => (
          <div
            key={indx}
            className="h-full overflow-visible "
          >
            <Image
              src={step.image}
              alt={`Step ${indx + 1}`}
              className="object-contain md:hover:scale-120 scale-90 md:scale-106 hover:scale-100  aspect-square transition-all duration-500 "
            />
          </div>
        ))}
      </div>
    </section>
  );
}