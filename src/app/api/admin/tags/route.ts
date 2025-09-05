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

        const tags = await prisma.tag.findMany({
            include: {
                _count: {
                    select: { blogPosts: true },
                },
            },
            orderBy: { name: "asc" },
        })

        return NextResponse.json(tags)
    } catch (error) {
        console.error("Error fetching tags:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { name, slug } = await request.json()

        // Check if slug already exists
        const existingTag = await prisma.tag.findUnique({
            where: { slug },
        })

        if (existingTag) {
            return NextResponse.json({ error: "Tag with this slug already exists" }, { status: 400 })
        }

        const tag = await prisma.tag.create({
            data: {
                name,
                slug,
            },
        })

        return NextResponse.json(tag)
    } catch (error) {
        console.error("Error creating tag:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}
