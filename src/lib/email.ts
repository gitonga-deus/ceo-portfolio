import { Resend } from "resend"
import { render } from "@react-email/render"
import NewsletterTemplate from "@/emails/newsletter-template"
import WelcomeTemplate from "@/emails/welcome-template"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendWelcomeEmail(email: string, name?: string) {
	try {
		const emailHtml = await render(WelcomeTemplate({ name }))

		const { data, error } = await resend.emails.send({
			from: "Steve Down <onboarding@resend.dev>",
			to: [email],
			subject: "Welcome to Steve's Newsletter!",
			html: emailHtml,
		})

		if (error) {
			console.error("Error sending welcome email:", error)
			throw new Error("Failed to send welcome email")
		}

		return data
	} catch (error) {
		console.error("Error sending welcome email:", error)
		throw error
	}
}

export async function sendNewsletterCampaign(emails: string[], subject: string, content: string) {
	try {
		const emailHtml = await render(
			NewsletterTemplate({
				subject,
				content,
				unsubscribeUrl: "https://steveportfolio.com/unsubscribe",
			}),
		)

		const { data, error } = await resend.emails.send({
			from: "Steve Down <onboarding@resend.dev>",
			to: emails,
			subject,
			html: emailHtml,
		})

		if (error) {
			console.error("Error sending newsletter campaign:", error)
			throw new Error("Failed to send newsletter campaign")
		}

		return data
	} catch (error) {
		console.error("Error sending newsletter campaign:", error)
		throw error
	}
}

export async function sendTestEmail(email: string, subject: string, content: string) {
	try {
		const emailHtml = await render(
			NewsletterTemplate({
				subject,
				content,
				unsubscribeUrl: "https://steveportfolio.com/unsubscribe",
			}),
		)

		const { data, error } = await resend.emails.send({
			from: "Steve Down <onboarding@resend.dev>",
			to: [email],
			subject: `[TEST] ${subject}`,
			html: emailHtml,
		})

		if (error) {
			console.error("Error sending test email:", error)
			throw new Error("Failed to send test email")
		}

		return data
	} catch (error) {
		console.error("Error sending test email:", error)
		throw error
	}
}
