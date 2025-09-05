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
		const post = await prisma.blogPost.findUnique({
			where: { id },
			include: {
				category: true,
				tags: {
					include: { tag: true },
				},
			},
		})

		if (!post) {
			return NextResponse.json({ error: "Post not found" }, { status: 404 })
		}

		return NextResponse.json(post)
	} catch (error) {
		console.error("Error fetching post:", error)
		return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 })
	}
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		const session = await getServerSession(authOptions)

		if (!session) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
		}

		const { id } = await params
		const body = await request.json()
		const { title, slug, content, excerpt, featureImage, published, categoryId, tagIds } = body

		// Delete existing tag relationships
		await prisma.blogPostTag.deleteMany({
			where: { blogPostId: id },
		})

		// Update the blog post
		const post = await prisma.blogPost.update({
			where: { id },
			data: {
				title,
				slug,
				content,
				excerpt,
				featureImage,
				published,
				publishedAt: published ? new Date() : null,
				categoryId: categoryId || null,
				tags: {
					create: tagIds.map((tagId: string) => ({
						tagId,
					})),
				},
			},
			include: {
				category: true,
				tags: {
					include: { tag: true },
				},
			},
		})

		return NextResponse.json(post)
	} catch (error) {
		console.error("Error updating post:", error)
		return NextResponse.json({ error: "Failed to update post" }, { status: 500 })
	}
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		const session = await getServerSession(authOptions)

		if (!session) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
		}

		const { id: postId } = await params

		// Delete the blog post (this will cascade delete related tags)
		await prisma.blogPost.delete({
			where: { id: postId },
		})

		return NextResponse.json({ success: true })
	} catch (error) {
		console.error("Error deleting post:", error)
		return NextResponse.json({ error: "Failed to delete post" }, { status: 500 })
	}
}
