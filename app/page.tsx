  import Image from "next/image";
import Hero from "./components/Hero";
import About from "./components/About";
import Process from "./components/Process";
import FAQ from "./components/FAQ";


export default function Home() {
  return (
    <main className="flex flex-col gap-40">
    <Hero/>
    <About/>
    <Process/>
    <FAQ/>
        
    </ main>

  );
}
