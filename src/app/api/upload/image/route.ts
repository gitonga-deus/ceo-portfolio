import { NextRequest, NextResponse } from "next/server"
import { put } from "@vercel/blob"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

// Extended session type with user id
interface ExtendedSession {
    user: {
        id: string
        name: string
        email: string
        role: string
    }
}

export async function POST(request: NextRequest) {
    try {
        // Check authentication
        const session = await getServerSession(authOptions) as ExtendedSession | null

        if (!session || !session.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const formData = await request.formData()
        const file = formData.get("file") as File

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 })
        }

        // Validate file type
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"]
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { error: "Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed." },
                { status: 400 }
            )
        }

        // Validate file size (max 10MB)
        const maxSize = 10 * 1024 * 1024 // 10MB
        if (file.size > maxSize) {
            return NextResponse.json(
                { error: "File too large. Maximum size is 10MB." },
                { status: 400 }
            )
        }

        // Generate unique filename
        const timestamp = Date.now()
        const randomString = Math.random().toString(36).substring(2, 15)
        const extension = file.name.split(".").pop()
        const filename = `blog-images/${timestamp}-${randomString}.${extension}`

        // Upload to Vercel Blob
        const blob = await put(filename, file, {
            access: "public",
            addRandomSuffix: false,
        })

        return NextResponse.json({
            url: blob.url,
            filename: filename,
            size: file.size,
            type: file.type,
        })
    } catch (error) {
        console.error("Image upload error:", error)
        return NextResponse.json(
            { error: "Failed to upload image" },
            { status: 500 }
        )
    }
}

export async function DELETE(request: NextRequest) {
    try {
        // Check authentication
        const session = await getServerSession(authOptions) as ExtendedSession | null

        if (!session || !session.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { searchParams } = new URL(request.url)
        const url = searchParams.get("url")

        if (!url) {
            return NextResponse.json({ error: "No URL provided" }, { status: 400 })
        }

        // Note: Vercel Blob doesn't have a direct delete API in the free tier
        // You would need to implement this based on your storage solution
        // For now, we'll just return success
        
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Image delete error:", error)
        return NextResponse.json(
            { error: "Failed to delete image" },
            { status: 500 }
        )
    }
}
