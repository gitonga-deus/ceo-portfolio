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

        const companies = await prisma.company.findMany({
            orderBy: [
                { featured: "desc" },
                { sortOrder: "asc" },
                { createdAt: "desc" }
            ],
        })

        return NextResponse.json(companies)
    } catch (error) {
        console.error("Error fetching companies:", error)
        return NextResponse.json({ error: "Failed to fetch companies" }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions) as ExtendedSession | null

        if (!session || !session.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

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

        // Check if slug already exists
        const existingCompany = await prisma.company.findUnique({
            where: { slug },
        })

        if (existingCompany) {
            return NextResponse.json(
                { error: "A company with this slug already exists" },
                { status: 400 }
            )
        }

        // Create the company
        const company = await prisma.company.create({
            data: {
                name,
                slug,
                description,
                industry,
                status: status || "ACTIVE",
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
        console.error("Error creating company:", error)
        return NextResponse.json({ error: "Failed to create company" }, { status: 500 })
    }
}
