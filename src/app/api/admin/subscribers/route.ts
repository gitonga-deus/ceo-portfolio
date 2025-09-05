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

        const subscribers = await prisma.newsletterSubscriber.findMany({
            orderBy: { createdAt: "desc" },
        })

        return NextResponse.json(subscribers)
    } catch (error) {
        console.error("Error fetching subscribers:", error)
        return NextResponse.json({ error: "Failed to fetch subscribers" }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { email } = await request.json()

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 })
        }

        // Check if subscriber already exists
        const existingSubscriber = await prisma.newsletterSubscriber.findUnique({
            where: { email },
        })

        if (existingSubscriber) {
            return NextResponse.json({ error: "Subscriber already exists" }, { status: 400 })
        }

        const subscriber = await prisma.newsletterSubscriber.create({
            data: {
                email,
                status: "ACTIVE",
            },
        })

        return NextResponse.json(subscriber)
    } catch (error) {
        console.error("Error creating subscriber:", error)
        return NextResponse.json({ error: "Failed to create subscriber" }, { status: 500 })
    }
}
