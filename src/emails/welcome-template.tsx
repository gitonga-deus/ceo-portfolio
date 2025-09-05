import { Body, Container, Head, Heading, Html, Link, Preview, Section, Text } from "@react-email/components"

interface WelcomeTemplateProps {
	name?: string
}

export default function WelcomeTemplate({ name }: WelcomeTemplateProps) {
	return (
		<Html>
			<Head />
			<Preview>Welcome to Steve's Newsletter!</Preview>
			<Body style={main}>
				<Container style={container}>
					{/* Header */}
					<Section style={header}>
						<Heading style={h1}>Welcome to Steve's Newsletter!</Heading>
					</Section>

					{/* Main Content */}
					<Section style={content}>
						<Text style={greeting}>Hi {name || "there"},</Text>

						<Text style={paragraph}>
							Thank you for subscribing to my newsletter! I'm excited to share my entrepreneurial journey, company
							updates, and industry insights with you.
						</Text>

						<Text style={paragraph}>Here's what you can expect:</Text>

						<ul style={list}>
							<li style={listItem}>
								🏢 <strong>Company Updates:</strong> Latest news from my ventures and new projects
							</li>
							<li style={listItem}>
								📝 <strong>Blog Posts:</strong> Fresh insights on entrepreneurship and business building
							</li>
							<li style={listItem}>
								💡 <strong>Industry Insights:</strong> Trends and opportunities I'm watching
							</li>
						</ul>

						<Text style={paragraph}>
							I typically send updates 1-2 times per month, so you won't be overwhelmed with emails.
						</Text>

						<Section style={buttonContainer}>
							<Link href="https://steveportfolio.com/blog" style={button}>
								Read Latest Blog Posts
							</Link>
						</Section>
					</Section>

					{/* Footer */}
					<Section style={footer}>
						<Text style={footerText}>
							Best regards,
							<br />
							Steve
						</Text>
						<Text style={footerText}>
							<Link href="https://steveportfolio.com" style={link}>
								Visit Website
							</Link>
						</Text>
					</Section>
				</Container>
			</Body>
		</Html>
	)
}

const main = {
	backgroundColor: "#ffffff",
	fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
}

const container = {
	margin: "0 auto",
	padding: "20px 0 48px",
	maxWidth: "600px",
}

const header = {
	padding: "32px 24px 24px",
	textAlign: "center" as const,
}

const h1 = {
	color: "#0891b2",
	fontSize: "28px",
	fontWeight: "900",
	margin: "0",
	lineHeight: "1.2",
}

const content = {
	padding: "0 24px 32px",
}

const greeting = {
	color: "#111827",
	fontSize: "18px",
	fontWeight: "600",
	margin: "0 0 16px",
}

const paragraph = {
	color: "#374151",
	fontSize: "16px",
	lineHeight: "1.6",
	margin: "0 0 16px",
}

const list = {
	color: "#374151",
	fontSize: "16px",
	lineHeight: "1.6",
	margin: "0 0 16px",
	paddingLeft: "20px",
}

const listItem = {
	margin: "8px 0",
}

const buttonContainer = {
	textAlign: "center" as const,
	margin: "32px 0",
}

const button = {
	backgroundColor: "#0891b2",
	borderRadius: "8px",
	color: "#ffffff",
	fontSize: "16px",
	fontWeight: "600",
	textDecoration: "none",
	textAlign: "center" as const,
	display: "inline-block",
	padding: "12px 24px",
}

const footer = {
	padding: "24px",
	borderTop: "1px solid #e5e7eb",
	textAlign: "center" as const,
}

const footerText = {
	color: "#6b7280",
	fontSize: "14px",
	margin: "8px 0",
}

const link = {
	color: "#0891b2",
	textDecoration: "underline",
}
