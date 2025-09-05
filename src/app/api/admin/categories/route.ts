import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const categories = await prisma.category.findMany({
            include: {
                _count: {
                    select: { blogPosts: true },
                },
            },
            orderBy: { name: "asc" },
        })

        return NextResponse.json(categories)
    } catch (error) {
        console.error("Error fetching categories:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { name, description, slug } = await request.json()

        // Check if slug already exists
        const existingCategory = await prisma.category.findUnique({
            where: { slug },
        })

        if (existingCategory) {
            return NextResponse.json({ error: "Category with this slug already exists" }, { status: 400 })
        }

        const category = await prisma.category.create({
            data: {
                name,
                description,
                slug,
            },
        })

        return NextResponse.json(category)
    } catch (error) {
        console.error("Error creating category:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
