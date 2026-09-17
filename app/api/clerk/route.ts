import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyWebhook } from "@clerk/backend/webhooks";
import crypto from 'node:crypto'
export async function POST(request: NextRequest) {
    try {
        const payload = await verifyWebhook(request);

        if (payload.type === "user.created") {
            const data = payload.data;

            const primaryEmail = data.email_addresses.find(
                (email) => email.id === data.primary_email_address_id
            )?.email_address;

            if (!primaryEmail) {
                return NextResponse.json(
                    {
                        success: false,
                        message: "Primary email not found",
                    },
                    { status: 400 }
                );
            }

            await prisma.user.upsert({
                where: {
                    clerkUserId: data.id,
                },
                update: {
                    email: primaryEmail,
                },
                create: {
                    clerkUserId: data.id,
                    email: primaryEmail,
                },
            });
        }
        if(payload.type === 'organization.created'){
            const data = payload.data
            const existingUser = await prisma.user.findUnique({
                where:{
                    clerkUserId:data.created_by
                }
            })
            const secret_key ='sk_live_'+crypto.randomBytes(32).toString('base64url').trim()
            const newWorkspace = await prisma.workspace.create({
                data: {
                    companyName:data.name ,
                    clerkOrganizationId:data.id,
                    secretkey:secret_key

                }
            })
            await prisma.workspaceMember.create({
                data:{
                    email:existingUser?.email!,
                    userId:existingUser?.id!,
                    workspaceId:newWorkspace.id,
                    role: 'ADMIN'
                    
                }
            })         
                
            return NextResponse.json({ success: true });
            }
   
            if (payload.type === "subscription.created") {
            const data = payload.data;
            console.log('subscription created triggered successfully', data)
            if (!data || !data.items || data.items.length === 0) {
                return NextResponse.json({
                success: false,
                message: "Subscription data or items not found",
                });
            }
            const exstingWorkspace = await prisma.workspace.findFirst({
                where:{
                    clerkOrganizationId:data.payer.organization_id
                }
            })
            if(!exstingWorkspace){
                return NextResponse.json({
                    success:false,
                    message:"Workspace not found"
                })
            }
            console.log('completed')
            const item = data.items[0] as typeof data.items[0] & { is_free_trial?: boolean , interval: string};
            const plan = item.plan as Record<string, any>;
            console.log('done')
            const newSubcription = await prisma.subscription.create({
                data: {
                clerkSubscriptionId: data.id,
                clerkItemId: item.id,
                workspaceId: exstingWorkspace.id,
                status: item.status,
                amount: plan?.amount ?? 0,
                currency: plan?.currency ?? "usd",
                planName: plan?.name ,
                planSlug: plan?.slug ,
                periodStart: item.period_start ? new Date(item.period_start) : new Date() ,
                planId: item.plan_id ?? "",
                totalTokens: 500,
                isFreeTrial: item.is_free_trial ?? false,
                interval:item.interval
                },

            });
            console.log("first subscription created sucessfully")
            return NextResponse.json({ success: true });
            }
            if (payload.type === "subscription.updated") {
            console.log('triggered')
             const data = payload.data;

            if (!data || !data.items || data.items.length === 0) {
                return NextResponse.json({
                success: false,
                message: "Subscription data or items not found",
                });
            }

            
             const exstingWorkspace = await prisma.workspace.findFirst({
                where:{
                    clerkOrganizationId:data.payer.organization_id
                }
            })
            if(!exstingWorkspace){
                return NextResponse.json({
                    success:false
                })
            }
             type ClerkSubscriptionItem = typeof data.items[0] & {
                created_at?: number;
                is_free_trial?: boolean;
            };
            const items = data.items as ClerkSubscriptionItem[]
            // 1. Sort items array by created_at descending to get the latest item
            const sortedItems = [...items].sort(
                (a, b) => (b.created_at ?? 0) - (a.created_at ?? 0)
            );
                    
            // 2. Pick the first item (the newest one)
            const latestItem = sortedItems[0] 
            const plan = latestItem.plan as Record<string, any>
            await prisma.subscription.upsert({
                where:{
                    workspaceId:exstingWorkspace.id ,
                    clerkItemId:latestItem.id
                },
                create: {
                clerkSubscriptionId: data.id,
                clerkItemId: latestItem.id,
                workspaceId: exstingWorkspace.id ,
                status: latestItem.status,
                amount: plan?.amount ?? 0,
                currency: plan?.currency ?? "usd",
                planName: plan?.name ?? "",
                planSlug: plan?.slug ?? "",
                periodStart: latestItem.period_start ? new Date(latestItem.period_start) : new Date(),
                planId: latestItem.plan_id || "",
                interval: plan.interval|| "month",
                totalTokens: 500,
                isFreeTrial: latestItem.is_free_trial ?? false,
                },
                update:{
                    status:latestItem.status,
                    periodStart:latestItem.period_start ? new Date(latestItem.period_start) : new Date() ,
                }

                
            });
            console.log('subcription updated successfully')
            return NextResponse.json({ success: true });
            }
                    

            if(payload.type === 'subscriptionItem.ended'){
                const data = payload.data
                console.log('subscription ended triggered')
                if (!data ) {
                return NextResponse.json({
                success: false,
                message: "Subscription data or items not found",
                });
              }
                const updateSubscription = await prisma.subscription.update({
                    where:{
                        clerkItemId : data.id                        
                    },
                    data:{
                        status:data.status,
                        periodEnd:data.period_end ? new Date(data.period_end)  : new Date()

                    }
                    
                    
                })
                console.log('subscription end successfully')
                return NextResponse.json({
                    success:true
                })
            }
       

            if(payload.type === 'subscriptionItem.canceled'){
                const data = payload.data
                console.log('subscription cancelled event triggered')
                if (!data ) {
                return NextResponse.json({
                success: false,
                message: "Subscription data or items not found",
                });
                }
                const updateSubscription = await prisma.subscription.update({
                    where:{
                        clerkItemId : data.id
                    },
                    data:{
                        status:data.status,
                        periodEnd:data.period_end ? new Date(data.period_end)  : new Date()
                        

                    }
                    
                    
                })
                return NextResponse.json({
                    success:true
                })
                
              }
            {/*  
            if(payload.type === 'subscription.active'){
                const data = payload.data
                console.log('subscription active event got triggered')
                if (!data ) {
                return NextResponse.json({
                success: false,
                message: "Subscription data or items not found",
                });
                }
                console.log('this is the data', data)
                const items = data.items[0]
                const updateSubscription = await prisma.subscription.update({
                    where:{
                        clerkItemId : data.id
                    },
                    data:{
                        status:data.status,
                        periodStart:items.period_start ? new Date(items.period_start) : new Date()
                        

                    }
                    
                    
                })
                return NextResponse.json({
                    success:true
                })
                
            }*/}
            if(payload.type ==='subscriptionItem.abandoned'){
                    const data = payload.data
                    if (!data ) {
                    return NextResponse.json({
                    success: false,
                    message: "Subscription data or items not found",
                    });
                    }
                    await prisma.subscription.delete({
                        where:{
                            clerkItemId:data.id
                        }
                    })
                    console.log('this is the data', data)
                    return NextResponse.json({
                        success:true
                    })


                 }



            return NextResponse.json(
                    {
                        success: true,
                        message: "Webhook processed successfully",
                    },
                    { status: 200 }
                );

    } catch (error) {
        console.error("Error occurred:", error);

        return NextResponse.json(
            {
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : "Something went wrong",
            },
            { status: 500 }
        );
    }
}