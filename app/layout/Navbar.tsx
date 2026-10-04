"use client"
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import { Menu } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import MobileMenu from "../components/Menu"
import { useCreateKey } from "../context/formContext"

export default function Navbar(){
    const {openForm, formOpen, closeForm} = useCreateKey()
    const pathName = usePathname()
    const router = useRouter()
    const handleMenuClick = ()=>{
        if(formOpen === true){
            closeForm()
        }else{
            openForm()
        }
    }
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
       <nav className="flex fixed  top-4 py-3 rounded-2xl left-4 items-center w-[98%] z-50 justify-between bg-transparent  backdrop-blur-3xl">
        <div className="flex ml-6 md:ml-10">
            <h1 ><a href="/">AUTOFLOW</a></h1>
        </div>
        <ul className="md:flex gap-12 hidden ">
            {menuLinks.map((link, index)=>(
                <li key={index} className="cursor-pointer" onClick={()=>handleClickMenuLink(link.id)}>
                    {link.name}
                </li>
            ))}
        </ul>
        <div className="md:flex gap-12 mr-10 hidden ">
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
                <Link href={'/dashboard/overview'}>Dashboard</Link>
            </Show>

        </div>

        <div className="flex md:hidden  scale-105 pr-6">
            <Menu onClick={handleMenuClick}/>
            <MobileMenu />
        </div>

       </nav>

       
}
</header>
    )
}