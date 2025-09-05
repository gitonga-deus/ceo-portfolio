import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// Extended session type with user id
interface ExtendedSession {
    user: {
        id: string
        name: string
        email: string
        role: string
    }
}

export async function GET() {
    try {
        const session = await getServerSession(authOptions)

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const posts = await prisma.blogPost.findMany({
            include: {
                author: {
                    select: { name: true, email: true },
                },
                category: true,
                tags: {
                    include: { tag: true },
                },
                _count: {
                    select: { tags: true },
                },
            },
            orderBy: { createdAt: "desc" },
        })

        return NextResponse.json(posts)
    } catch (error) {
        console.error("Error fetching posts:", error)
        return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions) as ExtendedSession | null

        if (!session || !session.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const body = await request.json()
        const { title, slug, content, excerpt, featureImage, published, categoryId, tagIds } = body

        // Create the blog post
        const post = await prisma.blogPost.create({
            data: {
                title,
                slug,
                content,
                excerpt,
                featureImage,
                published,
                publishedAt: published ? new Date() : null,
                authorId: session.user.id,
                categoryId: categoryId || null,
                tags: {
                    create: tagIds.map((tagId: string) => ({
                        tagId,
                    })),
                },
            },
        })

        return NextResponse.json(post)
    } catch (error) {
        console.error("Error creating post:", error)
        return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
    }
}
