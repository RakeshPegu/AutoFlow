"use client"
import { Button } from "@/components/ui/button"
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

export default function Navbar(){
    const pathName = usePathname()
    const router = useRouter()
    const menuLinks =[
        {
            name:"Home",
            id:'home'
        },
        {
            name:"About",
            id:'about'
        },

        {
            name:"Process",
            id: 'process'
        },
        {
            name:"FAQ",
            id:'faq'
        }
    ]
    const handleClickMenuLink =(id:string)=>{
        if(pathName === '/'){
            document.getElementById(id)?.scrollIntoView({behavior:"smooth"})
            return ;
        }
        router.push(`/#${id}`)

        

    }
    const hideNavbar = pathName.startsWith('/dashboard')
    return(
       <header>
        {!hideNavbar&&
       <nav className="flex fixed  top-4 py-3 rounded-2xl left-4 items-center w-[98%] z-50 justify-between bg-foreground text-white">
        <div className="flex  ml-10">
            <h1 ><a href="/">AUTOFLOW</a></h1>
        </div>
        <ul className="flex gap-12">
            {menuLinks.map((link, index)=>(
                <li key={index} className="cursor-pointer" onClick={()=>handleClickMenuLink(link.id)}>
                    {link.name}
                </li>
            ))}
        </ul>
        <div className="flex gap-12 mr-10 ">
            <Show when={'signed-out'}>
                <SignInButton mode={"modal"}>
                    SignIn
                </SignInButton>
                <SignUpButton mode="modal">
                    Get Started
                </SignUpButton>
            </Show>
            <Show when={'signed-in'}>
                <UserButton/>
                <Link href={'/dashboard'}>Dashboard</Link>
            </Show>

        </div>
       </nav>
}
</header>
    )
}