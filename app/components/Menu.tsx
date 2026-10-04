import { Show, SignInButton, SignUpButton,  UserButton } from '@clerk/nextjs'

import Link from 'next/link'
import { useCreateKey } from '../context/formContext'
export default function MobileMenu(){
        const {formOpen} = useCreateKey()

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
    return(
        <div
            className={`fixed top-8 right-0 w-50
                flex flex-col gap-4 py-6 rounded-l-2xl
                backdrop-blur-sm bg-slate-950
                transition-all duration-700 ease-in-out 
                text-gray-50
                ${formOpen ? 'translate-x-0 opacity-100 ' : 'translate-x-full opacity-0'                    
                }
            `}
            >
            <ul className='flex flex-col  items-center gap-4'>
                {menuLinks.map((link, indx)=>
                    <li className=' cursor-pointer' key={indx}>{link.name}</li>
                )}
            </ul>
            <div className='flex flex-col gap-4'>
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
        </div>

    )

}