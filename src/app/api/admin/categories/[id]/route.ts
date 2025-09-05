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
        const category = await prisma.category.findUnique({
            where: { id },
            include: {
                _count: {
                    select: { blogPosts: true },
                },
            },
        })

        if (!category) {
            return NextResponse.json({ error: "Category not found" }, { status: 404 })
        }

        return NextResponse.json(category)
    } catch (error) {
        console.error("Error fetching category:", error)
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
        const { name, description, slug } = await request.json()

        // Check if slug already exists (excluding current category)
        const existingCategory = await prisma.category.findFirst({
            where: {
                slug,
                NOT: { id },
            },
        })

        if (existingCategory) {
            return NextResponse.json({ error: "Category with this slug already exists" }, { status: 400 })
        }

        const category = await prisma.category.update({
            where: { id },
            data: {
                name,
                description,
                slug,
            },
        })

        return NextResponse.json(category)
    } catch (error) {
        console.error("Error updating category:", error)
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
        // Check if category has posts
        const postsCount = await prisma.blogPost.count({
            where: { categoryId: id },
        })

        if (postsCount > 0) {
            return NextResponse.json(
                {
                    error: "Cannot delete category with existing posts. Please reassign or delete posts first.",
                },
                { status: 400 },
            )
        }

        await prisma.category.delete({
            where: { id },
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error deleting category:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
