import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getServerSession(authOptions)
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { id } = await params
        const tag = await prisma.tag.findUnique({
            where: { id },
            include: {
                _count: {
                    select: { blogPosts: true },
                },
            },
        })

        if (!tag) {
            return NextResponse.json({ error: "Tag not found" }, { status: 404 })
        }

        return NextResponse.json(tag)
    } catch (error) {
        console.error("Error fetching tag:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getServerSession(authOptions)
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { id } = await params
        const { name, slug } = await request.json()

        // Check if slug already exists (excluding current tag)
        const existingTag = await prisma.tag.findFirst({
            where: {
                slug,
                NOT: { id },
            },
        })

        if (existingTag) {
            return NextResponse.json({ error: "Tag with this slug already exists" }, { status: 400 })
        }

        const tag = await prisma.tag.update({
            where: { id },
            data: {
                name,
                slug,
            },
        })

        return NextResponse.json(tag)
    } catch (error) {
        console.error("Error updating tag:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getServerSession(authOptions)
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { id } = await params
        // Check if tag has posts
        const postsCount = await prisma.blogPostTag.count({
            where: { tagId: id },
        })

        if (postsCount > 0) {
            return NextResponse.json(
                {
                    error: "Cannot delete tag with existing posts. Please remove tag from posts first.",
                },
                { status: 400 },
            )
        }

        await prisma.tag.delete({
            where: { id },
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error deleting tag:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
