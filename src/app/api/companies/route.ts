import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
    try {
        const companies = await prisma.company.findMany({
            where: {
                status: "ACTIVE"
            },
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
