
import Image from "next/image";
import aboutPhoto from "@/public/about.png";
import { Badge } from "@/components/ui/badge";

export default function About() {
  return (
    <section
      id="about"
      className=" flex flex-col  items-center bg-amber-100 px-2 lg:pb-30 lg:pt-15 lg:gap-30"
    >
    <div className="flex flex-col items-center">
        <Badge  variant="outline" className="text-xl px-6 py-4 lg:px-10 lg:text-lg lg:py-5 lg:mb-6" >
            About
        </Badge>
        <h2 className="text-4xl text-center font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl">
        Turn Every Lead Into an{" "} Opportunity
        </h2>
    </div>

      <div className="mx-auto grid w-full max-w-7xl gap-16 lg:grid-cols-2">
        {/* Left Content */}
        <div className="max-w-xl lg:pt-10  gap-4 flex flex-col items-center">
            <p className="text-lg leading-8 font-mono text-slate-600">
            Capture every potential customer, let AI analyze their intent,
            and focus your team on the leads most likely to convert.
          </p>

          <p className="mt-5 font-mono text-lg leading-8  text-slate-500">
            From the first interaction to lead scoring, our platform helps
            businesses understand their prospects, prioritize opportunities,
            and make faster, data-driven decisions.
          </p>


        </div>

        {/* Product Visual */}
        <div className="relative flex items-center justify-center">
          <div className="absolute -inset-6 rounded-3xl bg-blue-500/10 blur-3xl" />

          <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-200/60">
            <Image
              src={aboutPhoto}
              alt="Lead qualification and scoring workflow"
              className="h-auto w-full rounded-xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
