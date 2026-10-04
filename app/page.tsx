  import Image from "next/image";
import Hero from "./components/Hero";
import About from "./components/About";
import Process from "./components/Process";
import FAQ from "./components/FAQ";


export default function Home() {
  return (
    <main className="flex flex-col gap-30">
    <Hero/>
    <About/>
    <Process/>
    <FAQ/>F
        
    </ main>

  );
}
