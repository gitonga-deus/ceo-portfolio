import { prisma } from "./prisma"
import type { SubscriberStatus, CampaignStatus } from "@prisma/client"

export async function createSubscriber(email: string, name?: string) {
	try {
		const existingSubscriber = await prisma.newsletterSubscriber.findUnique({
			where: { email },
		})

		if (existingSubscriber) {
			if (existingSubscriber.status === "UNSUBSCRIBED") {
				return await prisma.newsletterSubscriber.update({
					where: { email },
					data: { status: "ACTIVE", updatedAt: new Date() },
				})
			}
			return existingSubscriber
		}

		return await prisma.newsletterSubscriber.create({
			data: {
				email,
				name,
				status: "ACTIVE",
			},
		})
	} catch (error) {
		console.error("Error creating subscriber:", error)
		throw new Error("Failed to create subscriber")
	}
}

export async function getSubscribers(status?: SubscriberStatus) {
	try {
		return await prisma.newsletterSubscriber.findMany({
			where: status ? { status } : undefined,
			orderBy: { createdAt: "desc" },
		})
	} catch (error) {
		console.error("Error fetching subscribers:", error)
		throw new Error("Failed to fetch subscribers")
	}
}

export async function unsubscribeUser(email: string) {
	try {
		return await prisma.newsletterSubscriber.update({
			where: { email },
			data: { status: "UNSUBSCRIBED", updatedAt: new Date() },
		})
	} catch (error) {
		console.error("Error unsubscribing user:", error)
		throw new Error("Failed to unsubscribe user")
	}
}

export async function createEmailCampaign(data: {
	subject: string
	content: string
}) {
	try {
		return await prisma.emailCampaign.create({
			data: {
				subject: data.subject,
				content: data.content,
				status: "DRAFT",
			},
		})
	} catch (error) {
		console.error("Error creating email campaign:", error)
		throw new Error("Failed to create email campaign")
	}
}

export async function getCampaigns() {
	try {
		return await prisma.emailCampaign.findMany({
			orderBy: { createdAt: "desc" },
		})
	} catch (error) {
		console.error("Error fetching campaigns:", error)
		throw new Error("Failed to fetch campaigns")
	}
}

export async function updateCampaignStatus(id: string, status: CampaignStatus) {
	try {
		return await prisma.emailCampaign.update({
			where: { id },
			data: { status, updatedAt: new Date() },
		})
	} catch (error) {
		console.error("Error updating campaign status:", error)
		throw new Error("Failed to update campaign status")
	}
}
