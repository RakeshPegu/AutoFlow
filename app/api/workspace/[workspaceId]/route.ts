import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ workspaceId: string }> }
) {
    try {
        const { workspaceId } = await params;

        if (!workspaceId) {
            return NextResponse.json({
                success: false,
                message: "ID is required",
            });
        }

        const { userId: clerkUserId } = await auth();

        if (!clerkUserId) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized",
            });
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                clerkUserId,
            },
        });

        if (!existingUser) {
            return NextResponse.json({
                success: false,
                message: "User not found",
            });
        }

        const workspaceMember = await prisma.workspaceMember.findUnique({
            where: {
                userId_workspaceId: {
                    userId: existingUser.id,
                    workspaceId,
                },
            },
        });

        if (!workspaceMember) {
            return NextResponse.json({
                success: false,
                message: "Not found",
            });
        }

        const workspace = await prisma.workspace.findUnique({
            where: {
                id: workspaceId,
            },
        });

        if (!workspace) {
            return NextResponse.json({
                success: false,
                message: "Workspace not found",
            });
        }

        const leads = await prisma.lead.findMany({
            where: {
                workspaceId,
            },
        });

        return NextResponse.json({
            success: true,
            leads,
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Something went wrong",
        });
    }
}

export async function DELETE(
    _request: Request,
    { params }: { params: Promise<{ workspaceId: string }> }
) {
    try {
        const { workspaceId } = await params;

        if (!workspaceId) {
            return NextResponse.json({
                success: false,
                message: "ID is required",
            });
        }

        const { userId: clerkUserId } = await auth();

        if (!clerkUserId) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized",
            });
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                clerkUserId,
            },
        });

        if (!existingUser) {
            return NextResponse.json({
                success: false,
                message: "User not found",
            });
        }

        const workspaceMember = await prisma.workspaceMember.findUnique({
            where: {
                userId_workspaceId: {
                    userId: existingUser.id,
                    workspaceId,
                },
            },
        });

        if (!workspaceMember) {
            return NextResponse.json({
                success: false,
                message: "Not found",
            });
        }

        if (workspaceMember.role !== "ADMIN") {
            return NextResponse.json({
                success: false,
                message: "Unauthorized",
            });
        }

        const workspace = await prisma.workspace.findUnique({
            where: {
                id: workspaceId,
            },
        });

        if (!workspace) {
            return NextResponse.json({
                success: false,
                message: "Workspace not found",
            });
        }

        await prisma.$transaction(async (tx) => {
            await tx.lead.deleteMany({
                where: {
                    workspaceId,
                },
            });

            await tx.workspaceMember.deleteMany({
                where: {
                    workspaceId,
                },
            });

            await tx.workspace.delete({
                where: {
                    id: workspaceId,
                },
            });
        });

        return NextResponse.json({
            success: true,
            message: "Workspace deleted successfully",
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Something went wrong",
        });
    }
}