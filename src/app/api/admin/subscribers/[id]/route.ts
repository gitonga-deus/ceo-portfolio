import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		const session = await getServerSession(authOptions)

		if (!session) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
		}

		const { status } = await request.json()
		const { id } = await params

		if (!status || !["ACTIVE", "UNSUBSCRIBED"].includes(status)) {
			return NextResponse.json({ error: "Valid status is required" }, { status: 400 })
		}

		const subscriber = await prisma.newsletterSubscriber.update({
			where: { id },
			data: {
				status,
				updatedAt: new Date(),
			},
		})

		return NextResponse.json({
			message: "Subscriber updated successfully",
			subscriber,
		})
	} catch (error) {
		console.error("Error updating subscriber:", error)
		return NextResponse.json({ error: "Failed to update subscriber" }, { status: 500 })
	}
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		const session = await getServerSession(authOptions)

		if (!session) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
		}

		const { id } = await params
		await prisma.newsletterSubscriber.delete({
			where: { id },
		})

		return NextResponse.json({ success: true })
	} catch (error) {
		console.error("Error deleting subscriber:", error)
		return NextResponse.json({ error: "Failed to delete subscriber" }, { status: 500 })
	}
}
