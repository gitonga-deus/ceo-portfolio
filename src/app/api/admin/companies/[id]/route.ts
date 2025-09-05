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

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions)

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { id } = await params
        const company = await prisma.company.findUnique({
            where: { id },
        })

        if (!company) {
            return NextResponse.json({ error: "Company not found" }, { status: 404 })
        }

        return NextResponse.json(company)
    } catch (error) {
        console.error("Error fetching company:", error)
        return NextResponse.json({ error: "Failed to fetch company" }, { status: 500 })
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions) as ExtendedSession | null

        if (!session || !session.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { id } = await params
        const body = await request.json()
        const {
            name,
            slug,
            description,
            industry,
            status,
            founded,
            website,
            logo,
            image,
            featured,
            sortOrder
        } = body

        // Check if slug already exists (excluding current company)
        const existingCompany = await prisma.company.findFirst({
            where: {
                slug,
                NOT: { id }
            },
        })

        if (existingCompany) {
            return NextResponse.json(
                { error: "A company with this slug already exists" },
                { status: 400 }
            )
        }

        // Update the company
        const company = await prisma.company.update({
            where: { id },
            data: {
                name,
                slug,
                description,
                industry,
                status,
                founded,
                website: website || null,
                logo: logo || null,
                image: image || null,
                featured: featured || false,
                sortOrder: sortOrder || 0,
            },
        })

        return NextResponse.json(company)
    } catch (error) {
        console.error("Error updating company:", error)
        return NextResponse.json({ error: "Failed to update company" }, { status: 500 })
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions) as ExtendedSession | null

        if (!session || !session.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { id } = await params
        // Check if company exists
        const company = await prisma.company.findUnique({
            where: { id },
        })

        if (!company) {
            return NextResponse.json({ error: "Company not found" }, { status: 404 })
        }

        // Delete the company
        await prisma.company.delete({
            where: { id },
        })

        return NextResponse.json({ message: "Company deleted successfully" })
    } catch (error) {
        console.error("Error deleting company:", error)
        return NextResponse.json({ error: "Failed to delete company" }, { status: 500 })
    }
}
