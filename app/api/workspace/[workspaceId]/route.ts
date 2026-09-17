import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export  async function GET(
    request:NextRequest,
    { params }: { params: Promise<{ workspaceId: string }> }
){
    try {       
            const {workspaceId} =  await params
            if(!workspaceId){
                return NextResponse.json({success:false, message:'Id is required'})
            }
            const {userId:clerkUserId} = await auth()
            if(!clerkUserId){
                return NextResponse.json({
                    success:false,
                    message:"Unauthorized"
                })
            }
            const existingUser = await prisma.user.findUnique({
                where:{clerkUserId:clerkUserId}
            })
            if(!existingUser){
                return NextResponse.json({
                    success:false,
                    message:"User not found"
                })
            }
            const workspaceMembersIdentitiy = await prisma.workspaceMember.findUnique({
                where:{
                    userId_workspaceId:{
                        userId:existingUser.id , workspaceId:workspaceId
                    }
                }
            })
            if(!workspaceMembersIdentitiy){
                return NextResponse.json({
                    success:false,
                    message:"Not found"
                })
            }
            const workspace = await prisma.workspace.findFirst({   
                where:{
                    workspaceMember:{
                        some:{
                            userId:existingUser.id
                        }
                    }
                }
            })
            if(!workspace){
                return NextResponse.json({
                    success:false,
                    message:"Workspace not found"
                })
            }
            
     
            const leads = await prisma.lead.findMany({
                where:{workspaceId:workspace.id}
            })
            if(leads.length === 0){
                return NextResponse.json({
                    success:false,
                    message:"Leads not found"
                })
            }
            return NextResponse.json({
                success:true,
                leads
            })
    } catch (error) {
        return NextResponse.json({success:false, message: error instanceof Error ? error.message : 'Something went wrong'})
        
    }

}
export async function DELETE(params:Promise<{workspaceId:string}>){
    try {
            const {workspaceId} = await params
            if(!workspaceId){
                return NextResponse.json({success:false, message:'ID is required'})
            }
            const {userId:clerkUserId} = await auth()
            if(!clerkUserId){
                return NextResponse.json({
                    success:false,
                    message:"Unauthorized"
                })
            }
            const existingUser = await prisma.user.findUnique({
                where:{clerkUserId:clerkUserId}
            })
            if(!existingUser){
                return NextResponse.json({
                    success:false,
                    message:"User not found"
                })
            }
            const workspaceMembersIdentitiy = await prisma.workspaceMember.findUnique({
                where:{
                    userId_workspaceId:{
                        userId:existingUser.id , workspaceId:workspaceId
                    }
                }
            })
            if(workspaceMembersIdentitiy?.role !== 'ADMIN'){
                return NextResponse.json({
                    success:false ,
                    message:"Unauthorized"
                })
            }
            if(!workspaceMembersIdentitiy){
                return NextResponse.json({
                    success:false,
                    message:"Not found"
                })
            }

            await prisma.workspace.delete({
                where:{id:workspaceId}
            })
            await prisma.lead.deleteMany({
                where:{
                    workspaceId:workspaceId
                }
            })
            return NextResponse.json(
                {
                    success:true,
                    message:"Workspace delete successfully"
                }
            )


        
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:error instanceof Error ? error.message : 'Something went wrong'
        },)
        
    }

}