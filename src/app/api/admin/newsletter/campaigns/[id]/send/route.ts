import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { getSubscribers } from "@/lib/newsletter"
import { sendNewsletterCampaign } from "@/lib/email"

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params

    // Get campaign details
    const campaign = await prisma.emailCampaign.findUnique({
      where: { id },
    })

    if (!campaign) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 })
    }

    if (campaign.status === "SENT") {
      return NextResponse.json({ error: "Campaign already sent" }, { status: 400 })
    }

    // Get active subscribers
    const subscribers = await getSubscribers("ACTIVE")
    const emails = subscribers.map((s) => s.email)

    if (emails.length === 0) {
      return NextResponse.json({ error: "No active subscribers found" }, { status: 400 })
    }

    // Send campaign
    await sendNewsletterCampaign(emails, campaign.subject, campaign.content)

    // Update campaign status
    await prisma.emailCampaign.update({
      where: { id },
      data: {
        status: "SENT",
        sentAt: new Date(),
        updatedAt: new Date(),
      },
    })

    return NextResponse.json({
      message: "Campaign sent successfully",
      recipientCount: emails.length,
    })
  } catch (error) {
    console.error("Error sending campaign:", error)
    return NextResponse.json({ error: "Failed to send campaign" }, { status: 500 })
  }
}
