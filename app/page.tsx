"use client"
import Image from "next/image";
import Hero from "./components/Hero";
import About from "./components/About";
import Process from "./components/Process";
import FAQ from "./components/FAQ";
import { useCreateKey } from "./context/formContext";


export default function Home() {
  const {closeForm} = useCreateKey()
  return (
    <main className="flex flex-col gap-30" onClick={()=>closeForm()}>
    <Hero/>
    <About/>
    <Process/>
    <FAQ/>F
        
    </ main>

  );
}
