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
            founded,
            website,
            logo,
            image
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
                founded,
                website: website || null,
                logo: logo || null,
            },
        })

        return NextResponse.json(company)
    } catch (error) {
        console.error("Error creating company:", error)
        return NextResponse.json({ error: "Failed to create company" }, { status: 500 })
    }
}
