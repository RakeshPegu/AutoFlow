import prisma from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"


export async function GET(request:NextRequest) {
    try {
        const  {userId:clerkUserId}  = await auth()
         console.log("clerkuserId", clerkUserId)
        if(!clerkUserId){
            return NextResponse.json({
                success:false,
                message:'Unauthorized'
            },{
                status:401
            })
        }
        const existingUser = await prisma.user.findUnique({where:{clerkUserId:clerkUserId}})
        if(!existingUser){
            return NextResponse.json({
                success:false,
                message:"User not found"
            })
        }  
        const memberIdentities = await prisma.workspaceMember.findMany({
            where:{
                userId: existingUser.id
            }
        })
        if(memberIdentities.length === 0){
           return NextResponse.json({
            success:false,
            message:"Unauthorized"
           })
        }
        const workspaces = await prisma.workspace.findMany({
            where:{
                workspaceMember:{
                    some:{
                        userId:existingUser.id
                    }
                }
            }
        })
       return NextResponse.json({
        success:true,
        workspaces  
       })
        
    } catch (error) {
        console.log('the error occured', error)
        
    }
    
}