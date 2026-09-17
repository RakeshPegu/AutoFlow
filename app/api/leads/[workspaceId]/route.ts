import prisma from "@/lib/prisma";
import { addJobs } from "@/lib/queue";
import { NextRequest, NextResponse } from "next/server";

type CreateLeadBody = {
    name: string;
    email: string;
    phoneNumber: string;
    question: string
    workspaceId: string;
};

export async function POST(request: NextRequest, {params}:{params:Promise<{workspaceId:string}>}) {
    try {
        const {workspaceId} = await params
        console.log("this is  workspaceId", workspaceId)
        if(!workspaceId){
            throw NextResponse.json({
                success:false,
                message:"Id required"
            })
        }

        // create a middleware to verify incoming request
        const authHeader = request.headers.get('authorization')
        if(!authHeader){
            return NextResponse.json({
                success:false,
                message:"Missing authorizatin header"
            },{
                status:401
            })
        }
        const [scheme, apiKey] = authHeader.split(" ")
        if(scheme !== 'Bearer' || !apiKey){
            return NextResponse.json({
                success:false,
                message:"Invalid Authorization header"
            },{
                status:401
            })
        }
        const body: CreateLeadBody = await request.json();
        const existingWorkspace = await prisma.workspace.findUnique({where:{id:workspaceId}})
        const requestFromValidWorkspace = existingWorkspace?.secretkey === apiKey
        if(!requestFromValidWorkspace){
            return NextResponse.json({
                success:false,
                message:"Unauthorized"
            },{
                status:401
            })
        }
        

        if(!existingWorkspace){
            return NextResponse.json({
                success:false,
                message:"Workspace not found"
            },{
                status:404
            })
        }
    
        const isLimitReached = existingWorkspace?.totalToken! <= existingWorkspace?.usedTokens!
        if(isLimitReached){
            return NextResponse.json({
                success:false,
                message:"Limit reached"
            })
        }

        const existingLead = await prisma.lead.findUnique({
            where:{email:body.email}
        })
        if(existingLead){
            throw new Error('Lead already exist')
        }
        
        const newLead = await prisma.lead.create({
            data: {
                name: body.name,
                email: body.email,
                phoneNumber:body.phoneNumber,
                workspaceId: workspaceId,
            },
        });

        // Add lead to AI analysis queue
        await addJobs({leadId:newLead.id, question:body.question, workspaceId:workspaceId});

        return NextResponse.json(
            {
                success: true,
                message: "New lead created successfully",
                leadId: newLead.id,
            },
            {
                status: 201,
            }
        );

    } catch (error) {
        console.error(
            "Error occurred while creating lead:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                message: error instanceof Error ? error.message : 'something went wrong',
            },
            {
                status: 500,
            }
        );
    }
}

export async function GET(request:NextRequest, {params}:{params:Promise<{workspaceId:string}>}){
    try{
    // const searchParams = request.nextUrl.searchParams
    // console.log('this searchParams', searchParams)
    // const workspaceId = searchParams.get('workspaceId')

    const {workspaceId} = await params
    if(!workspaceId){
        throw new Error('Workspace  not found')
    }
    const existingWorkspace = await  prisma.workspace.findUnique({
        where:{id:workspaceId}
    })
    if(!existingWorkspace){
        throw new Error('workspace not found')
    }
    const existingLeads = await prisma.lead.findMany({
        where:{workspaceId:workspaceId}
    })
    return NextResponse.json({
        success:true,
        leads :existingLeads
    },{
        status:200
    })
    } catch(error){
        console.log('this is the error', error)
        return NextResponse.json({
            success:false ,
            message:error instanceof Error ? error.message :'Something went wrong'

        },{
            status:500
        })
        
    
    }

}